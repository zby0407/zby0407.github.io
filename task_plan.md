# Task Plan: Migrate to Webtrotion Template Architecture with Local Content

## Goal
Replace the current as-folio template with webtrotion's codebase, adapting it to use local Markdown/MDX content instead of Notion CMS, while preserving the current dark golden theme.

## Current Phase
Phase 6 - Complete

## Phases

### Phase 1: Research & Backup
- [x] Clone and inspect webtrotion template structure
- [x] Document current project content and configuration
- [x] Backup current files that need preservation
- [x] Identify webtrotion files to keep vs remove
- **Status:** complete

### Phase 2: Infrastructure Setup
- [x] Replace package.json (merge dependencies)
- [x] Replace tsconfig.json
- [x] Replace postcss.config.js (Tailwind v4)
- [x] Replace astro.config.ts (simplify, remove Notion integrations)
- [x] Create constants-config.json5 with current theme colors
- [x] Install dependencies
- **Status:** complete

### Phase 3: Port Webtrotion Core Code
- [x] Copy webtrotion src/ directory (layouts, components, utils, scripts)
- [x] Remove Notion-specific code (src/lib/notion/, notion-blocks components, NotionBlocks.astro)
- [x] Remove Notion-specific integrations
- [x] Keep: layout components, UI components, listing components, scripts
- **Status:** complete

### Phase 4: Adapt Content System
- [x] Preserve content.config.ts and src/content/ files
- [x] Preserve src/config/site.ts
- [x] Rebuild pages using webtrotion layouts but local content queries
- [x] Create index.astro (home page)
- [x] Create blog pages (list + detail)
- [x] Create projects page
- [x] Create about page
- [x] Create 404 page
- [x] Create RSS feed
- [x] Create sitemap
- **Status:** complete

### Phase 5: Theme Customization
- [x] Configure constants-config.json5 with current as-folio colors
- [x] Adjust global.css for current theme
- [x] Ensure dark mode works with current color scheme
- **Status:** complete

### Phase 6: Testing & Build
- [x] Run yarn build
- [x] Fix TypeScript errors
- [x] Fix runtime errors
- [x] Verify all pages render correctly
- [x] Verify content is preserved
- [x] Generate pagefind search index
- **Status:** complete

### Phase 7: Blog Detail Page Polish
- [x] Rewrite `src/pages/blog/[slug].astro` to match webtrotion's BlogPost layout
- [x] Add Hero section with title, description, date, tags
- [x] Add TOC sidebar with visual dots and intersection observer
- [x] Add divider after hero
- [x] Add `data-pagefind-body` for search indexing
- [x] Add back-to-top button with IntersectionObserver
- [x] Build and verify
- **Status:** complete

## Key Questions
1. How much of webtrotion's advanced features (footnotes, citations, webmentions, external content) should be preserved? -> Removed for simplicity
2. Should we keep the popover/interlinked content features? -> Kept basic popover functionality
3. What's the minimal viable feature set? -> Core layout, navigation, content display, search, dark mode

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| Remove Notion CMS entirely | User wants content to stay local |
| Keep webtrotion layout components | Provides the desired UI |
| Keep webtrotion scripts (popover, lightbox, to-top) | Good UX features |
| Use constants-config.json5 for theme | Webtrotion's theme system |
| Preserve Astro Content Layer | Current content system works well |
| Remove advanced features initially | Footnotes, citations, webmentions, external content |
| Use golden accent color (#b8860b light, #d4a843 dark) | Matches original as-folio theme |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| `@fontsource/noto-serif-sc` not found | 1 | Removed from package.json |
| `@astrojs/internal-helpers` export error | 1 | Clean install (rm node_modules + yarn install) |
| PostCSS CommonJS/ESM mismatch | 1 | Changed postcss.config.js to ESM syntax |
| `getAllPosts` from `@/lib/notion/client` not found | 1 | Replaced with `getCollection("posts")` from Astro Content Layer |
| `TRACKING` not exported from constants.ts | 1 | Added missing constants |
| `adjustedFootnotesConfig` from notion/client | 1 | Removed from Base.astro |
| `module is not defined` in postcss.config.js | 1 | Converted to ESM export default |

## Notes
- Build successful: 8 pages built
- Pagefind index generated: 8 pages, 474 words
- Theme colors correctly applied: light accent #b8860b, dark accent #d4a843
- All original content preserved: 3 posts, 1 project, about page
