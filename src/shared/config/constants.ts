export const APP_CONFIG = {
    TITLE: 'GitHub Profile Generator',
    SUBTITLE: 'Enter your GitHub username to generate your unique profile.',
    PLACEHOLDER: 'GitHub Username',

    BUTTONS: {
        VERIFY: 'Verify',
        CONTINUE: 'Continue',
        VERIFYING: 'Verifying...',
        CHANGE_USER: 'Change User',
        PREVIEW: 'Preview',
        CODE: 'Code',
        COPY: 'Copy Markdown',
        DOWNLOAD: 'Download Files',
        ALERT_COPY: 'Markdown copied to clipboard!',
        START: 'Start Generating',
        LOADING: 'Loading...',
    },

    TITLES: {
        SECTION_BUILDER: 'Section Builder',
        PREVIEW_WINDOW: 'GitHub README',
        CODE_WINDOW: 'README.md (Source)',
        MAIN: 'GitHub Profile Generator',
    },

    SUBTITLES: {
        MAIN: 'Enter your GitHub username to generate your unique profile.',
    },

    LABELS: {
        USERNAME: 'GitHub Username',
    },

    PLACEHOLDERS: {
        USERNAME: 'Enter your GitHub username',
    },

    ERRORS: {
        EMPTY_USERNAME: 'Please enter a username',
        USER_NOT_FOUND: 'User not found or API error. Please check the username.',
        NETWORK_ERROR: 'Network error. Please try again.',
    },

    BASIC_INFO: {
        TITLE: 'Basic Info',
        PLACEHOLDER_USERNAME: 'GitHub Username *',
        PLACEHOLDER_WAKATIME: 'WakaTime API Key (optional)',
        PLACEHOLDER_SPOTIFY: 'Spotify User ID (optional)',
    }
} as const
