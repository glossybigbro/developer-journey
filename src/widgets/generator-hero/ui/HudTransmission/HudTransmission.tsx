'use client'

import { motion } from 'framer-motion'
import styles from './HudTransmission.module.css'
import { RELEASE_NOTES, RELEASE_NOTIFICATION_DAYS } from '@/shared/config/release-constants'
import { HUD_COLORS } from '@/shared/config/ui-constants'
import { UI_TEXT, ANIMATION_CONFIG } from '@/shared/config/ui-constants'
import { isRecentRelease } from '@/shared/lib/release/isRecentRelease'
import { CanvasRadar } from '@/shared/ui/CanvasRadar/CanvasRadar'

interface HudTransmissionProps {
    onClick: () => void
}

export function HudTransmission({ onClick }: HudTransmissionProps) {
    const iconColor = HUD_COLORS.primary

    // Check against the latest release (Top item in ReleaseModal)
    const latestRelease = RELEASE_NOTES[0]

    const isNewRelease = () => {
        if (!latestRelease?.date) return false
        return isRecentRelease(latestRelease.date, RELEASE_NOTIFICATION_DAYS)
    }

    const hasSignal = isNewRelease()
    const statusText = hasSignal ? UI_TEXT.HUD.STATUS_ACTIVE : UI_TEXT.HUD.STATUS_IDLE

    return (
        <motion.div
            className={styles.hudContainer}
            onClick={onClick}
            {...ANIMATION_CONFIG.HUD.initial}
            {...ANIMATION_CONFIG.HUD.animate}
            transition={ANIMATION_CONFIG.HUD.transition}
        >
            <div
                className={styles.hudMessage}
                style={{
                    borderColor: iconColor,
                    color: iconColor,
                    opacity: hasSignal ? ANIMATION_CONFIG.HUD_OPACITY.ACTIVE : ANIMATION_CONFIG.HUD_OPACITY.IDLE
                }}
            >
                {statusText}
            </div>

            <div
                className={styles.hudIconWrapper}
                style={{
                    borderColor: iconColor,
                    boxShadow: `0 0 15px ${iconColor}40`,
                    color: iconColor,
                    opacity: hasSignal ? ANIMATION_CONFIG.HUD_OPACITY.ACTIVE : ANIMATION_CONFIG.HUD_OPACITY.IDLE
                }}
            >
                <span className={styles.hudIcon}>
                    <CanvasRadar hasSignal={hasSignal} color={iconColor} />
                </span>

                {/* Scanline overlay for the icon */}
                <div className={styles.scanlines} style={{ opacity: ANIMATION_CONFIG.HUD_OPACITY.SCANLINE }} />
            </div>
        </motion.div>
    )
}
