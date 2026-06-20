import { defineMiddleware } from "astro:middleware";

/**
 * Work around an EmDash bug: section preview URLs are built as
 * `/_emdash/media/<key>` (sections/index.ts), but the media file endpoint is
 * `/_emdash/api/media/file/<key>`. Redirect the former to the latter so section
 * thumbnails load. App-level only — EmDash core untouched.
 */
export const onRequest = defineMiddleware((context, next) => {
	const m = context.url.pathname.match(/^\/_emdash\/media\/(.+)$/);
	if (m) {
		return context.redirect(`/_emdash/api/media/file/${m[1]}`, 302);
	}
	return next();
});
