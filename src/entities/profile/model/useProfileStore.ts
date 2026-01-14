import { create } from 'zustand'
import { SECTIONS, Section } from './sections'

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
    theme: 'dark',
    accentColor: '#00d9ff',
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

    verifyUser: async (username: string) => {
        const { getUserProfile } = await import('../../../shared/api/githubService')
        await getUserProfile(username)
        // If successful, update state
        set({ username, currentStep: 'generator' })
    }
}))
