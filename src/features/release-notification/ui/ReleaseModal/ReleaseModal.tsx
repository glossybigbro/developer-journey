'use client'

import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ReleaseModal.module.css'
import { useReleaseModal } from '../../model/useReleaseNotification'

interface ReleaseModalProps {
    isOpen: boolean
    onClose: () => void
}

export function ReleaseModal({ isOpen, onClose }: ReleaseModalProps) {
    const { mounted, releaseNotes, uiText, animationConfig, checkIsRecent } = useReleaseModal()

    if (!mounted) return null

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    {...animationConfig.MODAL.overlay.initial}
                    {...animationConfig.MODAL.overlay.animate}
                    {...animationConfig.MODAL.overlay.exit}
                    onClick={onClose}
                >
                    <motion.div
                        className={styles.modalContainer}
                        {...animationConfig.MODAL.container.initial}
                        {...animationConfig.MODAL.container.animate}
                        {...animationConfig.MODAL.container.exit}
                        transition={animationConfig.MODAL.container.transition}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* CRT Effect Overlay */}
                        <div className={styles.scanlines} />

                        <div className={styles.modalContent}>
                            <h2 className={styles.modalTitle}>
                                {uiText.MODAL.TITLE}
                            </h2>

                            <div className={styles.scrollableList}>
                                {releaseNotes.map((note, idx) => {
                                    // Check if item is recent using shared utility
                                    const showNewBadge = checkIsRecent(note.date)

                                    return (
                                        <div key={idx} className={styles.updateItem}>
                                            <div className={styles.itemContent}>
                                                <span className={styles.itemTitle}>
                                                    {note.title}
                                                    {showNewBadge && (
                                                        <span className={styles.newBadge}>{uiText.MODAL.NEW_BADGE}</span>
                                                    )}
                                                </span>
                                                <p className={styles.itemDesc}>{note.desc}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <button className={styles.closeButton} onClick={onClose}>
                                {uiText.MODAL.CLOSE_BUTTON}<span className={styles.cursor} />
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    )
}
