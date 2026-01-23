import { useState, useRef } from 'react'
import { useOnClickOutside } from '@/shared/lib/hooks/useOnClickOutside'

interface UseSectionItemProps {
    isLocked: boolean
    isCustomizable: boolean
    onToggle: () => void
}

export function useSectionItem({ isLocked, isCustomizable, onToggle }: UseSectionItemProps) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const popoverRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(popoverRef, () => setIsSettingsOpen(false))

    const handleAction = () => {
        setIsSettingsOpen(false)
    }

    const handleClick = (e: React.MouseEvent) => {
        if (isCustomizable) {
            setIsSettingsOpen(!isSettingsOpen)
        } else {
            onToggle()
        }
    }

    const handleAddClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        e.stopPropagation()
        if ('key' in e && (e.key !== 'Enter' && e.key !== ' ')) {
            return
        }
        if ('key' in e) {
            e.preventDefault()
        }
        handleAction()
    }

    return {
        isSettingsOpen,
        popoverRef,
        handleAction,
        handleClick,
        handleAddClick
    }
}
