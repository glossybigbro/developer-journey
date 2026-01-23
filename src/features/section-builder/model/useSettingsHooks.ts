import { useProfileStore } from '@/entities/profile/model/useProfileStore'

// 1. useActivityGraphSettings
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

// 2. useHeaderSettings (moved helper logic here + store access)
import { hexToRgba } from '@/shared/lib/utils/styleUtils'
import { ACCENT_OPACITY } from '../config/bioConstants'
import { Section } from '@/entities/profile/model/sections'

export function useHeaderSettings(sectionId: string, currentConfig?: Section['headerConfig']) {
    const { updateSection, updateSectionContent, accentColor } = useProfileStore()

    const config = currentConfig || {
        level: 3,
        showDivider: false,
        align: 'left'
    } as NonNullable<Section['headerConfig']>

    const handleUpdate = (updates: Partial<NonNullable<Section['headerConfig']>>) => {
        updateSection(sectionId, {
            headerConfig: { ...config, ...updates }
        })
    }

    const getSelectedStyle = (color: string) => ({
        background: hexToRgba(color, ACCENT_OPACITY.BACKGROUND),
        borderColor: hexToRgba(color, ACCENT_OPACITY.BORDER),
        color: color,
        boxShadow: `0 0 15px ${hexToRgba(color, ACCENT_OPACITY.SHADOW)}`,
        textShadow: `0 0 8px ${hexToRgba(color, ACCENT_OPACITY.TEXT_SHADOW)}`,
    })

    return {
        config,
        accentColor,
        updateSectionContent,
        handleUpdate,
        getSelectedStyle
    }
}

// 3. useProductiveTimeSettings
import { useState } from 'react'
import { getUserProductiveTime } from '@/entities/profile/api/profile-api'

export function useProductiveTimeSettings() {
    const {
        accentColor,
        productiveTime,
        setProductiveTimeStyle,
        setProductiveTimeStats,
        username
    } = useProfileStore()

    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // Style helper can stay in UI or move here. Moving here for consistency.
    const getSelectedStyle = (color: string) => ({
        background: hexToRgba(color, 0.1),
        borderColor: hexToRgba(color, 0.5),
        color: color,
        boxShadow: `0 0 15px ${hexToRgba(color, 0.2)}`,
        textShadow: `0 0 8px ${hexToRgba(color, 0.5)}`,
    })

    const handleAnalyze = async () => {
        if (!username) return

        setIsAnalyzing(true)
        setProductiveTimeStats({
            morning: 0, daytime: 0, evening: 0, night: 0,
            commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
        })

        try {
            const stats = await getUserProductiveTime(username)
            await new Promise(resolve => setTimeout(resolve, 800))
            setProductiveTimeStats(stats)
        } catch (error) {
            console.error('Analysis failed:', error)
            setProductiveTimeStats({
                morning: 0, daytime: 0, evening: 0, night: 0,
                commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    return {
        accentColor,
        productiveTime,
        setProductiveTimeStyle,
        isAnalyzing,
        handleAnalyze,
        getSelectedStyle,
        username
    }
}
