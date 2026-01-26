import { createPortal } from 'react-dom'
import { useSlashMenu } from '@/features/slash-command/model/useSlashMenu'
import styles from './SlashMenu.module.css'

interface SlashItem {
    id: string
    label: string
    desc: string
    icon: string
    action: () => void
    disabled?: boolean
}

interface SlashMenuProps {
    triggerRect: DOMRect
    items: SlashItem[]
    onClose: () => void
    selectedIndex: number
    onItemHover: (index: number) => void
}

export function SlashMenu({ triggerRect, items, onClose, selectedIndex, onItemHover }: SlashMenuProps) {
    const {
        mounted,
        style,
        menuRef,
        isKeyboardNav,
        ignoreScrollRef
    } = useSlashMenu({ triggerRect, onClose, selectedIndex, onItemHover })

    if (!mounted) return null

    return createPortal(
        <div
            ref={menuRef}
            className={`${styles.menu} ${isKeyboardNav ? styles.keyboardNavigation : ''}`}
            style={style}
        >
            {items.map((item, index) => (
                <button
                    key={item.id}
                    className={`${styles.item} ${index === selectedIndex ? styles.active : ''} ${item.disabled ? styles.disabled : ''}`}
                    onClick={(e) => {
                        e.stopPropagation() // Prevent blur or other events
                        if (item.disabled) return
                        item.action()
                    }}
                    onMouseEnter={() => {
                        ignoreScrollRef.current = true // Flag this update as Mouse-driven
                        onItemHover(index)
                    }}
                    onMouseDown={(e) => e.preventDefault()} // Prevent focus loss
                >
                    <div className={styles.icon}>{item.icon}</div>
                    <div className={styles.label}>
                        <span className={styles.title}>{item.label}</span>
                        <span className={styles.desc}>{item.desc}</span>
                    </div>
                </button>
            ))}
        </div>,
        document.body
    )
}
