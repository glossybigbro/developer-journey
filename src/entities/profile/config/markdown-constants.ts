// MARKDOWN_URLS moved to @/shared/config/urls

/**
 * UI Text Constants
 */
export const MARKDOWN_UI_TEXT = {
    ACTIVITY_GRAPH_PLACEHOLDER: 'My Activity Graph',
    ACTIVITY_GRAPH_LABELS: {
        AREA_FILL: 'Area Fill',
        SHOW_GRID: 'Show Grid',
        HIDE_BORDER: 'Hide Border',
        HIDE_TITLE: 'Hide Title',
        CUSTOM_TITLE: 'Custom Title',
        RADIUS: 'Radius',
        DAYS: 'Days',
        THEME: 'Theme',
        DOCS_LINK: 'Advanced Documentation ✨'
    }
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

// SOCIAL constants moved to @/shared/config/urls

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
