import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { hexToRgba } from '@/shared/lib/utils/styleUtils'
import { ACCENT_OPACITY } from '@/shared/config/uiConstants'
import { Section } from '@/entities/profile/model/sections'

export function useHeaderSettings(sectionId: string, currentConfig?: Section['headerConfig']) {
    const { updateSection, updateSectionContent, accentColor } = useProfileStore()

    const config = currentConfig || {
        level: 3,
        showDivider: false,
        align: 'left'
    } as NonNullable<Section['headerConfig']>

    const handleUpdate = (updates: Partial<NonNullable<Section['headerConfig']>>) => {
        updateSection(sectionId, {
            headerConfig: { ...config, ...updates }
        })
    }

    const getSelectedStyle = (color: string) => ({
        background: hexToRgba(color, ACCENT_OPACITY.BACKGROUND),
        borderColor: hexToRgba(color, ACCENT_OPACITY.BORDER),
        color: color,
        boxShadow: `0 0 15px ${hexToRgba(color, ACCENT_OPACITY.SHADOW)}`,
        textShadow: `0 0 8px ${hexToRgba(color, ACCENT_OPACITY.TEXT_SHADOW)}`,
    })

    return {
        config,
        accentColor,
        updateSectionContent,
        handleUpdate,
        getSelectedStyle
    }
}
