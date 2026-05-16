import type { SiteConfig } from "@/types";

export const siteInfo: SiteConfig = {
	title: "Horo's Parchment",
	description: "賢狼の羊皮紙",
	author: "ホロ",
	lang: "zh-CN",
	ogLocale: "zh-CN",
	homePageSlug: "home",
	date: {
		locale: "zh-CN",
		options: {
			year: "numeric",
			month: "short",
			day: "numeric",
		},
	},
	logo: null,
};
