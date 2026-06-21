/**
 * Minimal password hashing for Peak's username/password login. Uses PBKDF2-HMAC-
 * SHA-256 via Web Crypto (available in the Cloudflare Workers runtime). The
 * matching Node side (scripts/peak/set-password.mjs) uses identical parameters,
 * so a hash produced there verifies here.
 *
 * Stored value (in the `options` table, key `peak:pw:<email>`) is JSON:
 *   { "salt": "<hex>", "hash": "<hex>", "v": 1 }
 */
export const PBKDF2_ITERATIONS = 100_000;
const KEY_LEN = 32;

const toHex = (buf: ArrayBuffer | Uint8Array) =>
	Array.from(buf instanceof Uint8Array ? buf : new Uint8Array(buf))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
const fromHex = (hex: string) => new Uint8Array(hex.match(/.{1,2}/g)!.map((b) => parseInt(b, 16)));

async function derive(password: string, salt: Uint8Array): Promise<string> {
	const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
	const bits = await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
		key,
		KEY_LEN * 8,
	);
	return toHex(bits);
}

export async function hashPassword(password: string): Promise<{ salt: string; hash: string; v: 1 }> {
	const salt = crypto.getRandomValues(new Uint8Array(16));
	return { salt: toHex(salt), hash: await derive(password, salt), v: 1 };
}

/** Constant-time-ish compare of two hex strings. */
function safeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
	return diff === 0;
}

export async function verifyPassword(password: string, stored: { salt: string; hash: string }): Promise<boolean> {
	if (!stored?.salt || !stored?.hash) return false;
	const computed = await derive(password, fromHex(stored.salt));
	return safeEqual(computed, stored.hash);
}
