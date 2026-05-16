import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getNavLink } from "@/lib/blog-helpers";
import { siteInfo } from "@/site.config";

export const GET = async () => {
	const posts = (await getCollection("posts"))
		.filter((p) => !p.data.hidden && !p.data.draft)
		.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

	return rss({
		stylesheet: getNavLink("/rss-styles.xsl"),
		title: siteInfo.title,
		description: siteInfo.description,
		site: import.meta.env.SITE,
		customData: `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description || "",
			pubDate: post.data.date,
			link: getNavLink(`/blog/${post.id}/`),
			categories: post.data.tags || [],
		})),
	});
};
