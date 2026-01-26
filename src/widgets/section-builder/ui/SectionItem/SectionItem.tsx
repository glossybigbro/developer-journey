'use client'

import { Section } from '@/entities/profile/model/sections'
import styles from '@/shared/styles/SectionSettings.module.css'
import { ActivityGraphSettings, ProductiveTimeSettings, WeeklyLanguagesSettings, WeeklyProjectsSettings } from '@/features/section-stats'
import { BioSettings as SimpleBioSettings } from '@/features/section-bio'
import { SectionIcon } from '../SectionIcon'
import { useSectionItem } from '../../model/useSectionItem'
import { SECTION_UI_LABELS } from '../../config/sectionConstants'

interface SectionItemProps {
    section: Section
    onToggle: (id: string) => void
}

export function SectionItem({ section, onToggle }: SectionItemProps) {
    // 4. DRY & Constants (Safe Access)
    const { id, name, locked } = section
    const isLocked = !!locked

    // 5. Headless UI (Logic in Hook)
    const {
        isSettingsOpen,
        popoverRef,
        isCustomizable,
        shouldShowAddButton,
        handleToggleSettings,
        handleOpenSettings,
        sectionOpacity
    } = useSectionItem({
        id,
        isLocked,
        onToggle: () => onToggle(id)
    })

    return (
        <div style={{ position: 'relative', width: '100%', marginBottom: '8px' }}>
            <button
                style={{ opacity: sectionOpacity, marginBottom: 0 }}
                className={`${styles.item} ${isSettingsOpen ? styles.settingsOpen : ''}`}
                onClick={handleToggleSettings}
                disabled={false}
            >
                {/* 1. Icon Wrapper (Left) */}
                <div className={styles.itemIconWrapper}>
                    <SectionIcon id={id} />
                </div>

                {/* 2. Text Info (Center) */}
                <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{name}</span>
                    {isLocked && (
                        <span className={`${styles.badge} ${styles.comingSoonBadge}`}>
                            {SECTION_UI_LABELS.STATUS.COMING_SOON}
                        </span>
                    )}
                </div>

                {/* 3. Action Indicator (Right) */}
                {!isLocked && (
                    <>
                        {/* Case A: Settings Open -> Show Add/Close Action */}
                        {shouldShowAddButton ? (
                            <div
                                role="button"
                                tabIndex={0}
                                className={styles.addButton}
                                onClick={handleOpenSettings}
                                onKeyDown={handleOpenSettings}
                            >
                                <span className={styles.addButtonIcon}>✨</span>
                                {SECTION_UI_LABELS.ACTIONS.ADD}
                            </div>
                        ) : (
                            /* Case B: Settings Closed -> Show Hover Effect */
                            <div className={styles.itemAction}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.itemActionIcon}>
                                    <path d="M12 3l1.912 5.813a2 2 0 001.272 1.272L21 12l-5.813 1.912a2 2 0 00-1.272 1.272L12 21l-1.912-5.813a2 2 0 00-1.272-1.272L3 12l5.813-1.912a2 2 0 001.272-1.272L12 3z"></path>
                                    <path d="M5 5l.5 .5" opacity="0.5" />
                                    <path d="M19 19l.5 .5" opacity="0.5" />
                                </svg>
                            </div>
                        )}
                    </>
                )}

                {/* Locked Badge */}
                {isLocked && (
                    <div style={{ position: 'absolute', right: '12px', top: '12px' }}>
                        <span className={`${styles.badge} ${styles.lockedBadge}`}>
                            {SECTION_UI_LABELS.STATUS.LOCKED}
                        </span>
                    </div>
                )}
            </button>

            {/* Settings Popover */}
            {isSettingsOpen && isCustomizable && (
                <div className={styles.settingsPopOver} ref={popoverRef}>
                    {id === 'activity-graph' && <ActivityGraphSettings />}
                    {id === 'productive-time' && <ProductiveTimeSettings />}
                    {id === 'weekly-languages' && <WeeklyLanguagesSettings />}
                    {id === 'weekly-projects' && <WeeklyProjectsSettings />}
                    {id === 'yaml-bio' && <SimpleBioSettings />}
                </div>
            )}
        </div>
    )
}
