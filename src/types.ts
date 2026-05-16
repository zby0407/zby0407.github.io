export type SocialLink = {
	name: string;
	friendlyName: string;
	link: string;
	isWebmention?: boolean;
};

export type SiteConfig = {
	author: string;
	title: string;
	description: string;
	lang: string;
	ogLocale: string;
	date: {
		locale: string | string[] | undefined;
		options: Intl.DateTimeFormatOptions;
	};
	homePageSlug: string;
	webmentions?: {
		link: string;
		pingback?: string;
	};
	logo?: { Url: string; Type: string } | null;
};

export type PaginationLink = {
	url: string;
	text?: string;
	srLabel?: string;
};

export type SiteMeta = {
	title: string;
	description?: string;
	ogImage?: string | undefined;
	articleDate?: string | undefined;
	author?: string | undefined;
	hasMarkdownAlternate?: boolean | undefined;
};

export type Heading = { text: string; slug: string; depth: number };
