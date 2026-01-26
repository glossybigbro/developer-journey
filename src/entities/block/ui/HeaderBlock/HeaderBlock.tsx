import React, { useRef, useEffect } from 'react'
import { HeaderBlock as HeaderBlockType } from '@/entities/block/model/types'
import { EditableBlock } from '../EditableBlock'
import { PLACEHOLDER_TEXT } from '@/entities/block/config/constants'
import styles from './HeaderBlock.module.css'

interface HeaderBlockProps {
    block: HeaderBlockType
    isActive: boolean
    onUpdate: (updates: Partial<HeaderBlockType>) => void
    onFocus: () => void
    onBlur: () => void
    onKeyDown: (e: React.KeyboardEvent) => void
    onOpenSlashMenu: (rect: DOMRect) => void
}

export function HeaderBlock({
    block,
    isActive,
    onUpdate,
    onFocus,
    onBlur,
    onKeyDown,
    onOpenSlashMenu,
}: HeaderBlockProps) {
    const contentRef = useRef<HTMLHeadingElement>(null)

    // Use useLayoutEffect to ensure content is set BEFORE browser paints or focus logic tries to measure selection
    React.useLayoutEffect(() => {
        if (contentRef.current && contentRef.current.innerText !== block.content) {
            contentRef.current.innerText = block.content
        }
    }, [block.content])

    useEffect(() => {
        if (contentRef.current && isActive) {
            // "Smart Focus": Move to end
            // We can safely assume content is up to date due to useLayoutEffect above
            if (document.activeElement !== contentRef.current) {
                contentRef.current.focus()

                const range = document.createRange()
                range.selectNodeContents(contentRef.current)
                range.collapse(false)
                const sel = window.getSelection()
                sel?.removeAllRanges()
                sel?.addRange(range)
            }
        }
    }, [isActive, block.id, block.type, block.level])

    const handleInput = () => {
        if (contentRef.current) {
            const text = contentRef.current.innerText || ''
            onUpdate({ content: text })

            // Slash Command Trigger
            if (text === '/') {
                const selection = window.getSelection()
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0)
                    const rect = range.getBoundingClientRect()
                    onOpenSlashMenu(rect)
                } else {
                    const rect = contentRef.current.getBoundingClientRect()
                    onOpenSlashMenu(rect)
                }
            }
        }
    }

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const text = e.clipboardData.getData('text/plain')
        document.execCommand('insertText', false, text)
    }

    return (
        <EditableBlock
            block={block}
            isActive={isActive}
            onUpdate={onUpdate}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {React.createElement(
                `h${block.level}`,
                {
                    ref: contentRef,
                    className: `${styles.header} ${(!block.content || block.content === '\n') ? styles.empty : ''}`,
                    contentEditable: true,
                    suppressContentEditableWarning: true,
                    onInput: handleInput,
                    onBlur: onBlur,
                    onKeyDown: onKeyDown,
                    onPaste: handlePaste,
                    'data-placeholder': (!block.content || block.content === '\n') ? PLACEHOLDER_TEXT.HEADER : '',
                    id: `block-${block.id}`,
                }
            )}
        </EditableBlock>
    )
}
