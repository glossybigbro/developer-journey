'use client'

import styles from '../SectionBuilder.module.css'

import { STYLE_OPTIONS, PERIOD_OPTIONS, StyleOption, PeriodOption } from '../../config/visualization-options'

interface SortOption<T extends string> {
    id: T
    name: string
}

export interface WeeklyConfig<SortType extends string> {
    style: 'progress' | 'emoji' | 'compact'
    count: number
    sortBy: SortType
    periodDays: number
}

interface WeeklySettingsBaseProps<SortType extends string> {
    config: WeeklyConfig<SortType>
    setConfig: (config: Partial<WeeklyConfig<SortType>>) => void
    sortOptions: SortOption<SortType>[]
    children?: React.ReactNode
}

export function WeeklySettingsBase<SortType extends string>({ config, setConfig, sortOptions, children }: WeeklySettingsBaseProps<SortType>) {
    const { style, count, sortBy, periodDays } = config

    return (
        <div className={styles.popOverContent}>
            {/* Style Selection */}
            <div className={styles.settingsSection}>
                <span className={styles.sectionTitle}>Visualization Style</span>
                <div className={styles.styleGrid}>
                    {STYLE_OPTIONS.map(option => (
                        <div
                            key={option.id}
                            className={`${styles.styleCard} ${style === option.id ? styles.selected : ''}`}
                            onClick={() => setConfig({ style: option.id })}
                        >
                            <div className={styles.stylePreview}>{option.preview}</div>
                            <div className={styles.styleName}>{option.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Count Slider */}
            <div className={styles.settingsSection}>
                <div className={styles.settingRow}>
                    <label className={styles.settingLabel}>Display Count: {count}</label>
                    <input
                        type="range"
                        min="3"
                        max="10"
                        value={count}
                        onChange={(e) => setConfig({ count: parseInt(e.target.value) })}
                        className={styles.rangeInput}
                    />
                </div>
            </div>

            {/* Sort By */}
            <div className={styles.settingsSection}>
                <span className={styles.sectionTitle}>Sort By</span>
                <div className={styles.buttonGroup}>
                    {sortOptions.map(option => (
                        <button
                            key={option.id}
                            className={`${styles.settingsButton} ${sortBy === option.id ? styles.active : ''}`}
                            onClick={() => setConfig({ sortBy: option.id })}
                        >
                            {option.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Period Selection */}
            <div className={styles.settingsSection}>
                <span className={styles.sectionTitle}>Time Period</span>
                <div className={styles.buttonGroup}>
                    {PERIOD_OPTIONS.map(option => (
                        <button
                            key={option.days}
                            className={`${styles.settingsButton} ${periodDays === option.days ? styles.active : ''}`}
                            onClick={() => setConfig({ periodDays: option.days })}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Extra Content (e.g. Exclude Languages) */}
            {children}
        </div>
    )
}
