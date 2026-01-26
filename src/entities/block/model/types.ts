// Block 타입 정의
export type BlockType = 'header' | 'text' | 'divider' | 'widget'

export interface BaseBlock {
    id: string
    type: BlockType
    createdAt: number
}

export interface HeaderBlock extends BaseBlock {
    type: 'header'
    level: 1 | 2 | 3
    content: string
}

export interface TextBlock extends BaseBlock {
    type: 'text'
    content: string
}

export interface DividerBlock extends BaseBlock {
    type: 'divider'
}

// 추후 확장을 위한 Widget 블록 (Phase 3)
export interface WidgetBlock extends BaseBlock {
    type: 'widget'
    widgetType: string
    config: Record<string, unknown>
}

export type Block = HeaderBlock | TextBlock | DividerBlock | WidgetBlock

// Canvas Editor State
export interface CanvasEditorState {
    blocks: Block[]
    activeBlockId: string | null
    cursorPosition: number
}

// Mode
export type EditorMode = 'edit' | 'preview'
