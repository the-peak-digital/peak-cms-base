---
"emdash": patch
---

Backport #1538: resolve the session user behind a timeout/after() guard so a stalled `session.get()` on Cloudflare Workers can't hang the request (and poison the isolate) for logged-in users. Fixes the intermittent "logged-in pages freeze" (#1274).
