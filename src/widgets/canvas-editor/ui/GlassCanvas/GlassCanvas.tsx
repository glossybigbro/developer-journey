import { Block } from '@/entities/block/model/types'
import { createTextBlock } from '@/entities/block/model/blockUtils'
import { HeaderBlock } from '@/entities/block/ui/HeaderBlock'
import { TextBlock } from '@/entities/block/ui/TextBlock'
import { DividerBlock } from '@/entities/block/ui/DividerBlock'
import { useBlockEvents } from '@/features/block-interaction/model/useBlockEvents'
import { BLOCK_TYPES } from '@/entities/block/config/constants'
import styles from './GlassCanvas.module.css'

interface GlassCanvasProps {
    blocks: Block[]
    activeBlockId: string | null
    onUpdateBlock: (blockId: string, updates: Partial<Block>) => void
    onSetActiveBlock: (blockId: string | null) => void
    onInsertBlockAfter: (prevBlockId: string, newBlock: Block, shouldFocus?: boolean) => void
    onAddBlock: (block: Block, index?: number, shouldFocus?: boolean) => void
    onRemoveBlock: (blockId: string) => void
    onTurnIntoBlock: (blockId: string, newTypeBlock: Block) => void
    onOpenSlashMenu: (rect: DOMRect, blockId: string) => void
    onBackgroundClick: (e: React.MouseEvent) => void
    isScrollLocked?: boolean
}

export function GlassCanvas({
    blocks,
    activeBlockId,
    onUpdateBlock,
    onSetActiveBlock,
    onInsertBlockAfter,
    onAddBlock,
    onRemoveBlock,
    onTurnIntoBlock,
    onOpenSlashMenu,
    onBackgroundClick,
    isScrollLocked = false,
}: GlassCanvasProps) {
    const { handleKeyDown } = useBlockEvents({
        blocks,
        onRemoveBlock,
        onSetActiveBlock,
        onInsertBlockAfter,
        onAddBlock,
        onUpdateBlock,
        onTurnIntoBlock
    })

    const renderBlock = (block: Block) => {
        const isActive = block.id === activeBlockId
        const onFocus = () => onSetActiveBlock(block.id)
        const onBlur = () => { }
        const onUpdate = (updates: Partial<Block>) => onUpdateBlock(block.id, updates)
        const onKeyDown = (e: React.KeyboardEvent) => handleKeyDown(e, block)

        switch (block.type) {
            case BLOCK_TYPES.HEADER:
                return (
                    <HeaderBlock
                        key={block.id}
                        block={block}
                        isActive={isActive}
                        onUpdate={onUpdate}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        onOpenSlashMenu={(rect) => onOpenSlashMenu(rect, block.id)}
                    />
                )
            case BLOCK_TYPES.TEXT:
                // Check for "Empty Page State": Only 1 block total, and it is empty.
                const isSolitaryAndEmpty = blocks.length === 1 && (block as any).content === ''

                return (
                    <TextBlock
                        key={block.id}
                        block={block}
                        isActive={isActive}
                        onUpdate={onUpdate}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                        onOpenSlashMenu={(rect) => onOpenSlashMenu(rect, block.id)}
                        showPlaceholderAlways={isSolitaryAndEmpty}
                    />
                )
            case BLOCK_TYPES.DIVIDER:
                return (
                    <DividerBlock
                        key={block.id}
                        block={block}
                        isActive={isActive}
                        onUpdate={onUpdate}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onKeyDown={onKeyDown}
                    />
                )
            default:
                return null
        }
    }

    return (
        <div
            className={styles.canvas}
            onClick={onBackgroundClick}
            style={{ overflowY: isScrollLocked ? 'hidden' : 'auto' }}
        >
            {blocks.length === 0 ? (
                <div className={styles.emptyState} onClick={() => {
                    // Empty state click handling if needed
                }}>
                    <p>Click to start writing...</p>
                </div>
            ) : (
                blocks.map(renderBlock)
            )}

            {/* Clickable area at bottom to focus last block - using shared handler now */}
            <div
                className={styles.clickArea}
                onClick={onBackgroundClick}
            />
        </div>
    )
}
