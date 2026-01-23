'use client'

import { motion } from 'framer-motion'
import styles from './HudTransmission.module.css'
import { CanvasRadar } from '@/shared/ui'
import { useHudTransmission } from '../../model/useReleaseNotification'

interface HudTransmissionProps {
    onClick: () => void
}

export function HudTransmission({ onClick }: HudTransmissionProps) {
    const {
        iconColor,
        hasSignal,
        statusText,
        config,
        styles: hudStyles,  // Entity styles (constants)
        hudColors
    } = useHudTransmission()

    return (
        <motion.div
            className={styles.hudContainer}
            onClick={onClick}
            {...config.HUD.initial}
            {...config.HUD.animate}
            transition={config.HUD.transition}
        >
            <div
                className={styles.hudMessage}
                style={{
                    borderColor: iconColor,
                    color: iconColor,
                    opacity: hasSignal ? config.HUD_OPACITY.ACTIVE : config.HUD_OPACITY.IDLE
                }}
            >
                {statusText}
            </div>

            <div
                className={styles.hudIconWrapper}
                style={{
                    borderColor: iconColor,
                    boxShadow: `0 0 ${hudStyles.GLOW_SHADOW_BLUR} ${iconColor}${hudStyles.GLOW_OPACITY_HEX}`,
                    color: iconColor,
                    opacity: hasSignal ? config.HUD_OPACITY.ACTIVE : config.HUD_OPACITY.IDLE
                }}
            >
                <span className={styles.hudIcon}>
                    <CanvasRadar
                        hasSignal={hasSignal}
                        color={iconColor}
                        signalColor={hudColors.signal}
                        signalGlowColor={hudColors.signalGlow}
                    />
                </span>

                {/* Scanline overlay for the icon */}
                <div className={styles.scanlines} style={{ opacity: config.HUD_OPACITY.SCANLINE }} />
            </div>
        </motion.div>
    )
}
