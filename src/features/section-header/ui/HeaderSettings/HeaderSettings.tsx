import { Section } from '@/entities/profile/model/sections'
import { autoResizeTextarea } from '@/shared/lib/utils/styleUtils'
import styles from '@/shared/styles/SectionSettings.module.css'
import { useHeaderSettings } from '@/features/section-header/model/useHeaderSettings'
import { memo } from 'react'

interface HeaderSettingsProps {
    sectionId: string
    currentConfig?: Section['headerConfig']
    currentContent: string
    showTitleInput?: boolean
}

const HEADING_LEVEL_OPTIONS = [1, 2, 3, 4] as const
const ALIGNMENT_OPTIONS = ['left', 'center', 'right'] as const

export const HeaderSettings = memo(function HeaderSettings({
    sectionId,
    currentConfig,
    currentContent,
    showTitleInput = true
}: HeaderSettingsProps) {
    const {
        config,
        accentColor,
        updateSectionContent,
        handleUpdate,
        getSelectedStyle
    } = useHeaderSettings(sectionId, currentConfig)

    return (
        <div className={styles.popOverContent}>
            {/* Title Input Section - Optional */}
            {showTitleInput && (
                <div className={styles.settingsSection}>
                    <div className={styles.settingsGroup}>
                        <div className={styles.labelRow} style={{ marginBottom: '8px' }}>
                            <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Title Text</span>
                        </div>
                        <textarea
                            value={currentContent}
                            onChange={(e) => {
                                updateSectionContent(sectionId, e.target.value)
                                autoResizeTextarea(e.target)
                            }}
                            className={`${styles.settingsInput} ${styles.textareaInput}`}
                            placeholder="Enter header title..."
                            rows={1}
                            style={{
                                width: '100%',
                                minHeight: '38px',
                                resize: 'none',
                                overflow: 'hidden'
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Display Settings Section */}
            <div className={styles.settingsSection}>
                <div className={styles.settingsGroup}>
                    {/* Heading Level Selector */}
                    <div className={styles.labelRow}>
                        <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Heading Level</span>
                        <div className={styles.sizeSelector}>
                            {HEADING_LEVEL_OPTIONS.map((level) => {
                                const isSelected = config.level === level
                                return (
                                    <div
                                        key={level}
                                        className={`${styles.sizeOption}`}
                                        onClick={() => handleUpdate({ level })}
                                        style={isSelected ? getSelectedStyle(accentColor) : {}}
                                    >
                                        H{level}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Alignment Selector */}
                    <div className={styles.labelRow}>
                        <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Alignment</span>
                        <div className={styles.sizeSelector}>
                            {ALIGNMENT_OPTIONS.map((align) => {
                                const isSelected = config.align === align
                                return (
                                    <div
                                        key={align}
                                        className={`${styles.sizeOption}`}
                                        onClick={() => handleUpdate({ align })}
                                        style={{
                                            textTransform: 'capitalize',
                                            ...(isSelected ? getSelectedStyle(accentColor) : {})
                                        }}
                                    >
                                        {align}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Divider Toggle - Consolidated into the same group for equal spacing */}
                    <div className={styles.labelRow} style={{ marginBottom: 0 }}>
                        <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>Show Divider Line</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={config.showDivider}
                                onChange={(e) => handleUpdate({ showDivider: e.target.checked })}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
})
