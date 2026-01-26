import { useEffect } from 'react'

interface UseSlashNavigationProps {
    isOpen: boolean
    selectedIndex: number
    setSelectedIndex: (index: number) => void
    onExecute: (index: number) => void
    onClose: () => void
    itemsCount: number
}

export function useSlashNavigation({
    isOpen,
    selectedIndex,
    setSelectedIndex,
    onExecute,
    onClose,
    itemsCount
}: UseSlashNavigationProps) {

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            const maxIndex = itemsCount - 1

            if (e.key === 'ArrowDown') {
                e.preventDefault()
                e.stopPropagation()
                const nextIndex = selectedIndex >= maxIndex ? 0 : selectedIndex + 1
                setSelectedIndex(nextIndex)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                e.stopPropagation()
                const prevIndex = selectedIndex <= 0 ? maxIndex : selectedIndex - 1
                setSelectedIndex(prevIndex)
            } else if (e.key === 'Enter') {
                e.preventDefault()
                e.stopPropagation()
                onExecute(selectedIndex)
            } else if (e.key === 'Escape') {
                e.preventDefault()
                e.stopPropagation()
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyDown, true)
        return () => window.removeEventListener('keydown', handleKeyDown, true)
    }, [isOpen, selectedIndex, itemsCount, setSelectedIndex, onExecute, onClose])
}
