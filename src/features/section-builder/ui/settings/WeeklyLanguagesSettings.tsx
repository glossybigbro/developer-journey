'use client'

import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import styles from '../SectionBuilder.module.css'
import { WeeklySettingsBase } from './WeeklySettingsBase'

// ... imports
import { COMMON_LANGUAGES, LANGUAGE_SORT_OPTIONS } from '../../config/visualization-options'
import { useWeeklyLanguages } from '../../model/useWeeklyLanguages'

export function WeeklyLanguagesSettings() {
    const { weeklyLanguages, toggleLanguage, setConfig } = useWeeklyLanguages()

    if (!weeklyLanguages) return null

    const { excludeLanguages } = weeklyLanguages

    return (
        <WeeklySettingsBase
            config={weeklyLanguages}
            setConfig={setConfig}
            sortOptions={LANGUAGE_SORT_OPTIONS}
        >
            {/* Exclude Languages - Specific to Weekly Languages */}
            <div className={styles.settingsSection}>
                <span className={styles.sectionTitle}>Exclude Languages</span>
                <div className={styles.checkboxGrid}>
                    {COMMON_LANGUAGES.map(lang => (
                        <label key={lang} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={excludeLanguages?.includes(lang) || false}
                                onChange={() => toggleLanguage(lang)}
                                className={styles.checkbox}
                            />
                            <span>{lang}</span>
                        </label>
                    ))}
                </div>
            </div>
        </WeeklySettingsBase>
    )
}
