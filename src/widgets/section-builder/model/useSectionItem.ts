import { useState, useRef } from 'react'
import { useOnClickOutside } from '@/shared/lib/hooks/useOnClickOutside'
import { CUSTOMIZABLE_SECTION_IDS } from '../config/sectionConstants'

interface UseSectionItemProps {
    id: string
    isLocked: boolean
    onToggle: () => void
}

export function useSectionItem({ id, isLocked, onToggle }: UseSectionItemProps) {
    // 1. Logic Separation
    // Determine if this section type supports custom settings
    const isCustomizable = !isLocked && CUSTOMIZABLE_SECTION_IDS.includes(id as any)

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(popoverRef, () => setIsSettingsOpen(false))

    const closeSettings = () => {
        setIsSettingsOpen(false)
    }

    // 2. Semantic Handlers
    const handleToggleSettings = (e: React.MouseEvent) => {
        if (isCustomizable) {
            setIsSettingsOpen(!isSettingsOpen)
        } else {
            // If strictly toggle-able (not customizable), just toggle logic
            onToggle()
        }
    }

    const handleOpenSettings = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation()
        // Allow strictly click or Enter/Space
        if ('key' in e && (e.key !== 'Enter' && e.key !== ' ')) {
            return
        }
        if ('key' in e) {
            e.preventDefault()
        }
        closeSettings()
    }

    // 3. Computed View Values
    const sectionOpacity = isLocked ? 0.5 : 1
    const shouldShowAddButton = isSettingsOpen

    return {
        isSettingsOpen,
        popoverRef,
        isCustomizable,
        shouldShowAddButton,
        sectionOpacity,
        handleToggleSettings,
        handleOpenSettings
    }
}
