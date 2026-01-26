import { KeyboardEvent } from 'react'
import { createTextBlock } from '@/entities/block/model/blockUtils'
import { BLOCK_TYPES } from '@/entities/block/config/constants'
import type { BlockEventContext } from '@/features/block-interaction/model/types'

/**
 * Handles Divider-specific key events
 */
export const handleDividerEvents = (e: KeyboardEvent, ctx: BlockEventContext): boolean => {
    const { blocks, block, onRemoveBlock, onSetActiveBlock, onInsertBlockAfter } = ctx

    if (block.type !== BLOCK_TYPES.DIVIDER) return false

    if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault()
        onRemoveBlock(block.id)
        const index = blocks.findIndex(b => b.id === block.id)
        if (index > 0) {
            onSetActiveBlock(blocks[index - 1].id)
        } else if (index < blocks.length - 1) {
            onSetActiveBlock(blocks[index + 1].id)
        }
        return true
    }

    if (e.key === 'Enter') {
        e.preventDefault()
        const newBlock = createTextBlock()
        onInsertBlockAfter(block.id, newBlock)
        return true
    }

    if (e.key === 'ArrowUp') {
        e.preventDefault()
        const index = blocks.findIndex(b => b.id === block.id)
        if (index > 0) onSetActiveBlock(blocks[index - 1].id)
        return true
    }

    if (e.key === 'ArrowDown') {
        e.preventDefault()
        const index = blocks.findIndex(b => b.id === block.id)
        if (index < blocks.length - 1) onSetActiveBlock(blocks[index + 1].id)
        return true
    }

    return false
}
