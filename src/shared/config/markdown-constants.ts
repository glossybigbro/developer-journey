/**
 * External Service URLs for Markdown Generation
 */
export const MARKDOWN_URLS = {
    GITHUB_BASE_URL: 'https://github.com',
    GITHUB_API_BASE_URL: 'https://api.github.com',
    CAPSULE_RENDER: 'https://capsule-render.vercel.app/api',
    GITHUB_README_STATS: {
        BASE: 'https://github-readme-stats.vercel.app/api',
        TOP_LANGS: 'https://github-readme-stats.vercel.app/api/top-langs/',
        PIN: 'https://github-readme-stats.vercel.app/api/pin/',
        WAKATIME: 'https://github-readme-stats.vercel.app/api/wakatime',
    },
    GITHUB_README_ACTIVITY_GRAPH: 'https://github-readme-activity-graph.vercel.app/graph',
    GITHUB_README_STREAK_STATS: 'https://github-readme-streak-stats.herokuapp.com/',
    STAR_HISTORY: 'https://api.star-history.com/svg',
    SHIELDS_IO: {
        BADGE: 'https://img.shields.io/badge/',
        ISSUES_PR: 'https://img.shields.io/github/issues-pr/',
        ISSUES: 'https://img.shields.io/github/issues/',
    },
    NOVATOREM_SPOTIFY: 'https://novatorem.vercel.app/api/spotify',
    KOMAREV_VISITORS: 'https://komarev.com/ghpvc/',
}

/**
 * Template and Theme Configuration
 * Note: Template IDs synchronized with templates.ts
 */
export const THEME_MAPPING: Record<string, string> = {
    'guilyx': 'default',
    'minimal': 'default',
    'space-ghibli': 'tokyonight',
}

export const COLOR_SCHEMES: Record<string, string> = {
    'guilyx': 'blue',
    'minimal': 'blue',
    'space-ghibli': 'blueviolet',
}

/**
 * Default Repository Configuration
 * TODO: Make this configurable via user input
 */
export const DEFAULT_REPOSITORY = 'github-profile-generator' as const
