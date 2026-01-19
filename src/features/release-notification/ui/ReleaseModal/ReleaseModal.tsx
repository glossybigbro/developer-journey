'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ReleaseModal.module.css'
import { RELEASE_NOTES, RELEASE_NOTIFICATION_DAYS, isRecentRelease, RELEASE_UI_TEXT, RELEASE_ANIMATION_CONFIG } from '@/entities/release'

interface ReleaseModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ReleaseModal({ isOpen, onClose }: ReleaseModalProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    {...RELEASE_ANIMATION_CONFIG.MODAL.overlay.initial}
                    {...RELEASE_ANIMATION_CONFIG.MODAL.overlay.animate}
                    {...RELEASE_ANIMATION_CONFIG.MODAL.overlay.exit}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modalContainer}
                        {...RELEASE_ANIMATION_CONFIG.MODAL.container.initial}
                        {...RELEASE_ANIMATION_CONFIG.MODAL.container.animate}
                        {...RELEASE_ANIMATION_CONFIG.MODAL.container.exit}
                        transition={RELEASE_ANIMATION_CONFIG.MODAL.container.transition}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* CRT Effect Overlay */}
                        <div className={styles.scanlines} />

                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>
                                {RELEASE_UI_TEXT.MODAL.TITLE}
                            </h2>

                            <div className={styles.scrollableList}>
                                {RELEASE_NOTES.map((note, idx) => {
                                    // Check if item is recent using shared utility
                                    const showNewBadge = isRecentRelease(note.date, RELEASE_NOTIFICATION_DAYS)

                                    return (
                                        <div key={idx} className={styles.updateItem}>
                                            <div className={styles.itemContent}>
                                                <span className={styles.itemTitle}>
                                                    {note.title}
                                                    {showNewBadge && (
                                                        <span className={styles.newBadge}>{RELEASE_UI_TEXT.MODAL.NEW_BADGE}</span>
                                                    )}
                                                </span>
                                                <p className={styles.itemDesc}>{note.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <button className={styles.closeButton} onClick={onClose}>
                                {RELEASE_UI_TEXT.MODAL.CLOSE_BUTTON}<span className={styles.cursor} />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}
