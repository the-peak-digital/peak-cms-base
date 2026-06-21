/**
 * defineBlock — the single source of truth for a Peak block.
 *
 * You declare a block's editable fields ONCE here. From that one declaration we
 * derive everything else:
 *
 *   1. the admin editor schema   -> toPortableTextBlock()  (Block Kit fields)
 *   2. the TypeScript node props -> InferProps<typeof schema>
 *   3. the default field values  -> defaults()
 *
 * This removes the drift that normally exists between a block's editor schema
 * and its Astro component props. Add a field once, both sides know about it.
 *
 * Field types map to Emdash Block Kit elements (see the creating-plugins
 * skill's block-kit.md). Block Kit has no object-group or nested-repeater
 * element, so compose with flat fields and `multiline` text (split on newline
 * at render time) for list-like data.
 */

export type FieldType =
	| "text"
	| "multiline"
	| "number"
	| "toggle"
	| "select"
	| "image"
	| "imageList"
	| "list";

/** Shape of one item in an `imageList` field. */
export interface ImageItem {
	url?: string;
	alt?: string;
}

export interface FieldDef {
	/** Which editor control to render. */
	type: FieldType;
	/** Human label shown in the admin form. */
	label: string;
	/** Options for `select` fields. Ignored otherwise. */
	options?: ReadonlyArray<{ label: string; value: string }>;
	/** Placeholder text for text inputs. */
	placeholder?: string;
	/** Default value used by defaults() and as the editor's initial value. */
	default?: string | number | boolean;
	/** For a `select`: load options dynamically from a peak-blocks plugin route
	 *  (the admin POSTs to /_emdash/api/plugins/peak-blocks/<optionsRoute>). */
	optionsRoute?: string;
	/** Singular noun for the "Add <x>" button on a `list` field. */
	itemLabel?: string;
	/** Sub-fields for a `list` field (one editable group per item). Scalars and
	 *  `image` only — Block Kit repeaters can't nest another repeater. */
	fields?: Record<string, FieldDef>;
}

export interface BlockConfig {
	/** Portable Text `_type`, e.g. "peak.hero". Must be globally unique. */
	type: string;
	/** Label shown in the editor's block picker. */
	label: string;
	/** Grouping in the block picker, e.g. "Local SEO". */
	category?: string;
	/** Block Kit icon key (video | code | link | link-external). Optional. */
	icon?: string;
	/** One-line description in the block picker. */
	description?: string;
	/** Editable fields, keyed by their `action_id` (becomes the data key). */
	fields: Record<string, FieldDef>;
}

/**
 * Common fields injected into EVERY block automatically. Authors never declare
 * these; editors always get them. "Text size" sets a font scale the renderer
 * applies via the --peak-font-scale CSS variable.
 */
export const FONT_SIZE_OPTIONS = [
	{ label: "Small", value: "sm" },
	{ label: "Medium (default)", value: "md" },
	{ label: "Large", value: "lg" },
	{ label: "Extra large", value: "xl" },
] as const;

/** value -> multiplier applied to a block's text sizes. */
export const FONT_SIZE_SCALE: Record<string, number> = { sm: 0.9, md: 1, lg: 1.18, xl: 1.4 };

export const WIDTH_OPTIONS = [
	{ label: "Normal", value: "contained" },
	{ label: "Full background", value: "full-bg" },
	{ label: "Full width", value: "full" },
] as const;

const COMMON_FIELDS: Record<string, FieldDef> = {
	fontSize: {
		type: "select",
		label: "Text size",
		options: FONT_SIZE_OPTIONS,
		default: "md",
	},
	width: {
		type: "select",
		label: "Width",
		options: WIDTH_OPTIONS,
		default: "full-bg",
	},
};

/** Maps a single field declaration to its Block Kit element. */
function fieldToElement(actionId: string, f: FieldDef): Record<string, unknown> {
	const base = { action_id: actionId, label: f.label };
	switch (f.type) {
		case "text":
			return { type: "text_input", ...base, placeholder: f.placeholder };
		case "multiline":
			return { type: "text_input", ...base, multiline: true, placeholder: f.placeholder };
		case "number":
			return { type: "number_input", ...base };
		case "toggle":
			return { type: "toggle", ...base, initial_value: Boolean(f.default) };
		case "select":
			return {
				type: "select",
				...base,
				options: f.options ?? [],
				...(f.optionsRoute ? { optionsRoute: f.optionsRoute } : {}),
			};
		case "image":
			// Emdash's visual media picker: browse the library, upload a new file
			// (stored in R2/local), or paste a URL. Stored value is the asset URL.
			return {
				type: "media_picker",
				...base,
				mime_type_filter: "image/",
				placeholder: f.placeholder ?? "Select image",
			};
		case "imageList":
			// A repeater of media pickers: add/upload/reorder many images, each
			// with alt text. Stored value is an array of { url, alt }.
			return {
				type: "repeater",
				...base,
				item_label: "image",
				fields: [
					{ type: "media_picker", action_id: "url", label: "Image", mime_type_filter: "image/" },
					{ type: "text_input", action_id: "alt", label: "Alt text (for SEO)" },
				],
			};
		case "list":
			// A repeater of editable groups (FAQ items, reviews, steps, …). Stored
			// value is an array of objects keyed by the sub-field action_ids.
			return {
				type: "repeater",
				...base,
				item_label: f.itemLabel ?? "item",
				fields: Object.entries(f.fields ?? {}).map(([id, sf]) => fieldToElement(id, sf)),
			};
	}
}

export interface PeakBlock<C extends BlockConfig = BlockConfig> {
	readonly type: C["type"];
	readonly config: C;
	/** The admin `portableTextBlocks` entry derived from this block. */
	toPortableTextBlock(): Record<string, unknown>;
	/** The default `node` content for a freshly inserted block. */
	defaults(): Record<string, unknown>;
}

export function defineBlock<const C extends BlockConfig>(config: C): PeakBlock<C> {
	// Author fields first, then the common fields every block shares (Text size).
	const allFields: Record<string, FieldDef> = { ...config.fields, ...COMMON_FIELDS };
	return {
		type: config.type,
		config,
		toPortableTextBlock() {
			return {
				type: config.type,
				label: config.label,
				category: config.category,
				icon: config.icon,
				description: config.description,
				fields: Object.entries(allFields).map(([id, f]) => fieldToElement(id, f)),
			};
		},
		defaults() {
			const out: Record<string, unknown> = {};
			for (const [id, f] of Object.entries(allFields)) {
				if (f.default !== undefined) out[id] = f.default;
			}
			return out;
		},
	};
}

/** Maps a field's editor type to the TypeScript type the component receives. */
type FieldToTs<F extends FieldDef> = F["type"] extends "toggle"
	? boolean
	: F["type"] extends "number"
		? number
		: F["type"] extends "imageList"
			? ImageItem[]
			: F["type"] extends "list"
				? F extends { fields: infer SF extends Record<string, FieldDef> }
					? Array<{ [K in keyof SF]?: FieldToTs<SF[K]> }>
					: Array<Record<string, unknown>>
				: string; // text | multiline | select | image are all string (image = URL)

/**
 * Derives the `Astro.props.node` shape from a block schema. Fields are optional
 * because editors may leave them empty.
 *
 *   export const schema = defineBlock({ ... });
 *   export type HeroProps = InferProps<typeof schema>;
 */
export type InferProps<S extends PeakBlock> = {
	[K in keyof S["config"]["fields"]]?: FieldToTs<S["config"]["fields"][K]>;
};
