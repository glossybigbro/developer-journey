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
}

export const SECTIONS: Section[] = [
    // ACT 1: Welcome & Stats
    { id: 'hero', name: 'Hero Banner', description: 'Welcome message & visual banner', icon: '🎉', category: 'ACT1', width: 'full', defaultEnabled: true },
    { id: 'total-contributions', name: 'Total Contributions', icon: '📈', category: 'ACT1', width: 'compact', defaultEnabled: true },
    { id: 'total-commits', name: 'Total Commits', icon: '💻', category: 'ACT1', width: 'compact', defaultEnabled: true },
    { id: 'total-prs', name: 'Total PRs', icon: '🔀', category: 'ACT1', width: 'compact', defaultEnabled: true },
    { id: 'total-issues', name: 'Total Issues', icon: '⚠️', category: 'ACT1', width: 'compact', defaultEnabled: true },
    { id: 'total-stars', name: 'Total Stars Earned', icon: '⭐', category: 'ACT1', width: 'compact', defaultEnabled: true },
    { id: 'account-age', name: 'Account Age', icon: '🎂', category: 'ACT1', width: 'compact', defaultEnabled: true },

    // ACT 2: Languages
    { id: 'top-languages', name: 'Top Languages', icon: '📊', category: 'ACT2', width: 'half', defaultEnabled: true },
    { id: 'language-diversity', name: 'Language Diversity', icon: '🌈', category: 'ACT2', width: 'half', defaultEnabled: true },
    { id: 'most-used-language', name: 'Most Used Language', icon: '🏆', category: 'ACT2', width: 'half', defaultEnabled: false },
    { id: 'new-languages', name: 'Recently Used Languages', icon: '🆕', category: 'ACT2', width: 'half', defaultEnabled: false },

    // ACT 3: Activity
    { id: 'contribution-graph', name: 'Contribution Graph', icon: '🔥', category: 'ACT3', width: 'full', defaultEnabled: true },
    { id: 'streak-stats', name: 'Current Streak', icon: '⚡', category: 'ACT3', width: 'half', defaultEnabled: true },
    { id: 'longest-streak', name: 'Longest Streak', icon: '🏔️', category: 'ACT3', width: 'half', defaultEnabled: true },
    { id: 'weekend-warrior', name: 'Weekend vs Weekday', icon: '📅', category: 'ACT3', width: 'half', defaultEnabled: false },
    { id: 'productive-time', name: 'Productive Time', icon: '⏰', category: 'ACT3', width: 'half', defaultEnabled: false },

    // ACT 4: Repository Stats
    { id: 'top-repo', name: 'Top Repository', icon: '🌟', category: 'ACT4', width: 'full', defaultEnabled: true },
    { id: 'star-history', name: 'Star History', icon: '📈', category: 'ACT4', width: 'full', defaultEnabled: false },
    { id: 'forks-received', name: 'Forks Received', icon: '🍴', category: 'ACT4', width: 'half', defaultEnabled: false },
    { id: 'stars-given', name: 'Stars Given', icon: '✨', category: 'ACT4', width: 'half', defaultEnabled: false },

    // ACT 5: Collaboration
    { id: 'pull-requests', name: 'Pull Requests History', icon: 'git-pull-request', category: 'ACT5', width: 'full', defaultEnabled: false },
    { id: 'issues-created', name: 'Issues Created', icon: 'issue-opened', category: 'ACT5', width: 'half', defaultEnabled: false },
    { id: 'code-reviews', name: 'Code Reviews', icon: '👀', category: 'ACT5', width: 'half', defaultEnabled: false },
    { id: 'organizations', name: 'Organizations', icon: '🏢', category: 'ACT5', width: 'full', defaultEnabled: false },

    // ACT 6: Growth & Milestones
    { id: 'followers-growth', name: 'Followers Growth', icon: '👥', category: 'ACT6', width: 'full', defaultEnabled: false },
    { id: 'achievements', name: 'GitHub Achievements', icon: '🎖️', category: 'ACT6', width: 'full', defaultEnabled: false },
    { id: 'first-commit', name: 'First Commit Date', icon: '👶', category: 'ACT6', width: 'half', defaultEnabled: false },
    { id: 'most-active-day', name: 'Most Active Day', icon: '📅', category: 'ACT6', width: 'half', defaultEnabled: false },

    // ACT 7: Fun & External
    { id: 'wakatime-stats', name: 'WakaTime Stats', icon: '⏱️', category: 'ACT7', width: 'full', requires: 'wakatime', defaultEnabled: true },
    { id: 'spotify-playing', name: 'Now Playing', icon: '🎵', category: 'ACT7', width: 'full', requires: 'spotify', defaultEnabled: true },
    { id: 'night-owl', name: 'Night Owl Score', icon: '🦉', category: 'ACT7', width: 'half', defaultEnabled: false },
    { id: 'commit-habit', name: 'Commit Habit', icon: 'habit', category: 'ACT7', width: 'half', defaultEnabled: false },
    { id: 'visitors-count', name: 'Visitors Count', icon: '👀', category: 'ACT7', width: 'compact', defaultEnabled: true },
    { id: 'footer', name: 'Footer', icon: '🔚', category: 'ACT7', width: 'full', defaultEnabled: true },
]

export const ACT_LABELS = {
    ACT1: 'Welcome & Highlights',
    ACT2: 'Languages & Skills',
    ACT3: 'Contribution Activity',
    ACT4: 'Repository Stats',
    ACT5: 'Collaboration & Community',
    ACT6: 'Growth & Milestones',
    ACT7: 'Fun & External Integrations',
}
