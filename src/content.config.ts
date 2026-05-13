import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

// ─── Posts ─────────────────────────────────────────────────────────────────

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional().default([]),
    categories: z.array(z.string()).optional().default([]),
    /** Enable KaTeX math rendering. */
    math: z.boolean().optional().default(false),
    /** Show table of contents sidebar. */
    toc: z.boolean().optional().default(true),
    /** Show related posts section. */
    relatedPosts: z.boolean().optional().default(false),
    /** Pin to top of blog listing. */
    pinned: z.boolean().optional().default(false),
    /** Hide from blog listing (but accessible via direct URL). */
    hidden: z.boolean().optional().default(false),
    /** Draft post — hidden from all listings and the search index until published. */
    draft: z.boolean().optional().default(false),
    /** Override the robots meta tag (e.g. 'noindex, nofollow'). */
    robots: z.string().optional(),
    /** Last modified date. */
    lastmod: z.coerce.date().optional(),
    /** Hero/thumbnail image path. */
    image: z.string().optional(),
    /** Load PhotoSwipe gallery on this post. */
    gallery: z.boolean().optional().default(false),
  }),
});

// ─── Projects ──────────────────────────────────────────────────────────────

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    /** Thumbnail image path. */
    img: z.string().optional(),
    /** Alt text for image. */
    img_alt: z.string().optional(),
    /** External URL (e.g. GitHub repo). */
    url: z.string().url().optional(),
    /** GitHub repo in format owner/repo. */
    github: z.string().optional(),
    /** Sort order (lower = shown first). */
    importance: z.number().optional().default(999),
    /** Badge label shown on card. */
    category: z.string().optional(),
    /** Show redirect to external url instead of project page. */
    redirect: z.string().url().optional(),
    /** Enable Giscus comments on the project page. */
    giscus_comments: z.boolean().optional().default(false),
  }),
});

export const collections = { posts, projects };
