import { WeeklySettingsBase } from '@/features/section-stats/ui/WeeklyStats/WeeklySettingsBase/WeeklySettingsBase'
import { PROJECT_SORT_OPTIONS } from '@/features/section-stats/config/visualization-options'
import { useWeeklyProjects } from '@/features/section-stats/model/useWeeklyProjects'

export function WeeklyProjectsSettings() {
    // Rule 1: Headless UI (Logic Separated)
    const { weeklyProjects, setWeeklyProjects } = useWeeklyProjects()

    // Rule 3: Defensive Coding
    if (!weeklyProjects) return null

    return (
        <WeeklySettingsBase
            config={weeklyProjects}
            setConfig={setWeeklyProjects}
            sortOptions={PROJECT_SORT_OPTIONS}
        />
    )
}
