import { HOME_PAGE_SLUG } from "../constants";
import path from "path";

const BASE_PATH = import.meta.env.BASE_URL;

export const getNavLink = (nav: string) => {
	if (!nav && BASE_PATH) {
		return path.join(BASE_PATH, "") + "/";
	}
	return path.join(BASE_PATH, nav);
};

export const normalizeNavPath = (inputPath: string, basePath = import.meta.env.BASE_URL) => {
	const base = (basePath || "").replace(/\/+$/, "");
	let out = inputPath || "/";
	if (base && out.startsWith(base)) {
		out = out.slice(base.length) || "/";
	}
	out = out.replace(/\/+$/, "");
	return out === "" ? "/" : out;
};

export const resolvePostHref = (post: { Slug?: string; Collection?: string }) => {
	if (!post.Slug) return "/";
	if (post.Slug === HOME_PAGE_SLUG) return "/";
	const collection = post.Collection ? `${post.Collection}/` : "";
	return `/${collection}${post.Slug}/`;
};

export const getPostLink = (slug: string, trailingSlash = true) => {
	const link = getNavLink(`/${slug}`);
	return trailingSlash && !link.endsWith("/") ? `${link}/` : link;
};
