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
    ACTIVITY_GRAPH_DOCS: 'https://github.com/Ashutosh00710/github-readme-activity-graph',
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
 * UI Text Constants
 */
export const UI_TEXT = {
    ACTIVITY_GRAPH_PLACEHOLDER: 'My Activity Graph',
}

/**
 * Default Data Configuration
 */
export const DEFAULT_BIO_DATA = {
    LOCATED_IN: 'San Francisco, CA',
    FROM: 'United States',
    JOB: 'Software Engineer',
    EDUCATION: ["Bachelor's in Computer Science"],
    COMPANY: 'Tech Company',
    FIELDS: ["Web Development", "Open Source", "DevOps"],
    TECH_STACK: ["React", "Node.js", "TypeScript", "Next.js"],
    LEARNING: ["AI/ML", "Web3", "Rust"],
    HOBBIES: ["Coding", "Reading", "Gaming", "Music"],
}

export const DEFAULT_WORKFLOWS = ['wakatime-stats', 'update-gh-activity']

/**
 * Socialify Configuration
 */
export const SOCIALIFY_CONFIG = {
    BASE_URL: 'https://socialify.git.ci',
    DEFAULT_PARAMS: {
        font: 'Source Code Pro',
        forks: '1',
        issues: '1',
        language: '1',
        name: '1',
        owner: '1',
        pattern: 'Plus',
        pulls: '1',
        stargazers: '1',
        theme: 'Dark'
    }
}

/**
 * Social Badge Configuration
 */
export const SOCIAL_BADGES = {
    LINKEDIN: {
        BASE_URL: 'https://www.linkedin.com/in/',
        BADGE: 'https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white'
    },
    GITHUB: {
        BASE_URL: 'https://github.com/',
        BADGE: 'https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white'
    },
    TWITTER: {
        BASE_URL: 'https://twitter.com/',
        BADGE: 'https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white'
    }
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

/**
 * UI Default Configuration
 */
export const UI_DEFAULTS = {
    ACCENT_COLOR: '#00d9ff',
    THEME: 'dark' as const,
    ACTIVITY_GRAPH_THEME: 'tokyo-night',
    ACTIVITY_GRAPH_DAYS: 31,
    ACTIVITY_GRAPH_RADIUS: 0,
}
