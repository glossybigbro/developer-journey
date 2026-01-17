'use client'

import { motion } from 'framer-motion'
import styles from './HudTransmission.module.css'
import { RELEASE_NOTES, RELEASE_NOTIFICATION_DAYS, isRecentRelease, RELEASE_UI_TEXT, HUD_COLORS, RELEASE_ANIMATION_CONFIG, HUD_STYLES } from '@/entities/release'
import { CanvasRadar } from '@/shared/ui'

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
    const statusText = hasSignal ? RELEASE_UI_TEXT.HUD.STATUS_ACTIVE : RELEASE_UI_TEXT.HUD.STATUS_IDLE

    return (
        <motion.div
            className={styles.hudContainer}
            onClick={onClick}
            {...RELEASE_ANIMATION_CONFIG.HUD.initial}
            {...RELEASE_ANIMATION_CONFIG.HUD.animate}
            transition={RELEASE_ANIMATION_CONFIG.HUD.transition}
        >
            <div
                className={styles.hudMessage}
                style={{
                    borderColor: iconColor,
                    color: iconColor,
                    opacity: hasSignal ? RELEASE_ANIMATION_CONFIG.HUD_OPACITY.ACTIVE : RELEASE_ANIMATION_CONFIG.HUD_OPACITY.IDLE
                }}
            >
                {statusText}
            </div>

            <div
                className={styles.hudIconWrapper}
                style={{
                    borderColor: iconColor,
                    boxShadow: `0 0 ${HUD_STYLES.GLOW_SHADOW_BLUR} ${iconColor}${HUD_STYLES.GLOW_OPACITY_HEX}`,
                    color: iconColor,
                    opacity: hasSignal ? RELEASE_ANIMATION_CONFIG.HUD_OPACITY.ACTIVE : RELEASE_ANIMATION_CONFIG.HUD_OPACITY.IDLE
                }}
            >
                <span className={styles.hudIcon}>
                    <CanvasRadar
                        hasSignal={hasSignal}
                        color={iconColor}
                        signalColor={HUD_COLORS.signal}
                        signalGlowColor={HUD_COLORS.signalGlow}
                    />
                </span>

                {/* Scanline overlay for the icon */}
                <div className={styles.scanlines} style={{ opacity: RELEASE_ANIMATION_CONFIG.HUD_OPACITY.SCANLINE }} />
            </div>
        </motion.div>
    )
}
