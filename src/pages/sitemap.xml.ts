import { getCollection } from "astro:content";
import { getNavLink } from "@/lib/blog-helpers";

export const GET = async () => {
	const posts = await getCollection("posts");
	const projects = await getCollection("projects");

	const urls = [
		getNavLink("/"),
		getNavLink("/blog/"),
		getNavLink("/projects/"),
		getNavLink("/about/"),
		...posts.map((post) => getNavLink(`/blog/${post.id}/`)),
		...projects.map((project) => getNavLink(`/projects/${project.id}/`)),
	];

	const entries = urls
		.map((url) => {
			const fullUrl = new URL(url, import.meta.env.SITE).toString();
			return `<url><loc>${fullUrl}</loc></url>`;
		})
		.join("");

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${entries}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			"Content-Type": "text/xml",
		},
	});
};
