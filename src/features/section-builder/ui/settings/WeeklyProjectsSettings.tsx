'use client'

import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import styles from '../SectionBuilder.module.css'
import { WeeklySettingsBase } from './WeeklySettingsBase'

import { PROJECT_SORT_OPTIONS } from '../../config/visualization-options'

export function WeeklyProjectsSettings() {
    const weeklyProjects = useProfileStore(state => state.weeklyProjects)
    const setWeeklyProjects = useProfileStore(state => state.setWeeklyProjects)

    if (!weeklyProjects) return null

    // Wrap setter to match interface
    const handleConfigChange = (newConfig: Partial<typeof weeklyProjects>) => {
        setWeeklyProjects(newConfig)
    }

    return (
        <WeeklySettingsBase
            config={weeklyProjects}
            setConfig={handleConfigChange}
            sortOptions={PROJECT_SORT_OPTIONS}
        />
    )
}
