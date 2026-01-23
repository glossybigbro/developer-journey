import { useState, useEffect } from 'react'
import {
    RELEASE_NOTES,
    RELEASE_NOTIFICATION_DAYS,
    isRecentRelease,
    RELEASE_UI_TEXT,
    HUD_COLORS,
    RELEASE_ANIMATION_CONFIG,
    HUD_STYLES
} from '@/entities/release'

export function useHudTransmission() {
    const iconColor = HUD_COLORS.primary
    const latestRelease = RELEASE_NOTES[0]

    const isNewRelease = () => {
        if (!latestRelease?.date) return false
        return isRecentRelease(latestRelease.date, RELEASE_NOTIFICATION_DAYS)
    }

    const hasSignal = isNewRelease()
    const statusText = hasSignal ? RELEASE_UI_TEXT.HUD.STATUS_ACTIVE : RELEASE_UI_TEXT.HUD.STATUS_IDLE

    return {
        iconColor,
        hasSignal,
        statusText,
        config: RELEASE_ANIMATION_CONFIG,
        styles: HUD_STYLES,
        hudColors: HUD_COLORS
    }
}

export function useReleaseModal() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    return {
        mounted,
        releaseNotes: RELEASE_NOTES,
        uiText: RELEASE_UI_TEXT,
        animationConfig: RELEASE_ANIMATION_CONFIG,
        checkIsRecent: (date: string) => isRecentRelease(date, RELEASE_NOTIFICATION_DAYS)
    }
}
