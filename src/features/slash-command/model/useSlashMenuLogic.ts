import { useState, useCallback } from 'react'
import { Block, HeaderBlock, TextBlock, DividerBlock } from '@/entities/block/model/types'
import { createHeaderBlock, createTextBlock, createDividerBlock } from '@/entities/block/model/blockUtils'

interface UseSlashMenuLogicProps {
    blocks: Block[]
    insertBlockAfter: (prevBlockId: string, newBlock: Block, shouldFocus?: boolean) => void
    turnIntoBlock: (blockId: string, newBlock: Block, maintainContent?: boolean) => void
}

export function useSlashMenuLogic({ blocks, insertBlockAfter, turnIntoBlock }: UseSlashMenuLogicProps) {
    const [slashMenu, setSlashMenu] = useState<{
        isOpen: boolean
        triggerRect: DOMRect | null
        triggerBlockId: string | null
        selectedIndex: number
    }>({
        isOpen: false,
        triggerRect: null,
        triggerBlockId: null,
        selectedIndex: 0
    })

    const handleOpenSlashMenu = useCallback((rect: DOMRect, blockId: string) => {
        setSlashMenu({
            isOpen: true,
            triggerRect: rect,
            triggerBlockId: blockId,
            selectedIndex: 0
        })
    }, [])

    const handleCloseSlashMenu = useCallback(() => {
        setSlashMenu(prev => ({ ...prev, isOpen: false, triggerBlockId: null, selectedIndex: 0 }))
    }, [])

    const handleSlashItemHover = useCallback((index: number) => {
        setSlashMenu(prev => ({ ...prev, selectedIndex: index }))
    }, [])

    // This Logic was in CanvasEditor, moving it here.
    const executeSlashAction = useCallback((blockType: 'header' | 'text' | 'divider', level?: 1 | 2 | 3) => {
        const { triggerBlockId } = slashMenu
        if (!triggerBlockId) return

        let newBlock: HeaderBlock | TextBlock | DividerBlock

        if (blockType === 'header' && level) {
            newBlock = createHeaderBlock(level)
        } else if (blockType === 'divider') {
            newBlock = createDividerBlock()
        } else {
            newBlock = createTextBlock()
        }

        const currentBlock = blocks.find(b => b.id === triggerBlockId)
        let contentToPreserve = ''

        if (currentBlock) {
            const oldContent = (currentBlock as any).content || ''
            if (oldContent.endsWith('/')) {
                contentToPreserve = oldContent.slice(0, -1)
            } else {
                contentToPreserve = oldContent
            }
        }

        const blockWithContent = {
            ...newBlock,
            content: contentToPreserve
        }

        turnIntoBlock(triggerBlockId, blockWithContent, false)

        const isLastBlock = blocks.length > 0 && blocks[blocks.length - 1].id === triggerBlockId

        if (blockType === 'divider' || (blockType === 'header' && isLastBlock)) {
            const shouldAddLine = blockType === 'divider' || isLastBlock
            if (shouldAddLine) {
                const nextBlock = createTextBlock()
                const shouldFocusNewBlock = blockType === 'divider'
                insertBlockAfter(triggerBlockId, nextBlock, shouldFocusNewBlock)
            }
        }

        handleCloseSlashMenu()
    }, [blocks, slashMenu, turnIntoBlock, insertBlockAfter, handleCloseSlashMenu])

    return {
        slashMenu,
        handleOpenSlashMenu,
        handleCloseSlashMenu,
        handleSlashItemHover,
        executeSlashAction,
        setSlashMenu // Exposed for keyboard nav updates if needed
    }
}
