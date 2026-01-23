import { useProfileStore } from '@/entities/profile/model/useProfileStore'

export function useWeeklyLanguages() {
    const weeklyLanguages = useProfileStore(state => state.weeklyLanguages)
    const setWeeklyLanguages = useProfileStore(state => state.setWeeklyLanguages)

    const toggleLanguage = (lang: string) => {
        if (!weeklyLanguages) return

        const excluded = weeklyLanguages.excludeLanguages || []
        const newExcluded = excluded.includes(lang)
            ? excluded.filter((l: string) => l !== lang)
            : [...excluded, lang]
        setWeeklyLanguages({ excludeLanguages: newExcluded })
    }

    const setConfig = (newConfig: Partial<typeof weeklyLanguages>) => {
        setWeeklyLanguages(newConfig)
    }

    return {
        weeklyLanguages,
        toggleLanguage,
        setConfig
    }
}
