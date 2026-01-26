import { useProfileStore } from '@/entities/profile/model/useProfileStore'

export function useActivityGraphSettings() {
    const {
        activityGraphTheme,
        setActivityGraphTheme,
        activityGraphAreaFill,
        setActivityGraphAreaFill,
        activityGraphHideBorder,
        setActivityGraphHideBorder,
        activityGraphHideTitle,
        setActivityGraphHideTitle,
        activityGraphGrid,
        setActivityGraphGrid,
        activityGraphDays,
        setActivityGraphDays,
        activityGraphRadius,
        setActivityGraphRadius,
        activityGraphCustomTitle,
        setActivityGraphCustomTitle
    } = useProfileStore()

    return {
        activityGraphTheme,
        setActivityGraphTheme,
        activityGraphAreaFill,
        setActivityGraphAreaFill,
        activityGraphHideBorder,
        setActivityGraphHideBorder,
        activityGraphHideTitle,
        setActivityGraphHideTitle,
        activityGraphGrid,
        setActivityGraphGrid,
        activityGraphDays,
        setActivityGraphDays,
        activityGraphRadius,
        setActivityGraphRadius,
        activityGraphCustomTitle,
        setActivityGraphCustomTitle
    }
}
