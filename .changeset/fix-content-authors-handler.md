---
"emdash": patch
---

Fixes the admin Pages/Posts list failing to load: the `content/{collection}/authors`
endpoint returned 500 ("EmDash is not initialized") because `handleContentAuthors`
was never wired onto `locals.emdash`. The author filter and content list now load.
