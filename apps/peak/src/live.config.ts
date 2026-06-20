/**
 * EmDash Live Content Collections
 *
 * Defines the _emdash collection that handles all content types from the
 * database. Query specific types using getEmDashCollection() and
 * getEmDashEntry(). Without this file those queries return nothing.
 */

import { defineLiveCollection } from "astro:content";
import { emdashLoader } from "emdash/runtime";

export const collections = {
	_emdash: defineLiveCollection({ loader: emdashLoader() }),
};
