import { create } from 'zustand'
import { Block, CanvasEditorState, EditorMode } from './types'
import { createTextBlock } from './blockUtils'

interface BlockStore extends CanvasEditorState {
    mode: EditorMode
    setMode: (mode: EditorMode) => void

    // Actions
    addBlock: (block: Block, position?: number, shouldFocus?: boolean) => void
    insertBlockAfter: (prevBlockId: string, newBlock: Block, shouldFocus?: boolean) => void
    removeBlock: (blockId: string) => void
    updateBlock: (blockId: string, updates: Partial<Block>) => void
    turnIntoBlock: (blockId: string, newTypeBlock: Block, maintainContent?: boolean) => void
    setActiveBlock: (blockId: string | null) => void
    setCursorPosition: (position: number) => void
    toggleMode: () => void
}

export const useBlockStore = create<BlockStore>((set, get) => ({
    // Initial State
    blocks: [createTextBlock()],
    activeBlockId: null,
    cursorPosition: 1,
    mode: 'edit',

    setMode: (mode) => set({ mode }),

    // Actions
    addBlock: (block, position, shouldFocus = true) => set((state) => {
        const newBlocks = [...state.blocks]
        const insertPosition = position ?? state.cursorPosition ?? newBlocks.length
        newBlocks.splice(insertPosition, 0, block)

        return {
            blocks: newBlocks,
            cursorPosition: insertPosition + 1,
            activeBlockId: shouldFocus ? block.id : state.activeBlockId,
        }
    }),

    insertBlockAfter: (prevBlockId, newBlock, shouldFocus = true) => set((state) => {
        const index = state.blocks.findIndex(b => b.id === prevBlockId)
        if (index === -1) return state

        const newBlocks = [...state.blocks]
        newBlocks.splice(index + 1, 0, newBlock)

        return {
            blocks: newBlocks,
            activeBlockId: shouldFocus ? newBlock.id : state.activeBlockId,
        }
    }),

    removeBlock: (blockId) => set((state) => {
        const index = state.blocks.findIndex(b => b.id === blockId)
        if (index === -1) return state

        const prevBlockId = index > 0 ? state.blocks[index - 1].id : null
        const newBlocks = state.blocks.filter(b => b.id !== blockId)

        // Integrity Rule: Always keep at least one block
        if (newBlocks.length === 0) {
            const fallback = createTextBlock()
            return {
                blocks: [fallback],
                activeBlockId: fallback.id
            }
        }

        return {
            blocks: newBlocks,
            activeBlockId: state.activeBlockId === blockId ? prevBlockId : state.activeBlockId
        }
    }),

    updateBlock: (blockId, updates) => set((state) => ({
        blocks: state.blocks.map(b =>
            b.id === blockId ? { ...b, ...updates } as Block : b
        )
    })),

    turnIntoBlock: (blockId, newTypeBlock, maintainContent = true) => set((state) => {
        const index = state.blocks.findIndex(b => b.id === blockId)
        if (index === -1) return state

        const original = state.blocks[index]
        const newBlocks = [...state.blocks]

        const content = maintainContent
            ? (original as any).content || ''
            : (newTypeBlock as any).content || ''

        const transformed = {
            ...newTypeBlock,
            id: original.id,
            content,
            createdAt: original.createdAt
        }

        newBlocks[index] = transformed

        return {
            blocks: newBlocks,
            activeBlockId: original.id
        }
    }),

    setActiveBlock: (id) => set({ activeBlockId: id }),
    setCursorPosition: (pos) => set({ cursorPosition: pos }),
    toggleMode: () => set((state) => ({ mode: state.mode === 'edit' ? 'preview' : 'edit' }))
}))
