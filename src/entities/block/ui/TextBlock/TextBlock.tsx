import { useRef, useEffect, useLayoutEffect } from 'react'
import { TextBlock as TextBlockType } from '@/entities/block/model/types'
import { EditableBlock } from '../EditableBlock'
import { PLACEHOLDER_TEXT, SLASH_TRIGGER_CHAR } from '@/entities/block/config/constants'
import styles from './TextBlock.module.css'

interface TextBlockProps {
    block: TextBlockType
    isActive: boolean
    onUpdate: (updates: Partial<TextBlockType>) => void
    onFocus: () => void
    onBlur: () => void
    onKeyDown: (e: React.KeyboardEvent) => void
    onOpenSlashMenu: (rect: DOMRect) => void
    showPlaceholderAlways?: boolean
}

export function TextBlock({
    block,
    isActive,
    onUpdate,
    onFocus,
    onBlur,
    onKeyDown,
    onOpenSlashMenu,
    showPlaceholderAlways,
}: TextBlockProps) {
    const contentRef = useRef<HTMLDivElement>(null)

    // Sync content before paint/focus
    useLayoutEffect(() => {
        if (contentRef.current && contentRef.current.innerText !== block.content) {
            contentRef.current.innerText = block.content
        }
    }, [block.content])

    useEffect(() => {
        if (contentRef.current && isActive) {
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
    }, [isActive, block.id, block.type])

    const handleInput = () => {
        if (contentRef.current) {
            // Use innerText to capture newlines (Shift+Enter) properly.
            // textContent often ignores <br> tags, causing empty state bugs.
            const text = contentRef.current.innerText || ''
            onUpdate({ content: text })

            // Slash Command Trigger
            if (text === SLASH_TRIGGER_CHAR) {
                // Determine position using Selection API for exact coordinates
                const selection = window.getSelection()
                if (selection && selection.rangeCount > 0) {
                    const range = selection.getRangeAt(0)
                    const rect = range.getBoundingClientRect()
                    onOpenSlashMenu(rect)
                } else {
                    // Fallback to block rect if selection fails
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
            <div
                ref={contentRef}
                className={`${styles.text} ${(!block.content || block.content === '\n') ? styles.empty : ''}`}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                onPaste={handlePaste}
                data-placeholder={(!block.content || block.content === '\n') ? PLACEHOLDER_TEXT.TEXT : ''}
                data-show-always={showPlaceholderAlways ? "true" : "false"}
                id={`block-${block.id}`}
            />
        </EditableBlock>
    )
}
