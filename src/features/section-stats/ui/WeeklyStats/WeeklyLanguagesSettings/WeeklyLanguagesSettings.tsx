'use client'

import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import styles from '@/shared/styles/SectionSettings.module.css'
import { WeeklySettingsBase } from '@/features/section-stats/ui/WeeklyStats/WeeklySettingsBase/WeeklySettingsBase'

// ... imports
import { COMMON_LANGUAGES, LANGUAGE_SORT_OPTIONS } from '@/features/section-stats/config/visualization-options'
import { useWeeklyLanguages } from '@/features/section-stats/model/useWeeklyLanguages'

export function WeeklyLanguagesSettings() {
    const { weeklyLanguages, toggleLanguage, setConfig } = useWeeklyLanguages()

    if (!weeklyLanguages) return null

    const { excludeLanguages } = weeklyLanguages

    const handleToggleLanguage = (lang: string) => {
        toggleLanguage(lang)
    }

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
                                onChange={() => handleToggleLanguage(lang)}
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
