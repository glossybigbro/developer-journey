import { Block } from '@/entities/block/model/types'
import styles from './EditableBlock.module.css'

interface EditableBlockProps<T extends Block> {
    block: T
    isActive: boolean
    onUpdate: (updates: Partial<T>) => void
    onFocus: () => void
    onBlur: () => void
    children: React.ReactNode
}

export function EditableBlock<T extends Block>({
    block,
    isActive,
    onUpdate,
    onFocus,
    onBlur,
    children,
    tabIndex,
    onKeyDown,
    domRef,
}: EditableBlockProps<T> & {
    tabIndex?: number
    onKeyDown?: React.KeyboardEventHandler
    domRef?: React.Ref<HTMLDivElement>
}) {
    return (
        <div
            ref={domRef}
            className={`${styles.block} ${isActive ? styles.active : ''}`}
            onClick={onFocus}
            data-block-id={block.id}
            tabIndex={tabIndex}
            onKeyDown={onKeyDown}
        >
            {children}
        </div>
    )
}
