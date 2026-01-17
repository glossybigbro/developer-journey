'use client'

import { useState, useRef } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Section } from '../../../entities/profile/model/sections'
import styles from './SectionBuilder.module.css'
import { ActivityGraphSettings } from './ActivityGraphSettings'
import { SimpleBioSettings } from './SimpleBioSettings'

import { SECTION_UI_LABELS } from '../config/sectionConstants'
import { useOnClickOutside } from '@/shared/lib/hooks/useOnClickOutside'

interface SectionItemProps {
    section: Section
    onToggle: (id: string) => void
}

export function SectionItem({ section, onToggle }: SectionItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: section.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const isLocked = section.locked;
    const itemOpacity = isLocked ? 0.5 : 1;
    const pointerEvents = isLocked ? 'none' : 'auto';

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(popoverRef, () => setIsSettingsOpen(false))

    return (
        <div
            ref={setNodeRef}
            style={{ ...style, opacity: itemOpacity }}
            className={`${styles.item} ${section.enabled ? styles.enabled : ''}`}
        >
            <div className={styles.itemContent}>
                {!isLocked ? (
                    <label className={styles.switch}>
                        <input
                            type="checkbox"
                            checked={section.enabled}
                            onChange={() => onToggle(section.id)}
                        />
                        <span className={styles.slider}></span>
                    </label>
                ) : (
                    <span className={`${styles.badge} ${styles.lockedBadge}`}>{SECTION_UI_LABELS.STATUS.LOCKED}</span>
                )}

                <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{section.name}</span>
                    {isLocked && <span className={`${styles.badge} ${styles.comingSoonBadge}`}>{SECTION_UI_LABELS.STATUS.COMING_SOON}</span>}
                    {section.width && (
                        <span className={styles.badge}>{section.width}</span>
                    )}


                    {/* Settings Trigger */}
                    {!isLocked && section.id === 'activity-graph' && section.enabled && (
                        <div className={`${styles.extraActions} ${isSettingsOpen ? styles.visible : ''}`} ref={popoverRef}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsSettingsOpen(!isSettingsOpen)
                                }}
                                className={`${styles.settingsButton} ${isSettingsOpen ? styles.active : ''}`}
                                aria-label={SECTION_UI_LABELS.ACTIONS.CUSTOMIZE_GRAPH}
                            >
                                <span className={styles.buttonIcon}>{SECTION_UI_LABELS.ICONS.GRAPH}</span>
                                <span className={styles.buttonText}>{SECTION_UI_LABELS.ACTIONS.CUSTOMIZE_GRAPH}</span>
                            </button>

                            {/* Pop-over Panel */}
                            {isSettingsOpen && (
                                <div className={styles.settingsPopOver}>
                                    <ActivityGraphSettings />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Bio Settings Trigger */}
                    {!isLocked && section.id === 'yaml-bio' && section.enabled && (
                        <div className={`${styles.extraActions} ${isSettingsOpen ? styles.visible : ''}`} ref={popoverRef}>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsSettingsOpen(!isSettingsOpen)
                                }}
                                className={`${styles.settingsButton} ${isSettingsOpen ? styles.active : ''}`}
                                aria-label={SECTION_UI_LABELS.ACTIONS.EDIT_BIO}
                            >
                                <span className={styles.buttonIcon}>{SECTION_UI_LABELS.ICONS.EDIT}</span>
                                <span className={styles.buttonText}>{SECTION_UI_LABELS.ACTIONS.EDIT_BIO}</span>
                            </button>

                            {/* Pop-over Panel */}
                            {isSettingsOpen && (
                                <div className={styles.settingsPopOver}>
                                    <SimpleBioSettings />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {!isLocked && (
                <div {...attributes} {...listeners} className={styles.handle}>
                    ⋮⋮
                </div>
            )}
        </div >
    )
}
