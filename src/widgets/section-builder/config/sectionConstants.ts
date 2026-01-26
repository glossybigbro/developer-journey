/**
 * UI Text Constants for Section Builder
 */
export const SECTION_UI_LABELS = {
    STATUS: {
        LOCKED: '🔒 Locked',
        COMING_SOON: 'COMING SOON',
    },
    ACTIONS: {
        ADD: 'ADD',
    },
} as const

// IDs of sections that have a settings popover
export const CUSTOMIZABLE_SECTION_IDS = [
    'activity-graph',
    'productive-time',
    'weekly-languages',
    'weekly-projects',
    'yaml-bio'
] as const
