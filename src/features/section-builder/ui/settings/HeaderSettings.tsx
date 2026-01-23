import { Section } from '../../../../entities/profile/model/sections'
import styles from '../SectionBuilder.module.css'
import { useHeaderSettings } from '../../model/useSettingsHooks'

interface HeaderSettingsProps {
    sectionId: string
    currentConfig?: Section['headerConfig']
    currentContent: string
    showTitleInput?: boolean
}

export function HeaderSettings({ sectionId, currentConfig, currentContent, showTitleInput = true }: HeaderSettingsProps) {
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
                                e.target.style.height = 'auto'
                                e.target.style.height = e.target.scrollHeight + 'px'
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
                            {[1, 2, 3, 4].map((level) => {
                                const isSelected = config.level === level
                                return (
                                    <div
                                        key={level}
                                        className={`${styles.sizeOption}`}
                                        onClick={() => handleUpdate({ level: level as 1 | 2 | 3 | 4 })}
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
                            {['left', 'center', 'right'].map((align) => {
                                const isSelected = config.align === align
                                return (
                                    <div
                                        key={align}
                                        className={`${styles.sizeOption}`}
                                        onClick={() => handleUpdate({ align: align as 'left' | 'center' | 'right' })}
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
}
