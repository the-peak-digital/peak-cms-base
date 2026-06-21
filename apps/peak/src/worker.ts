/**
 * Cloudflare Worker entry. Re-exports the EmDash worker, but first intercepts
 * POST /api/login for Peak's username/password sign-in.
 *
 * Why intercept here instead of an Astro route: a root [...slug] catch-all page
 * shadows POST requests to sibling endpoints in this Astro version (POST 404s).
 * The worker runs before Astro, so it isn't affected.
 *
 * Flow: verify the password (PBKDF2 hash in `options`), then mint a single-use
 * magic-link token and redirect to EmDash's own /_emdash/api/auth/magic-link/
 * verify route, which creates the session exactly like a real magic link. No
 * passkey, no email needed.
 */
import emdashWorker, { PluginBridge } from "@emdash-cms/cloudflare/worker";
import { generateTokenWithHash } from "@emdash-cms/auth";
import { verifyPassword } from "./lib/peak-password";

export { PluginBridge };

async function handlePasswordLogin(request: Request, env: any): Promise<Response> {
	const origin = new URL(request.url).origin;
	const bad = () => Response.redirect(`${origin}/login?error=1`, 303);
	try {
		const form = await request.formData();
		const email = String(form.get("email") ?? "")
			.trim()
			.toLowerCase();
		const password = String(form.get("password") ?? "");
		if (!email || !password || !env?.DB) return bad();

		const user = (await env.DB.prepare("SELECT id, email FROM users WHERE email = ?")
			.bind(email)
			.first()) as { id: string; email: string } | null;
		if (!user) return bad();

		const row = (await env.DB.prepare("SELECT value FROM options WHERE name = ?")
			.bind(`peak:pw:${email}`)
			.first()) as { value: string } | null;
		if (!row?.value || !(await verifyPassword(password, JSON.parse(row.value)))) return bad();

		// Clear this user's old login tokens first. auth_tokens has no index on
		// `hash`, so the verify lookup scans the table — left to accumulate, it slows
		// to a hang. Keeping ~one row per user keeps that scan trivial.
		await env.DB.prepare("DELETE FROM auth_tokens WHERE user_id = ? AND type = 'magic_link'")
			.bind(user.id)
			.run();

		// Mint a single-use magic-link token; EmDash's verify route turns it into a session.
		const { token, hash } = generateTokenWithHash();
		const now = new Date();
		const expires = new Date(now.getTime() + 15 * 60 * 1000);
		await env.DB.prepare(
			"INSERT INTO auth_tokens (hash, user_id, email, type, expires_at, created_at) VALUES (?,?,?,?,?,?)",
		)
			.bind(hash, user.id, user.email, "magic_link", expires.toISOString(), now.toISOString())
			.run();

		const verify = new URL("/_emdash/api/auth/magic-link/verify", origin);
		verify.searchParams.set("token", token);
		verify.searchParams.set("redirect", "/_emdash/admin");
		return Response.redirect(verify.toString(), 303);
	} catch {
		return bad();
	}
}

export default {
	async fetch(request: Request, env: any, ctx: any): Promise<Response> {
		const url = new URL(request.url);
		if (request.method === "POST" && url.pathname === "/api/login") {
			return handlePasswordLogin(request, env);
		}
		return (emdashWorker as any).fetch(request, env, ctx);
	},
	scheduled(...args: any[]) {
		return (emdashWorker as any).scheduled?.(...args);
	},
};
