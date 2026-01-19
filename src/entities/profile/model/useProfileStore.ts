import { create } from 'zustand'
import { UI_DEFAULTS } from '../config/markdown-constants'
import { SECTIONS, Section, BIO_DEFAULTS } from './sections'
import { ProductiveTimeStyleId } from '@/entities/profile/config/productive-time'

interface ProfileState {
    // 단계 관리
    currentStep: 'hero' | 'generator'

    // 기본 정보
    username: string
    wakatimeKey: string
    spotifyId: string

    // 템플릿
    selectedTemplate: 'guilyx' | 'minimal' | 'space-ghibli'

    // 섹션
    sections: Section[]

    // 테마
    theme: 'dark' | 'light'
    accentColor: string

    // Bio Data
    bio: {
        heading: string
        description: string
        bullets: { id: string; text: string }[]
        showHeading: boolean
        showDescription: boolean
        showBullets: boolean
        headingSize: 'h1' | 'h2' | 'h3'
        descriptionSize?: 'l' | 'm' | 's'
    }
    setBio: (bio: Partial<{
        heading: string;
        description: string;
        bullets: { id: string; text: string }[];
        showHeading: boolean;
        showDescription: boolean;
        showBullets: boolean;
        headingSize: 'h1' | 'h2' | 'h3';
    }>) => void

    // Activity Graph Settings
    activityGraphTheme: string
    activityGraphAreaFill: boolean
    activityGraphHideBorder: boolean
    activityGraphHideTitle: boolean
    activityGraphGrid: boolean
    activityGraphDays: number
    activityGraphRadius: number
    activityGraphCustomTitle: string

    setActivityGraphTheme: (theme: string) => void
    setActivityGraphAreaFill: (enabled: boolean) => void
    setActivityGraphHideBorder: (enabled: boolean) => void
    setActivityGraphHideTitle: (enabled: boolean) => void
    setActivityGraphGrid: (enabled: boolean) => void
    setActivityGraphDays: (days: number) => void
    setActivityGraphRadius: (radius: number) => void
    setActivityGraphCustomTitle: (title: string) => void

    productiveTime: {
        style: ProductiveTimeStyleId
        isAnalyzed: boolean
        stats: {
            morning: number // 06-12
            daytime: number // 12-18
            evening: number // 18-24
            night: number   // 00-06
            commits: {
                morning: number
                daytime: number
                evening: number
                night: number
            }
        }
    }
    setProductiveTimeStyle: (style: ProductiveTimeStyleId) => void
    setProductiveTimeStats: (stats: {
        morning: number
        daytime: number
        evening: number
        night: number
        commits: {
            morning: number
            daytime: number
            evening: number
            night: number
        }
    }) => void

    // State
    lastValidUsername: string | null
    setLastValidUsername: (username: string | null) => void

    // Actions
    setStep: (step: 'hero' | 'generator') => void
    setUsername: (username: string) => void
    setWakatimeKey: (key: string) => void
    setSpotifyId: (id: string) => void
    setTemplate: (template: 'guilyx' | 'minimal' | 'space-ghibli') => void
    toggleSection: (sectionId: string) => void
    reorderSections: (sections: Section[]) => void
    setAccentColor: (color: string) => void
    verifyUser: (username: string) => Promise<void>
}

export const useProfileStore = create<ProfileState>((set) => ({
    // 초기 상태
    currentStep: 'hero',
    username: '',
    wakatimeKey: '',
    spotifyId: '',
    selectedTemplate: 'space-ghibli',
    sections: SECTIONS.map(s => ({
        ...s,
        enabled: s.defaultEnabled ?? false
    })),
    theme: UI_DEFAULTS.THEME,
    accentColor: UI_DEFAULTS.ACCENT_COLOR,
    activityGraphTheme: UI_DEFAULTS.ACTIVITY_GRAPH_THEME,
    activityGraphAreaFill: true,
    activityGraphHideBorder: false,
    activityGraphHideTitle: true,
    activityGraphGrid: false,
    activityGraphDays: UI_DEFAULTS.ACTIVITY_GRAPH_DAYS,
    activityGraphRadius: UI_DEFAULTS.ACTIVITY_GRAPH_RADIUS,
    activityGraphCustomTitle: '',

    // Bio Initial State
    bio: {
        ...BIO_DEFAULTS,
        showHeading: true,
        showDescription: true,
        showBullets: true,
        headingSize: 'h1',
    },

    setBio: (newBio) => set((state) => ({ bio: { ...state.bio, ...newBio } })),

    lastValidUsername: null,

    // Actions
    setLastValidUsername: (username) => set({ lastValidUsername: username }),
    setStep: (step) => set({ currentStep: step }),
    setUsername: (username) => set({ username }),
    setWakatimeKey: (key) => set({ wakatimeKey: key }),
    setSpotifyId: (id) => set({ spotifyId: id }),
    setTemplate: (template) => set({ selectedTemplate: template }),

    toggleSection: (sectionId) => set((state) => ({
        sections: state.sections.map((section) =>
            section.id === sectionId
                ? { ...section, enabled: !section.enabled }
                : section
        ),
    })),

    reorderSections: (sections) => set({ sections }),
    setAccentColor: (color) => set({ accentColor: color }),

    // Activity Graph actions
    setActivityGraphTheme: (theme) => set({ activityGraphTheme: theme }),
    setActivityGraphAreaFill: (enabled) => set({ activityGraphAreaFill: enabled }),
    setActivityGraphHideBorder: (enabled) => set({ activityGraphHideBorder: enabled }),
    setActivityGraphHideTitle: (enabled) => set({ activityGraphHideTitle: enabled }),
    setActivityGraphGrid: (enabled) => set({ activityGraphGrid: enabled }),
    setActivityGraphDays: (days) => set({ activityGraphDays: days }),
    setActivityGraphRadius: (radius) => set({ activityGraphRadius: radius }),
    setActivityGraphCustomTitle: (title) => set({ activityGraphCustomTitle: title }),

    // Productive Time Initial State & Actions
    productiveTime: {
        style: 'cyber',
        isAnalyzed: false,
        stats: {
            morning: 0, daytime: 0, evening: 0, night: 0,
            commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
        }
    },
    setProductiveTimeStyle: (style) => set((state) => ({
        productiveTime: { ...state.productiveTime, style }
    })),
    setProductiveTimeStats: (stats) => set((state) => ({
        productiveTime: { ...state.productiveTime, stats, isAnalyzed: true }
    })),

    verifyUser: async (username: string) => {
        const { getUserProfile } = await import('../api/profile-api')
        await getUserProfile(username)
        // If successful, update state
        set({ username, currentStep: 'generator' })
    }
}))
