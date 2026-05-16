import { getNavLink } from "@/lib/blog-helpers";
export {
	getFormattedDate,
	getFormattedDateWithTime,
	getCalendarDateParts,
	getCalendarDateString,
	getDateObject,
	getDateTimeValue,
	getMachineDateISOString,
	areDifferentDates,
} from "@/utils/date";
export { generateToc, buildHeadings } from "@/utils/generateToc";
export type { TocItem } from "@/utils/generateToc";
export { slugify } from "@/utils/slugify";

export function getMenu(): { title: string; path: string; children?: { title: string; path: string }[] }[] {
	return [
		{ title: "首页", path: getNavLink("/") },
		{ title: "文章", path: getNavLink("/blog/") },
		{ title: "项目", path: getNavLink("/projects/") },
		{ title: "关于", path: getNavLink("/about/") },
	];
}
