export const MARKDOWN_FORMAT = {
    BOLD: '**',
    ITALIC: '*',
    STRIKETHROUGH: '~~',
    CODE: '`',
    QUOTE: '> '
} as const

export const ALERT_TYPES = {
    NOTE: 'NOTE',
    TIP: 'TIP',
    WARNING: 'WARNING',
    CAUTION: 'CAUTION'
} as const

export const ALERT_TEMPLATES = {
    NOTE: '> [!NOTE]\n> ',
    TIP: '> [!TIP]\n> ',
    WARNING: '> [!WARNING]\n> ',
    CAUTION: '> [!CAUTION]\n> '
} as const
