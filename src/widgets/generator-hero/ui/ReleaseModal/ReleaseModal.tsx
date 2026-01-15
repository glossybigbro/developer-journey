'use client'

import { motion, AnimatePresence } from 'framer-motion'
import styles from './ReleaseModal.module.css'
import { RELEASE_NOTES, RELEASE_NOTIFICATION_DAYS } from '@/shared/config/release-constants'
import { UI_TEXT, ANIMATION_CONFIG } from '@/shared/config/ui-constants'
import { isRecentRelease } from '@/shared/lib/release/isRecentRelease'

interface ReleaseModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ReleaseModal({ isOpen, onClose }: ReleaseModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    {...ANIMATION_CONFIG.MODAL.overlay.initial}
                    {...ANIMATION_CONFIG.MODAL.overlay.animate}
                    {...ANIMATION_CONFIG.MODAL.overlay.exit}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modalContainer}
                        {...ANIMATION_CONFIG.MODAL.container.initial}
                        {...ANIMATION_CONFIG.MODAL.container.animate}
                        {...ANIMATION_CONFIG.MODAL.container.exit}
                        transition={ANIMATION_CONFIG.MODAL.container.transition}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* CRT Effect Overlay */}
                        <div className={styles.scanlines} />

                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>
                                {UI_TEXT.MODAL.TITLE}
                            </h2>

                            <div className={styles.scrollableList}>
                                {RELEASE_NOTES.map((note, idx) => {
                                    // Check if item is recent using shared utility
                                    const showNewBadge = isRecentRelease(note.date, RELEASE_NOTIFICATION_DAYS)

                                    return (
                                        <div key={idx} className={styles.updateItem}>
                                            <div className={styles.iconBox}>{note.icon}</div>
                                            <div className={styles.itemContent}>
                                                <span className={styles.itemTitle}>
                                                    {note.title}
                                                    {showNewBadge && (
                                                        <span className={styles.newBadge}>{UI_TEXT.MODAL.NEW_BADGE}</span>
                                                    )}
                                                </span>
                                                <p className={styles.itemDesc}>{note.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <button className={styles.closeButton} onClick={onClose}>
                                {UI_TEXT.MODAL.CLOSE_BUTTON}<span className={styles.cursor} />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
