import { useRef, useEffect } from 'react'
import { DividerBlock as DividerBlockType } from '@/entities/block/model/types'
import { EditableBlock } from '../EditableBlock'
import styles from './DividerBlock.module.css'

interface DividerBlockProps {
    block: DividerBlockType
    isActive: boolean
    onUpdate: (updates: Partial<DividerBlockType>) => void
    onFocus: () => void
    onBlur: () => void
    onKeyDown?: React.KeyboardEventHandler
}

export function DividerBlock({
    block,
    isActive,
    onUpdate,
    onFocus,
    onBlur,
    onKeyDown,
}: DividerBlockProps) {
    const divRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isActive && divRef.current) {
            divRef.current.focus()
        }
    }, [isActive])

    return (
        <EditableBlock
            block={block}
            isActive={isActive}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
            tabIndex={0}
            onKeyDown={onKeyDown}
            domRef={divRef}
        >
            <hr className={styles.divider} />
        </EditableBlock>
    )
}
