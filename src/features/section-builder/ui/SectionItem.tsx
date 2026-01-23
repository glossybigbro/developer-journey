'use client'

import { Section } from '../../../entities/profile/model/sections'
import styles from './SectionBuilder.module.css'
import { ActivityGraphSettings } from './settings/ActivityGraphSettings'
import { SimpleBioSettings } from './settings/SimpleBioSettings'
import { ProductiveTimeSettings } from './settings/ProductiveTimeSettings'
import { WeeklyLanguagesSettings } from './settings/WeeklyLanguagesSettings'
import { WeeklyProjectsSettings } from './settings/WeeklyProjectsSettings'
import { SectionIcon } from './blocks/SectionIcon'
import { useSectionItem } from '../model/useSectionItem'

import { SECTION_UI_LABELS } from '../config/sectionConstants'

interface SectionItemProps {
    section: Section
    onToggle: (id: string) => void
}

export function SectionItem({ section, onToggle }: SectionItemProps) {
    const isLocked = section.locked;
    const itemOpacity = isLocked ? 0.5 : 1;
    const isCustomizable = !isLocked && ['activity-graph', 'productive-time', 'weekly-languages', 'weekly-projects', 'yaml-bio'].includes(section.id);

    const {
        isSettingsOpen,
        popoverRef,
        handleClick,
        handleAddClick
    } = useSectionItem({
        isLocked: !!isLocked,
        isCustomizable,
        onToggle: () => onToggle(section.id)
    })

    return (
        <div style={{ position: 'relative', width: '100%', marginBottom: '8px' }}>
            {/* Global Gradient Definition for Icons */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                </defs>
            </svg>

            <button
                style={{ opacity: itemOpacity, marginBottom: 0 }}
                className={`${styles.item} ${isSettingsOpen ? styles.settingsOpen : ''}`}
                onClick={handleClick}
            >
                {/* 1. Icon Wrapper (Left) */}
                <div className={styles.itemIconWrapper}>
                    <SectionIcon id={section.id} />
                </div>

                {/* 2. Text Info (Center) */}
                <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{section.name}</span>
                    {isLocked && <span className={`${styles.badge} ${styles.comingSoonBadge}`}>{SECTION_UI_LABELS.STATUS.COMING_SOON}</span>}
                </div>

                {/* 3. Action Indicator (Right) */}
                {!isLocked && (
                    <>
                        {/* When settings open: Show Add Button */}
                        {isSettingsOpen ? (
                            <div
                                role="button"
                                tabIndex={0}
                                className={styles.addButton}
                                onClick={handleAddClick}
                                onKeyDown={handleAddClick}
                            >
                                <span className={styles.addButtonIcon}>✨</span>
                                ADD
                            </div>
                        ) : (
                            /* When settings closed: Show Sparkles on hover */
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
                        <span className={`${styles.badge} ${styles.lockedBadge}`}>{SECTION_UI_LABELS.STATUS.LOCKED}</span>
                    </div>
                )}
            </button>

            {/* Settings Popover (Sibling to Button) */}
            {isSettingsOpen && !isLocked && (
                <div className={styles.settingsPopOver} ref={popoverRef}>
                    {section.id === 'activity-graph' && <ActivityGraphSettings />}
                    {section.id === 'productive-time' && <ProductiveTimeSettings />}
                    {section.id === 'weekly-languages' && <WeeklyLanguagesSettings />}
                    {section.id === 'weekly-projects' && <WeeklyProjectsSettings />}
                    {section.id === 'yaml-bio' && <SimpleBioSettings />}
                </div>
            )}
        </div>
    )
}
