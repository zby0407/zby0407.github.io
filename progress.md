# Progress Log

## Session: 2026-05-15

### Phase 1: Research & Backup
- **Status:** complete
- **Started:** 2026-05-15
- Actions taken:
  - Cloned webtrotion template to /tmp/webtrotion-tmp
  - Analyzed webtrotion structure: Astro v6 + Tailwind v4, Notion CMS, rich component library
  - Analyzed current project: as-folio based, local Markdown content, custom golden theme
  - Created task_plan.md, findings.md, progress.md
  - Identified key differences and migration strategy
- Files created/modified:
  - task_plan.md (created)
  - findings.md (created)
  - progress.md (created)

### Phase 2: Infrastructure Setup
- **Status:** complete
- Actions taken:
  - Updated package.json with merged dependencies
  - Updated tsconfig.json with webtrotion path aliases
  - Updated postcss.config.js for Tailwind v4
  - Created astro.config.ts (simplified from webtrotion)
  - Created constants-config.json5 with golden theme colors
- Files created/modified:
  - package.json (updated)
  - tsconfig.json (updated)
  - postcss.config.js (updated)
  - astro.config.ts (created)
  - constants-config.json5 (created)

### Phase 3: Port Webtrotion Core Code
- **Status:** complete
- Actions taken:
  - Copied webtrotion src/ directory
  - Removed src/lib/notion/ entirely
  - Removed src/components/notion-blocks/ entirely
  - Removed src/components/NotionBlocks.astro
  - Removed Notion-specific integrations
  - Kept: layouts, UI components, scripts, utils
- Files created/modified:
  - src/ (replaced with webtrotion code, then cleaned)

### Phase 4: Adapt Content System
- **Status:** complete
- Actions taken:
  - Restored src/content/ (posts, projects)
  - Restored src/data/ (about.mdx, repositories.yml)
  - Restored src/config/site.ts
  - Restored src/content.config.ts
  - Created src/pages/index.astro (home with recent posts)
  - Created src/pages/blog/index.astro (blog listing)
  - Created src/pages/blog/[slug].astro (post detail)
  - Created src/pages/projects/index.astro (projects listing)
  - Created src/pages/about.astro (about page)
  - Created src/pages/404.astro (404 page)
  - Created src/pages/rss.xml.ts (RSS feed)
  - Created src/pages/sitemap.xml.ts (sitemap)
- Files created/modified:
  - Multiple page files in src/pages/

### Phase 5: Theme Customization
- **Status:** complete
- Actions taken:
  - Set light accent to #b8860b (golden)
  - Set dark accent to #d4a843 (light golden)
  - Configured Noto Serif SC font
  - Theme CSS auto-generated via theme-constants-to-css integration
- Files created/modified:
  - constants-config.json5 (updated)
  - src/styles/global.css (auto-generated)

### Phase 6: Testing & Build
- **Status:** complete
- Actions taken:
  - Installed dependencies (yarn install)
  - Fixed multiple build errors (PostCSS config, missing exports, Notion references)
  - Successfully built: 8 pages
  - Generated pagefind search index: 8 pages, 474 words
  - Verified theme colors in generated CSS
- Files created/modified:
  - Various fixes in src/constants.ts, src/lib/blog-helpers.ts, src/utils/index.ts

## Test Results
| Test | Input | Expected | Actual | Status |
|------|-------|----------|--------|--------|
| yarn build | `yarn build` | Build success | 8 pages built | ✓ |
| Pagefind index | `npx pagefind --site dist` | Index generated | 8 pages, 474 words | ✓ |
| Theme colors | Check CSS variables | Golden accent | #b8860b (light), #d4a843 (dark) | ✓ |
| Content preserved | Check posts | 3 posts + 1 project | All present | ✓ |
| Navigation | Check header/footer | 4 links | 首页, 文章, 项目, 关于 | ✓ |

## Error Log
| Timestamp | Error | Attempt | Resolution |
|-----------|-------|---------|------------|
| 2026-05-15 14:13 | `@fontsource/noto-serif-sc` not found | 1 | Removed from package.json |
| 2026-05-15 14:13 | `@astrojs/internal-helpers` export error | 1 | Clean install |
| 2026-05-15 14:14 | `module is not defined` in postcss.config.js | 1 | Converted to ESM |
| 2026-05-15 14:15 | `getAllPosts` from notion/client | 1 | Replaced with getCollection |
| 2026-05-15 14:16 | `TRACKING` not exported | 1 | Added missing constants |

## 5-Question Reboot Check
### Phase 7: Blog Detail Page Polish
- **Status:** complete
- **Started:** 2026-05-15
- Actions taken:
  - Rewrote `src/pages/blog/[slug].astro` to match webtrotion's BlogPost layout
  - Created `src/components/blog/TOC.astro` (floating sidebar with visual dots + hover content)
  - Created `src/components/blog/TOCHeading.astro` (recursive TOC heading renderer)
  - Added Hero section: h1.title with data-pagefind attributes, description in `<q>`, FormattedDate, lastmod badge, pill-style tags
  - Added `<hr class="divider">` after hero and before content
  - Added `data-pagefind-body` attribute to article for search indexing
  - Added back-to-top button with IntersectionObserver on #blog-hero
  - Uses `max-w-[708px] sm:mr-20 print:mr-auto print:max-w-full` container
- Files created/modified:
  - `src/pages/blog/[slug].astro` (rewritten)
  - `src/components/blog/TOC.astro` (created)
  - `src/components/blog/TOCHeading.astro` (created)

## Test Results
| Test | Input | Expected | Actual | Status |
|------|-------|----------|--------|--------|
| yarn build | `yarn build` | Build success | 8 pages built | ✓ |
| Pagefind index | `npx pagefind --site dist` | Index generated | 3 pages, 346 words | ✓ |
| Theme colors | Check CSS variables | Golden accent | #b8860b (light), #d4a843 (dark) | ✓ |
| Content preserved | Check posts | 3 posts + 1 project | All present | ✓ |
| Navigation | Check header/footer | 4 links | 首页, 文章, 项目, 关于 | ✓ |
| Blog detail Hero | Check built HTML | Title + date + tags + divider | All present | ✓ |
| Blog detail TOC | Check built HTML | toc-container present | Present | ✓ |
| Blog detail back-to-top | Check built HTML | to-top-btn present | Present | ✓ |

## 5-Question Reboot Check
| Question | Answer |
|----------|--------|
| Where am I? | Phase 7 - Complete |
| Where am I going? | All phases complete |
| What's the goal? | Migrate to webtrotion template with local content |
| What have I learned? | Webtrotion's architecture, Tailwind v4 migration |
| What have I done? | Full migration + blog detail page polish |
