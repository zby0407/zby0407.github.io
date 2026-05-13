/**
 * Site configuration
 */

/** A simple navigation link. */
export type NavLeaf = { label: string; href: string };

/** A dropdown group. */
export type NavDropdown = { label: string; children: NavLeaf[] };

/** A top-level nav entry. */
export type NavItem = NavLeaf | NavDropdown;

export const site = {
  // ─── Identity ──────────────────────────────────────────────────────────────

  /** Site title. */
  title: '你的名字',

  /** Site description. */
  description: '记录技术与生活',

  /** Full URL of deployed site. */
  url: (import.meta.env.SITE ?? 'https://example.github.io').replace(/\/$/, ''),

  /** Base path. */
  base: import.meta.env.BASE_URL === '/' ? '' : (import.meta.env.BASE_URL ?? '').replace(/\/$/, ''),

  /** Language code. */
  lang: 'zh-CN',

  // ─── Author ────────────────────────────────────────────────────────────────

  author: {
    /** Full name. */
    name: '你的名字',

    /** Email address. */
    email: 'your@email.com',

    /** Path to profile photo. */
    avatar: '/assets/img/prof_pic.jpg',

    /** Subtitle below name on about page. */
    subtitle: '开发者 / 摄影爱好者 / 生活记录者',

    /** Address block below profile photo. */
    moreInfo: '',
  },

  // ─── Social links ──────────────────────────────────────────────────────────

  socials: {
    email: 'your@email.com',
    x_username: undefined as string | undefined,
    linkedin_username: undefined as string | undefined,
    github_username: 'yourusername',
    gitlab_username: undefined as string | undefined,
    scholar_userid: undefined as string | undefined,
    orcid_id: undefined as string | undefined,
    inspire_id: undefined as string | undefined,
    researchgate_username: undefined as string | undefined,
    arxiv_id: undefined as string | undefined,
    youtube_id: undefined as string | undefined,
    instagram_username: undefined as string | undefined,
    mastodon_url: undefined as string | undefined,
    bluesky_handle: undefined as string | undefined,
    medium_username: undefined as string | undefined,
    cv_pdf: undefined as string | undefined,
    rss_icon: true,
  },

  // ─── Navigation ────────────────────────────────────────────────────────────

  navbar: {
    /** Fix navbar to top of viewport. */
    fixed: false,
    /** Show social icons in navbar. */
    socialIcons: false,
    /** Top-level navigation items. */
    items: [
      { label: '首页', href: '/' },
      { label: '文章', href: '/blog/' },
      { label: '项目', href: '/projects/' },
      { label: '关于', href: '/about/' },
    ] as NavItem[],
  },

  // ─── Footer ────────────────────────────────────────────────────────────────

  footer: {
    /** Footer text. */
    text: '',
    /** Show "Last updated" timestamp. */
    lastUpdated: false,
    /** Path to impressum/legal page. */
    impressum: undefined as string | undefined,
    /** Footer position. */
    position: 'normal' as 'sticky' | 'normal' | 'hidden',
  },

  // ─── Blog ──────────────────────────────────────────────────────────────────

  blog: {
    /** Name shown in the blog page heading. */
    name: '文章',
    description: '记录技术与生活的点滴',
    /** Number of posts per page. */
    postsPerPage: 10,
    /** Tags shown as badges. */
    displayTags: [],
    /** Categories shown as badges. */
    displayCategories: [],
    /** External post sources. */
    externalSources: [] as Array<{
      name: string;
      rssUrl?: string;
      posts?: Array<{ url: string; publishedDate: string }>;
      categories?: string[];
      tags?: string[];
    }>,
    /** Average reading speed. */
    wordsPerMinute: 300 as number,
    /** Message when no posts exist. */
    emptyMessage: '还没有文章，稍后再来看看吧。',
  },

  // ─── About page sections ──────────────────────────────────────────────────

  announcements: {
    enabled: false,
    scrollable: false,
    limit: undefined as number | undefined,
  },

  latestPosts: {
    enabled: true,
    scrollable: false,
    limit: 3 as number | undefined,
  },

  selectedPapers: {
    enabled: false,
  },

  // ─── Features ─────────────────────────────────────────────────────────────

  features: {
    /** Enable dark/light mode toggle. */
    darkmode: true,
    /** Enable ⌘K search. */
    search: true,
    /** Enable reading progress bar. */
    progressBar: false,
    /** Show back-to-top button. */
    backToTop: false,
    /** Enable automatic masonry layout. */
    masonry: false,
    /** Enable click-to-zoom on images. */
    mediumZoom: true,
    /** Show styled CSS tooltips. */
    tooltips: false,
    /** Enable GDPR-compliant cookie consent. */
    cookieConsent: false,
    /** Enable newsletter. */
    newsletter: false,
    /** Enable video embedding. */
    videoEmbedding: false,
    /** Enable Astro View Transitions. */
    viewTransitions: true,
    /** Show social sharing links. */
    socialShare: false,
  },

  // ─── Giscus comments ──────────────────────────────────────────────────────

  giscus: {
    enabled: false,
    lazyLoad: true,
    repo: '' as `${string}/${string}`,
    repoId: '',
    category: 'Comments',
    categoryId: '',
    mapping: 'title' as 'pathname' | 'url' | 'title' | 'og:title',
    strict: true,
    reactionsEnabled: true,
    inputPosition: 'bottom' as 'top' | 'bottom',
    darkTheme: 'dark',
    lightTheme: 'light',
    lang: 'zh-CN',
  },

  // ─── Analytics ────────────────────────────────────────────────────────────

  analytics: {
    ga4: '' as string,
    cronitor: '' as string,
    pirsch: '' as string,
    openpanel: '' as string,
    googleVerification: '' as string,
    bingVerification: '' as string,
  },

  // ─── Open Graph ───────────────────────────────────────────────────────────

  og: {
    enabled: true,
    image: '' as string,
  },

  // ─── Newsletter ───────────────────────────────────────────────────────────

  newsletter: {
    endpoint: '' as string,
  },

  // ─── Theme defaults ───────────────────────────────────────────────────────

  theme: {
    /** Default color theme. */
    default: 'system' as 'light' | 'dark' | 'system',

    /** Primary accent color. */
    color: {
      light: '#c45c48' as string,
      dark: '#d47360' as string,
    },
  },
} as const;

export type SiteConfig = typeof site;
