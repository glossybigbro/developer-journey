'use client'

interface SectionIconProps {
    id: string
}

export function SectionIcon({ id }: SectionIconProps) {
    switch (id) {
        // Activity & Graphs
        case 'activity-graph': return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" /><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
        );
        case 'productive-time': return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
        );
        case 'weekly-trend': return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" />
            </svg>
        );

        // Profile & Bio
        case 'yaml-bio': return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
        );
        case 'social-icons': return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        );

        // Tech & Stats
        case 'tech-stack-hud': return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
            </svg>
        );
        case 'profile-card': return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        );

        // Default Fallback
        default: return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="url(#icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        );
    }
}
