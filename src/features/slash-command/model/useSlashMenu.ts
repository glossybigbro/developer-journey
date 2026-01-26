import { useState, useRef, useEffect, useLayoutEffect } from 'react'

const MENU_GAP = 20
const MENU_LEFT_OFFSET = 18

interface UseSlashMenuProps {
    triggerRect: DOMRect
    onClose: () => void
    selectedIndex: number
    onItemHover: (index: number) => void
}

export function useSlashMenu({ triggerRect, onClose, selectedIndex, onItemHover }: UseSlashMenuProps) {
    const [mounted, setMounted] = useState(false)
    const [style, setStyle] = useState<React.CSSProperties>({
        top: 0,
        left: 0,
        opacity: 0,
    })
    const menuRef = useRef<HTMLDivElement>(null)
    const ignoreScrollRef = useRef(false)
    const [isKeyboardNav, setIsKeyboardNav] = useState(false)

    // Mount/Unmount & Global Events
    useEffect(() => {
        setMounted(true)
        document.body.style.overflow = 'hidden'

        const handleMouseMove = () => setIsKeyboardNav(false)
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                setIsKeyboardNav(true)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            setMounted(false)
            document.body.style.overflow = ''
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    // Positioning Logic
    useLayoutEffect(() => {
        if (!mounted || !menuRef.current) return

        const element = menuRef.current
        const menuRect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        const spaceBelow = viewportHeight - triggerRect.bottom
        const heightNeeded = menuRect.height + MENU_GAP

        let top = 0

        if (spaceBelow < heightNeeded) {
            top = triggerRect.top - MENU_GAP - menuRect.height
        } else {
            top = triggerRect.bottom + MENU_GAP
        }

        const left = triggerRect.left - MENU_LEFT_OFFSET

        setStyle({
            top,
            left,
            opacity: 1
        })
    }, [mounted, triggerRect])

    // Scroll Into View Logic
    useEffect(() => {
        if (!menuRef.current) return

        if (ignoreScrollRef.current) {
            ignoreScrollRef.current = false
            return
        }

        if (selectedIndex === 0) {
            menuRef.current.scrollTo(0, 0)
            return
        }

        const buttons = menuRef.current.querySelectorAll('button')
        const selectedButton = buttons[selectedIndex]

        if (selectedButton) {
            selectedButton.scrollIntoView({
                block: 'center',
                behavior: 'auto'
            })
        }
    }, [selectedIndex])

    return {
        mounted,
        style,
        menuRef,
        isKeyboardNav,
        ignoreScrollRef
    }
}
