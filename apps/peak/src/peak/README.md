# Peak

All custom code lives here, in our own namespace, so Emdash stays an untouched
dependency that can eventually be removed. Nothing in `src/peak/` imports Emdash
internals — only its public API.

```
src/peak/
  blocks/
    defineBlock.ts     single source of truth: fields -> admin schema + props + defaults
    registry.ts        auto-wires every block (no manual edits, ever)
    Hero/              one folder per block
      schema.ts        defineBlock({...})  + exported Props type
      Hero.astro       renderer (reads Astro.props.node)
      defaults.ts      derived from schema
  cms/
    plugin.ts          registers all blocks with the Emdash admin
  renderer/
    PeakRenderer.astro Peak's own block-list renderer (not the Emdash renderer)
```

## Add a block

```bash
pnpm --filter @peak/site new-block ServicesGrid "Sections"
```

Then fill in `schema.ts` (fields) and `ServicesGrid.astro` (markup). That's it —
the registry discovers it, the admin shows it, the renderer draws it. No
dispatcher edits, no plugin edits.

## One block, three coordinated pieces — but you only write two

| File           | Purpose                              | You edit? |
| -------------- | ------------------------------------ | --------- |
| `schema.ts`    | editor fields + typed props          | yes       |
| `<Name>.astro` | HTML + scoped CSS                    | yes       |
| `defaults.ts`  | derived from schema                  | no        |
| registry/plugin/renderer | wiring                     | never     |

## How content flows

Content is **never** stored in these files. Editors type it in the admin; it is
stored as block JSON in the database; at build time a page fetches its block
list and passes it to `PeakRenderer`, which maps each `_type` to its component.

## Image fields

Emdash ships a real visual media picker (browse library, upload to R2/local, or
paste a URL) and an image-list editor. The machine exposes both as field types:

```ts
fields: {
  image:  { type: "image", label: "Image" },        // single -> media_picker
  images: { type: "imageList", label: "Images" },    // many   -> repeater of pickers
}
```

- `image` props as a `string` (the asset URL).
- `imageList` props as `ImageItem[]` (`{ url, alt }[]`), with add/upload/reorder
  and per-item alt text. See the `Gallery/` block.

## Production adapters

`astro.config.mjs` uses SQLite + local storage for dev. For production, swap the
adapters to Postgres (Railway) + R2 — `src/peak/` does not change:

```js
import { postgres } from "emdash/db";      // Railway Postgres
import { s3 } from "emdash/storage";        // Cloudflare R2 (S3 API)
```

## Verify

```bash
pnpm install
pnpm --filter @peak/site dev
# open http://localhost:4321        -> Hero renders via the registry
# open http://localhost:4321/_emdash/admin -> "Hero" appears in the block picker
```

> Verification note: the registry uses `import.meta.glob`. It is confirmed to
> work for `PeakRenderer.astro` (site side). The admin side feeds the same
> registry into `cms/plugin.ts`; confirm the "Hero" block appears in the editor
> on first `pnpm dev`. If a plugin entrypoint cannot evaluate `import.meta.glob`
> at that stage, the generator can instead emit explicit imports — a one-line
> change to `new-block.mjs`, with `src/peak/` otherwise unchanged.
