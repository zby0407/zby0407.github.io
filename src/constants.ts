import fs from "fs";
import JSON5 from "json5";

const configContent = fs.readFileSync("./constants-config.json5", "utf8");
const config = JSON5.parse(configContent);
const key_value_from_json = { ...config };

export const CUSTOM_DOMAIN =
	process.env.CUSTOM_DOMAIN || key_value_from_json?.["site-info"]?.["custom-domain"] || "";
export const BASE_PATH =
	process.env.BASE ||
	process.env.BASE_PATH ||
	key_value_from_json?.["site-info"]?.["base-path"] ||
	"";

export const ENABLE_LIGHTBOX =
	key_value_from_json?.["block-rendering"]?.["enable-lightbox"] || false;

export const HOME_PAGE_SLUG =
	key_value_from_json?.["collections-and-listings"]?.["home-page-slug"] || "home";

export const NUMBER_OF_POSTS_PER_PAGE =
	key_value_from_json?.["collections-and-listings"]?.["number-of-posts-per-page"] || 10;

export const RECENT_POSTS_ON_HOME_PAGE =
	key_value_from_json?.["collections-and-listings"]?.["recent-posts-on-home-page"] || false;

export const HIDE_UNDERSCORE_SLUGS_IN_LISTS =
	key_value_from_json?.["collections-and-listings"]?.["hide-underscore-slugs-in-lists"] || false;

export const LISTING_VIEW: "list" | "gallery" =
	key_value_from_json?.["collections-and-listings"]?.["listing-view"] === "gallery"
		? "gallery"
		: "list";

export const SOCIALS = key_value_from_json["socials"] || {};

export const THEME = key_value_from_json["theme"] || {};

export const OG_SETUP = key_value_from_json["og-setup"] || {
	columns: 1,
	excerpt: false,
};

export const TRACKING = key_value_from_json["tracking"] || {};

export const GISCUS = key_value_from_json?.comments?.giscus || null;

export const GOOGLE_SEARCH_CONSOLE_META_TAG =
	key_value_from_json?.tracking?.["google-search-console-html-tag"] || null;

export const AUTHOR = key_value_from_json?.["site-info"]?.author || "";
