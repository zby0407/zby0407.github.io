# Findings & Decisions

## Requirements
- Migrate to webtrotion template architecture
- Keep all local content unchanged (Markdown/MDX/YAML files)
- Preserve current dark golden theme colors

## Research Findings
- Webtrotion uses Astro v6 + Tailwind v4 (same as current project)
- Webtrotion content comes from Notion API; we need to replace with local content
- Webtrotion has rich component library: Header, Footer, BaseHead, Search, ThemeIcon, popover, lightbox, etc.
- Webtrotion styles are generated via `theme-constants-to-css.ts` integration from `constants-config.json5`
- Current theme colors: purple (light)/cyan (dark) with custom golden accent (#b8860b light, #d4a843 dark)
- Current content: 3 posts, 1 project, about.mdx, repositories.yml
- Current pages: index, blog list, blog detail, projects, about, tags, categories, RSS, sitemap

## Technical Decisions
| Decision | Rationale |
|----------|-----------|
| Remove Notion client entirely | Content will be local Markdown |
| Keep webtrotion layout components | Provides the desired UI |
| Keep webtrotion scripts (popover, lightbox, to-top) | Good UX features |
| Use constants-config.json5 for theme | Webtrotion's theme system |
| Preserve Astro Content Layer | Current content system works well |
| Remove advanced features initially | Footnotes, citations, webmentions, external content |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
|       |            |

## Resources
- Webtrotion repo: https://github.com/nerdymomocat-templates/webtrotion-astro-notion-cms-website-blog
- Webtrotion demo: https://nerdymomocat-templates.github.io/webtrotion-astro-notion-cms-website-blog/

## Visual/Browser Findings
- Webtrotion has clean, minimalist design
- Single-column content layout with generous spacing
- Top nav with logo + menu links
- Post previews show date, title, description, tags
- Dark mode via `.dark` class on html
- Pagefind search integration
