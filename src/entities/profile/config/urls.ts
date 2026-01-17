/**
 * External Service URLs
 * 
 * @description
 * Shared configuration for external APIs and services.
 * Domain-agnostic URLs that can be used across the application.
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
