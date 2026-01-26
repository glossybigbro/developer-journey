import { useEffect } from 'react'
import { useBlockStore } from '@/entities/block/model/useBlockStore'
import { createTextBlock } from '@/entities/block/model/blockUtils'

export function useCanvasEditor() {
    const store = useBlockStore()

    // Integrity Rule: Divider should NEVER be the last block.
    // Reactive check to ensure a text block always follows a divider at the end.
    useEffect(() => {
        const blocks = store.blocks
        if (blocks.length > 0) {
            const lastBlock = blocks[blocks.length - 1]
            if (lastBlock.type === 'divider') {
                // Prevent infinite loop by checking if we just added one? 
                // Store updates are immediate, so this effect runs after render.
                // We just append a text block.
                store.addBlock(createTextBlock(), blocks.length, false)
            }
        }
    }, [store.blocks, store.addBlock])

    return store
}
