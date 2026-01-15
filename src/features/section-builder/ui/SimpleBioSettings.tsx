'use client'

import { useEffect, useRef } from 'react'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import styles from './SectionBuilder.module.css'
import {
    BIO_UI_LABELS,
    BIO_PLACEHOLDERS,
    HEADING_SIZE_OPTIONS,
    ACCENT_OPACITY,
    TEXTAREA_CONFIG,
} from '../config/bio-constants'

/**
 * Simple Bio Settings Component (Manual Input)
 * 
 * @description
 * Provides a flexible UI for bio creation:
 * 1. Heading (Manual text, Auto-resize)
 * 2. Description (Manual textarea, Auto-resize)
 * 3. Bullets (Dynamic list with add/remove)
 */
export function SimpleBioSettings() {
    const bio = useProfileStore((state) => state.bio)
    const setBio = useProfileStore((state) => state.setBio)
    const accentColor = useProfileStore(state => state.accentColor)

    const headingRef = useRef<HTMLTextAreaElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    // Auto-resize logic
    const adjustHeight = (el: HTMLTextAreaElement | null) => {
        if (!el) return
        el.style.height = 'auto'
        el.style.height = `${el.scrollHeight}px`
    }

    // Adjust Heading Height on change
    useEffect(() => {
        adjustHeight(headingRef.current)
    }, [bio?.heading])

    // Adjust Description Height on change
    useEffect(() => {
        adjustHeight(descriptionRef.current)
    }, [bio?.description])

    if (!bio) return null

    // Helper to convert hex to rgba
    // TODO: Move to shared/lib/utils/colors.ts if used elsewhere
    const hexToRgba = (hex: string, alpha: number) => {
        let r = 0, g = 0, b = 0;
        if (hex.length === 4) {
            r = parseInt(hex[1] + hex[1], 16);
            g = parseInt(hex[2] + hex[2], 16);
            b = parseInt(hex[3] + hex[3], 16);
        } else if (hex.length === 7) {
            r = parseInt(hex.substring(1, 3), 16);
            g = parseInt(hex.substring(3, 5), 16);
            b = parseInt(hex.substring(5, 7), 16);
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    /**
     * Generates dynamic styles for the selected state.
     * Mimics the "Change User Button" aesthetic with the user's accent color.
     */
    const getSelectedStyle = (color: string) => ({
        background: hexToRgba(color, ACCENT_OPACITY.BACKGROUND),
        borderColor: hexToRgba(color, ACCENT_OPACITY.BORDER),
        color: color,
        boxShadow: `0 0 15px ${hexToRgba(color, ACCENT_OPACITY.SHADOW)}`,
        textShadow: `0 0 8px ${hexToRgba(color, ACCENT_OPACITY.TEXT_SHADOW)}`,
    })

    // Handler for updating a specific bullet
    const handleBulletChange = (index: number, value: string) => {
        const newBullets = [...bio.bullets]
        newBullets[index] = value
        setBio({ bullets: newBullets })
    }

    // Handler for adding a new bullet
    const addBullet = () => {
        setBio({ bullets: [...bio.bullets, ''] })
    }

    // Handler for removing a bullet
    const removeBullet = (index: number) => {
        const newBullets = bio.bullets.filter((_, i) => i !== index)
        setBio({ bullets: newBullets })
    }

    return (
        <div className={styles.popOverContent}>
            {/* Section 1: Heading & Introduction */}
            <div className={styles.settingsSection}>
                <div className={styles.settingsGroup}>
                    <div className={styles.labelRow}>
                        <span className={styles.settingsLabel}>{BIO_UI_LABELS.HEADING}</span>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <div className={styles.sizeSelector}>
                                {HEADING_SIZE_OPTIONS.map((option) => {
                                    const isSelected = (bio.headingSize || 'h2') === option.value
                                    return (
                                        <div
                                            key={option.value}
                                            className={`${styles.sizeOption}`}
                                            onClick={() => setBio({ headingSize: option.value })}
                                            style={isSelected ? getSelectedStyle(accentColor) : {}}
                                        >
                                            {option.label}
                                        </div>
                                    )
                                })}
                            </div>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={bio.showHeading !== false}
                                    onChange={(e) => setBio({ showHeading: e.target.checked })}
                                />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>
                    {bio.showHeading !== false && (
                        <textarea
                            ref={headingRef}
                            value={bio.heading}
                            onChange={(e) => setBio({ heading: e.target.value })}
                            className={`${styles.settingsInput} ${styles.textareaInput}`}
                            placeholder={BIO_PLACEHOLDERS.HEADING}
                            rows={1}
                            style={{
                                minHeight: `${TEXTAREA_CONFIG.HEADING_MIN_HEIGHT}px`,
                                resize: 'none',
                                overflow: 'hidden',
                                whiteSpace: 'pre-wrap'
                            }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement
                                target.style.height = 'auto'
                                target.style.height = `${target.scrollHeight}px`
                            }}
                        />
                    )}
                </div>

                <div className={styles.settingsGroup}>
                    <div className={styles.labelRow}>
                        <span className={styles.settingsLabel}>{BIO_UI_LABELS.INTRODUCTION}</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={bio.showDescription !== false}
                                onChange={(e) => setBio({ showDescription: e.target.checked })}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    {bio.showDescription !== false && (
                        <textarea
                            ref={descriptionRef}
                            value={bio.description}
                            onChange={(e) => setBio({ description: e.target.value })}
                            className={`${styles.settingsInput} ${styles.textareaInput}`}
                            placeholder={BIO_PLACEHOLDERS.INTRODUCTION}
                            rows={3}
                            style={{
                                minHeight: `${TEXTAREA_CONFIG.INTRODUCTION_MIN_HEIGHT}px`,
                                resize: 'none',
                                overflow: 'hidden'
                            }}
                            onInput={(e) => {
                                const target = e.target as HTMLTextAreaElement
                                target.style.height = 'auto'
                                target.style.height = `${target.scrollHeight}px`
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Section 3: Bullets (Dynamic List) */}
            <div className={styles.settingsSection}>
                <div className={styles.settingsGroup}>
                    <div className={styles.labelRow}>
                        <span className={styles.settingsLabel} style={{ marginBottom: 0 }}>{BIO_UI_LABELS.DETAILS}</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={bio.showBullets !== false}
                                onChange={(e) => setBio({ showBullets: e.target.checked })}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>
                    {bio.showBullets !== false && (
                        <div className={styles.list} style={{ padding: 0 }}>

                            {bio.bullets.map((bullet, index) => (
                                <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                                    <input
                                        type="text"
                                        className={styles.settingsInput}
                                        value={bullet}
                                        onChange={(e) => handleBulletChange(index, e.target.value)}
                                        placeholder={BIO_PLACEHOLDERS.BULLET}
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        onClick={() => removeBullet(index)}
                                        className={styles.settingsButton}
                                        style={{ width: '36px', height: '36px', padding: '0', justifyContent: 'center' }}
                                        aria-label="Remove item"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M6.5 1.75c0-.414.336-.75.75-.75h1.5a.75.75 0 01.75.75V3h2.25a.75.75 0 010 1.5H11.5v8.5a1.5 1.5 0 01-1.5 1.5h-4a1.5 1.5 0 01-1.5-1.5V4.5H4.25a.75.75 0 010-1.5H6.5V1.75zm1.5 1.25V2.5h-1v.5h1zm-3 1.5v8.5a.5.5 0 00.5.5h4a.5.5 0 00.5-.5V4.5H5zM6.75 6.5a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4a.75.75 0 01.75-.75zm3.25.75a.75.75 0 10-1.5 0v4a.75.75 0 10 1.5 0v-4z" />
                                        </svg>
                                    </button>
                                </div>
                            ))}

                            <button
                                onClick={addBullet}
                                className={styles.settingsButton}
                                style={{ width: '100%', justifyContent: 'center', marginTop: '8px', height: '36px' }}
                            >
                                {BIO_UI_LABELS.ADD_BULLET}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
