/**
 * Drives the running dev server through setup + a real media upload, headless,
 * with before/after screenshots. Run while `pnpm dev` is up.
 *
 *   node scripts/peak/verify-upload.mjs
 */
import { chromium } from "@playwright/test";

const BASE = process.env.PEAK_BASE ?? "http://localhost:4322";
const IMAGE =
	"/Users/monarcsoft/Developer/peak-cms/e2e/fixtures/assets/test-image.png";

const browser = await chromium.launch();
const ctx = await browser.newContext({ baseURL: BASE, viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();

const log = (...a) => console.log("[verify]", ...a);

try {
	// 1. Setup: dev-bypass creates the admin user and sets the session cookie,
	//    then redirects into the admin. This is "going through setup".
	log("setup via dev-bypass…");
	await page.goto("/_emdash/api/setup/dev-bypass?redirect=/_emdash/admin/", {
		waitUntil: "networkidle",
	});
	log("after setup, url =", page.url());

	// 2. Media Library
	log("opening media library…");
	await page.goto("/_emdash/admin/media", { waitUntil: "networkidle" });

	// First login to a fresh DB pops a "Welcome to EmDash" modal that covers the
	// page — dismiss it so the uploader is interactable.
	const getStarted = page.getByRole("button", { name: /Get Started/i });
	if (await getStarted.isVisible().catch(() => false)) {
		log("dismissing welcome modal");
		await getStarted.click();
	}

	// Admin SPA cold-compiles on a fresh dev server; give it room.
	const fileInput = page.locator('input[type="file"]');
	await fileInput.waitFor({ state: "attached", timeout: 60000 });
	await page.screenshot({ path: "/tmp/peak_upload_before.png", fullPage: true });
	log("screenshot: /tmp/peak_upload_before.png");

	// 3. Actual upload through the same uploader the block image picker opens.
	//    Local storage: POST /media (multipart). R2: POST /media/upload-url
	//    (presigned) -> browser PUT to R2 -> POST /media/{id}/confirm. The
	//    reliable cross-storage success signal is the image appearing in the grid.
	log("uploading", IMAGE);
	await fileInput.setInputFiles(IMAGE);

	const grid = page.locator(".grid.gap-4");
	await grid.locator("img").first().waitFor({ timeout: 30000 });
	const count = await grid.locator("img").count();
	await page.screenshot({ path: "/tmp/peak_upload_after.png", fullPage: true });
	log("screenshot: /tmp/peak_upload_after.png");

	console.log(`\nUPLOAD_RESULT imagesInGrid=${count}`);
} catch (err) {
	await page.screenshot({ path: "/tmp/peak_upload_error.png", fullPage: true }).catch(() => {});
	console.error("UPLOAD_FAILED:", err?.message ?? err);
	process.exitCode = 1;
} finally {
	await browser.close();
}
