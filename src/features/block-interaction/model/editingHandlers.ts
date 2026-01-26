import { KeyboardEvent } from 'react'
import { Block, TextBlock } from '@/entities/block/model/types'
import { createTextBlock } from '@/entities/block/model/blockUtils'
import { BLOCK_TYPES } from '@/entities/block/config/constants'
import type { BlockEventContext } from '@/features/block-interaction/model/types'

/**
 * Handles Enter key logic (New block creation)
 * Rule 3: Early Return & Safety First
 */
export const handleEnterKey = (e: KeyboardEvent, ctx: BlockEventContext) => {
    // 1. Guard Clauses
    if (e.key !== 'Enter' || e.shiftKey || e.nativeEvent.isComposing) return

    e.preventDefault()

    const { blocks, block, onTurnIntoBlock, onAddBlock, onInsertBlockAfter } = ctx

    // Type Guard for content
    const content = 'content' in block ? (block as TextBlock).content : ''
    // Strict empty check (trimming optionally, but here we check for pure empty string or newline)
    const isEmpty = !content || content === '' || content === '\n'

    // 2. Scenario: Empty Header -> Turn into Text
    if (block.type === BLOCK_TYPES.HEADER && isEmpty) {
        const resetBlock = createTextBlock()
        onTurnIntoBlock(block.id, resetBlock)
        return
    }

    // 3. Determine Cursor Position
    const selection = window.getSelection()
    const isAtStart = selection?.rangeCount! > 0 &&
        selection?.getRangeAt(0)?.collapsed &&
        selection?.getRangeAt(0)?.startOffset === 0

    const newBlock = createTextBlock()

    // 4. Scenario: Start of non-empty block -> Prepend new block
    if (isAtStart && !isEmpty) {
        const index = blocks.findIndex(b => b.id === block.id)

        if (index === 0) {
            onAddBlock(newBlock, 0, false)
        } else {
            const prevId = blocks[index - 1].id
            onInsertBlockAfter(prevId, newBlock, false)
        }

        // Focus management optimization
        requestAnimationFrame(() => {
            const el = document.getElementById(`block-${block.id}`)
            // Reset cursor to start
            setCursorPosition(el, 0)
        })
        return
    }

    // 5. Default: Append new block after current
    onInsertBlockAfter(block.id, newBlock)
}

/**
 * Handles Backspace logic (Merging, Deletion)
 * Rule 3: Safety First (Defensive Coding)
 */
export const handleBackspace = (e: KeyboardEvent, ctx: BlockEventContext) => {
    // 1. Guard Clause
    if (e.key !== 'Backspace') return

    const { blocks, block, onRemoveBlock, onSetActiveBlock, onUpdateBlock } = ctx

    // 2. Selection Safety Check
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    // Only proceed if cursor is collapsed at the start (offset 0)
    if (!range.collapsed || range.startOffset !== 0) return

    const index = blocks.findIndex(b => b.id === block.id)
    const content = 'content' in block ? (block as TextBlock).content : ''
    // Handle explicitly empty text
    const isEmpty = !content || content === ''

    // 3. Scenario: Merge with Previous Block
    if (index > 0) {
        const prevBlock = blocks[index - 1]

        // 3a. Handle Divider Skip (Logic for merging across dividers)
        if (prevBlock.type === BLOCK_TYPES.DIVIDER) {
            handleDividerBackspace(e, ctx, index)
            return
        }

        // 3b. Standard Text Merge
        e.preventDefault()

        const prevContent = 'content' in prevBlock ? (prevBlock as TextBlock).content : ''
        const currContentRaw = content
        // Normalize newline
        const currContent = (currContentRaw === '\n') ? '' : currContentRaw

        // Update previous block
        if (currContent) {
            onUpdateBlock(prevBlock.id, { content: prevContent + currContent })
        }

        // Remove current and set active
        onRemoveBlock(block.id)
        onSetActiveBlock(prevBlock.id)

        // Restore Cursor Position
        requestAnimationFrame(() => {
            const el = document.getElementById(`block-${prevBlock.id}`)
            setCursorPosition(el, prevContent.length)
        })
        return
    }

    // 4. Scenario: Delete Empty Block at Start
    if (block.type === BLOCK_TYPES.TEXT && isEmpty) {
        e.preventDefault()
        onRemoveBlock(block.id)
    }
}

// --- Helpers ---

/**
 * Handles backspace when previous block is a Divider.
 * Skips over dividers to find the nearest text block.
 */
const handleDividerBackspace = (e: KeyboardEvent, ctx: BlockEventContext, currentIndex: number) => {
    const { blocks, block, onRemoveBlock, onSetActiveBlock } = ctx

    // Find nearest non-divider above
    let targetIndex = currentIndex - 1
    while (targetIndex >= 0 && blocks[targetIndex].type === BLOCK_TYPES.DIVIDER) {
        targetIndex--
    }

    const content = 'content' in block ? (block as TextBlock).content : ''
    const isEmpty = !content || content === ''

    if (targetIndex >= 0) {
        e.preventDefault()

        // If current is empty, remove it too for a cleaner feel
        if (isEmpty) {
            onRemoveBlock(block.id)
        }

        const targetBlock = blocks[targetIndex]
        onSetActiveBlock(targetBlock.id)

        requestAnimationFrame(() => {
            const el = document.getElementById(`block-${targetBlock.id}`)
            setCursorToEnd(el)
        })
    } else {
        // No block above dividers? Prevent default to avoid browser back nav
        e.preventDefault()
    }
}

/**
 * Sets cursor to specific offset in a node
 */
const setCursorPosition = (el: HTMLElement | null, offset: number) => {
    if (!el) return
    el.focus()

    // Safety check for child nodes
    if (el.childNodes.length > 0) {
        // Text node case
        if (el.childNodes.length === 1 && el.firstChild?.nodeType === Node.TEXT_NODE) {
            try {
                const range = document.createRange()
                range.setStart(el.firstChild!, offset)
                range.collapse(true)
                const sel = window.getSelection()
                sel?.removeAllRanges()
                sel?.addRange(range)
            } catch (err) {
                // Fallback if offset out of bounds
                setCursorToEnd(el)
            }
        } else {
            // Complex content case
            setCursorToEnd(el)
        }
    } else {
        // Empty element
        el.focus()
    }
}

/**
 * Sets cursor to the end of the element
 */
const setCursorToEnd = (el: HTMLElement | null) => {
    if (!el) return
    el.focus()
    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const sel = window.getSelection()
    sel?.removeAllRanges()
    sel?.addRange(range)
}
