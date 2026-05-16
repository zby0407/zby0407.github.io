import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import robotsTxt from "astro-robots-txt";
import partytown from "@astrojs/partytown";
import fs from "fs";
import JSON5 from "json5";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import rehypeExternalLinks from "rehype-external-links";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import CSSWriter from "./src/integrations/theme-constants-to-css";

const configContent = fs.existsSync("./constants-config.json5")
	? fs.readFileSync("./constants-config.json5", "utf8")
	: "{}";
const config = JSON5.parse(configContent);

const CUSTOM_DOMAIN = config?.["site-info"]?.["custom-domain"] || "";
const BASE_PATH = config?.["site-info"]?.["base-path"] || "";

const getSite = function () {
	if (CUSTOM_DOMAIN) {
		return new URL(BASE_PATH || "/", `https://${CUSTOM_DOMAIN}`).toString();
	}
	if (process.env.GITHUB_PAGES) {
		return new URL(process.env.BASE || BASE_PATH || "/", process.env.SITE).toString();
	}
	return "http://localhost:4321";
};

const fontConfig = config?.theme?.["fontfamily-google-fonts"];
const fonts = [];
if (fontConfig) {
	const weights = [400, 500, 600, 700];
	const styles = ["normal", "italic"];
	const formats = ["woff2"] as const;
	const sansFontName = fontConfig["sans-font-name"];
	const monoFontName = fontConfig["mono-font-name"];
	if (sansFontName) {
		fonts.push({
			provider: fontProviders.google(),
			name: sansFontName,
			cssVariable: "--font-sans",
			weights,
			styles,
			formats,
			fallbacks: ["sans-serif"],
			optimizedFallbacks: true,
			display: "swap" as const,
		});
	}
	if (monoFontName) {
		fonts.push({
			provider: fontProviders.google(),
			name: monoFontName,
			cssVariable: "--font-mono",
			weights,
			styles,
			formats,
			fallbacks: ["monospace"],
			optimizedFallbacks: true,
			display: "swap" as const,
		});
	}
}

export default defineConfig({
	site: getSite(),
	base: process.env.BASE || BASE_PATH || "",
	cacheDir: "./tmp/.astro",
	output: "static",
	trailingSlash: "always",
	fonts,
	integrations: [
		mdx(),
		CSSWriter(),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		robotsTxt({
			sitemapBaseFileName: "sitemap",
		}),
	],
	image: {
		remotePatterns: [{}],
	},
	prefetch: true,
	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		remarkPlugins: [remarkGfm, remarkMath],
		rehypePlugins: [
			rehypeSlug,
			[rehypeKatex, { strict: false }],
			[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "prepend",
					properties: {
						class: "anchor-link",
						ariaHidden: true,
						tabIndex: -1,
					},
					content: {
						type: "element",
						tagName: "span",
						properties: { class: "anchor-icon" },
						children: [{ type: "text", value: "#" }],
					},
				},
			],
		],
		syntaxHighlight: "shiki",
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
		},
	},
});
