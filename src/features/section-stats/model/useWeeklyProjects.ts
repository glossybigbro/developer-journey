import { useProfileStore } from '@/entities/profile/model/useProfileStore'

export function useWeeklyProjects() {
    const weeklyProjects = useProfileStore(state => state.weeklyProjects)
    const setWeeklyProjects = useProfileStore(state => state.setWeeklyProjects)

    const handleConfigChange = (newConfig: Partial<typeof weeklyProjects>) => {
        setWeeklyProjects(newConfig)
    }

    return {
        weeklyProjects,
        setWeeklyProjects: handleConfigChange
    }
}
