/**
 * Release Entity UI Constants
 * FSD: entities/release/config
 */

export const RELEASE_UI_TEXT = {
    HUD: {
        STATUS_ACTIVE: '[!] INCOMING DATA...',
        STATUS_IDLE: '[ ] SYSTEM IDLE'
    },
    MODAL: {
        TITLE: '🚀 NEW MODULES UNLOCKED',
        CLOSE_BUTTON: '[ MARK AS READ ]',
        NEW_BADGE: 'NEW'
    }
} as const

/**
 * HUD 색상 (Release 도메인 전용)
 */
export const HUD_COLORS = {
    primary: '#4ade80',    // Green
    signal: '#ff0055',     // Signal detection (Red)
    signalGlow: '#ff3377', // Signal inner glow
} as const

/**
 * HUD 스타일 설정
 */
export const HUD_STYLES = {
    GLOW_SHADOW_BLUR: '15px',
    GLOW_OPACITY_HEX: '40'
} as const

/**
 * Release 관련 애니메이션 설정
 */
export const RELEASE_ANIMATION_CONFIG = {
    HUD: {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: { type: 'spring' as const, stiffness: 200, damping: 20, delay: 1 }
    },
    MODAL: {
        overlay: {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
        },
        container: {
            initial: { scale: 0.8, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.8, opacity: 0 },
            transition: { type: 'spring' as const, duration: 0.5, bounce: 0.3 }
        }
    },
    HUD_OPACITY: {
        ACTIVE: 1,
        IDLE: 0.7,
        SCANLINE: 0.5
    }
} as const
