export interface Section {
    id: string
    name: string
    description?: string
    icon: string
    category: 'ACT1' | 'ACT2' | 'ACT3' | 'ACT4' | 'ACT5' | 'ACT6' | 'ACT7'
    width: 'full' | 'half' | 'compact'
    requires?: 'wakatime' | 'spotify'
    defaultEnabled?: boolean
    enabled?: boolean // Runtime state
    locked?: boolean // Feature lock state
}

export const SECTIONS: Section[] = [
    // ACT 1: The Journey Begins (9개) - Logical order
    { id: 'workflow-badges', name: 'Workflow Status Badges', description: 'GitHub Actions status badges', icon: '🟢', category: 'ACT1', width: 'full', defaultEnabled: false, locked: true },
    { id: 'visitor-counter', name: 'Visitor Counter', description: 'Profile view counter', icon: '🟣', category: 'ACT1', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'socialify-banner', name: 'Socialify Banner', description: 'Auto-generated repo banner', icon: '🟢', category: 'ACT1', width: 'full', defaultEnabled: false, locked: true },
    { id: 'social-icons', name: 'Social Icons', description: 'LinkedIn, Twitter, etc.', icon: '🟢', category: 'ACT1', width: 'full', defaultEnabled: false, locked: true },
    { id: 'activity-graph', name: 'Activity Graph', description: 'Contribution activity graph', icon: '🔥', category: 'ACT1', width: 'full', defaultEnabled: true },
    { id: 'yaml-bio', name: 'YAML Bio Block', description: 'Code-style bio information', icon: '🔵', category: 'ACT1', width: 'full', defaultEnabled: false, locked: true },
    { id: 'profile-card', name: 'Profile Card', description: 'GitHub stats card', icon: '🔵', category: 'ACT1', width: 'half', defaultEnabled: false, locked: true },
    { id: 'rank-badge', name: 'Rank Badge', description: 'GitHub rank/level badge', icon: '🟣', category: 'ACT1', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'terminal-hero', name: 'Terminal Hero', description: 'ASCII art terminal greeting', icon: '🔵', category: 'ACT1', width: 'full', defaultEnabled: false, locked: true },

    // ACT 2: 활동 시각화 (4개)
    { id: '3d-calendar', name: '3D Isometric Calendar', description: '3D contribution calendar', icon: '🔵', category: 'ACT2', width: 'full', defaultEnabled: false, locked: true },
    { id: 'contribution-stats', name: 'Contribution Stats', description: 'Detailed contribution metrics', icon: '🔵', category: 'ACT2', width: 'half', defaultEnabled: false, locked: true },
    { id: 'level-xp-bar', name: 'Level XP Bar', description: 'Gamified progress bar', icon: '🟣', category: 'ACT2', width: 'half', defaultEnabled: false, locked: true },
    { id: 'activity-heatmap', name: 'Activity Heatmap', description: 'Contribution heatmap', icon: '🟣', category: 'ACT2', width: 'full', defaultEnabled: false, locked: true },

    // ACT 3: 천성과 습관 (6개)
    { id: 'night-owl', name: "I'm a Night 🦉", description: 'Time-of-day commit analysis', icon: '🔵', category: 'ACT3', width: 'half', defaultEnabled: false, locked: true },
    { id: 'timezone', name: 'Time Zone', description: 'Current timezone display', icon: '🔵', category: 'ACT3', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'time-bars', name: 'Time of Day Bars', description: 'Morning/Day/Evening/Night bars', icon: '🔵', category: 'ACT3', width: 'full', defaultEnabled: false, locked: true },
    { id: 'code-time-badge', name: 'Code Time Badge', description: 'Total coding time badge', icon: '🟢', category: 'ACT3', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'os-editor-stats', name: 'OS & Editor Stats', description: 'Development environment stats', icon: '🔵', category: 'ACT3', width: 'half', defaultEnabled: false, locked: true },
    { id: 'tech-stack-hud', name: 'Tech Stack HUD', description: 'Technology stack display', icon: '🔵', category: 'ACT3', width: 'full', defaultEnabled: false, locked: true },

    // ACT 4: 스킬과 현재 (4개)
    { id: 'this-week', name: '📊 This Week...', description: 'Weekly activity summary', icon: '🔵', category: 'ACT4', width: 'full', defaultEnabled: false, locked: true },
    { id: 'weekly-languages', name: 'Weekly Languages', description: 'Languages used this week', icon: '🔵', category: 'ACT4', width: 'half', defaultEnabled: false, locked: true },
    { id: 'weekly-projects', name: 'Weekly Projects', description: 'Projects worked on this week', icon: '🔵', category: 'ACT4', width: 'half', defaultEnabled: false, locked: true },
    { id: 'weekly-trend', name: 'Weekly Trend', description: 'Weekly activity trend', icon: '🔵', category: 'ACT4', width: 'full', defaultEnabled: false, locked: true },

    // ACT 5: 누적 역사 (4개)
    { id: 'date-range', name: 'Date Range', description: 'Account activity date range', icon: '🔵', category: 'ACT5', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'total-time', name: 'Total Time', description: 'Total coding time', icon: '🔵', category: 'ACT5', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'braille-languages', name: 'Braille Language Stats', description: 'Language stats in Braille chart', icon: '🔵', category: 'ACT5', width: 'full', defaultEnabled: false, locked: true },
    { id: 'daily-average', name: 'Daily Average', description: 'Average daily coding time', icon: '🔵', category: 'ACT5', width: 'compact', defaultEnabled: false, locked: true },

    // ACT 6: 깃허브 심층 & 업적 (9개)
    { id: 'lines-of-code', name: 'Lines of Code Badge', description: 'Total lines written', icon: '🟢', category: 'ACT6', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'storage-used', name: 'Storage Used', description: 'GitHub storage usage', icon: '🔵', category: 'ACT6', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'public-repos', name: 'Public Repos', description: 'Public repository count', icon: '🔵', category: 'ACT6', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'private-repos', name: 'Private Repos', description: 'Private repository count', icon: '🔵', category: 'ACT6', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'total-stars', name: 'Stars', description: 'Total stars earned', icon: '🔵', category: 'ACT6', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'total-commits', name: 'Commits', description: 'Total commits made', icon: '🔵', category: 'ACT6', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'hireable', name: 'Hireable', description: 'Hireable status badge', icon: '🔵', category: 'ACT6', width: 'compact', defaultEnabled: false, locked: true },
    { id: 'recent-activity', name: 'Recent Activity Feed', description: 'Latest GitHub activity', icon: '🟢', category: 'ACT6', width: 'full', defaultEnabled: false, locked: true },
    { id: 'badge-collection', name: 'Badge Collection', description: 'Achievement badges', icon: '🟣', category: 'ACT6', width: 'full', defaultEnabled: false, locked: true },

    // ACT 7: 취향과 마무리 (5개)
    { id: 'spotify-now-playing', name: 'Spotify Now Playing', description: 'Currently playing track', icon: '🟢', category: 'ACT7', width: 'full', requires: 'spotify', defaultEnabled: false, locked: true },
    { id: 'spotify-recent', name: 'Recently Played Tracks', description: 'Recent Spotify tracks', icon: '🟢', category: 'ACT7', width: 'full', requires: 'spotify', defaultEnabled: false, locked: true },
    { id: 'top-artists', name: 'Top Artists/Genres', description: 'Favorite music stats', icon: '🔵', category: 'ACT7', width: 'half', requires: 'spotify', defaultEnabled: false, locked: true },
    { id: 'quote-of-day', name: 'Quote of the Day', description: 'Daily inspirational quote', icon: '🔵', category: 'ACT7', width: 'full', defaultEnabled: false, locked: true },
    { id: 'footer-wave', name: 'Footer Wave', description: 'Animated footer wave', icon: '🟢', category: 'ACT7', width: 'full', defaultEnabled: false, locked: true },
]

export const ACT_LABELS = {
    ACT1: 'The Journey Begins',
    ACT2: 'Activity Visualization',
    ACT3: 'Nature & Habits',
    ACT4: 'Skills & Present',
    ACT5: 'Cumulative History',
    ACT6: 'GitHub Deep Dive & Achievements',
    ACT7: 'Interests & Finale',
}
