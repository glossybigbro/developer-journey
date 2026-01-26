import { HeaderBlock, TextBlock, DividerBlock, WidgetBlock } from './types'
import { BLOCK_TYPES } from '../config/constants'

export const createWidgetBlock = (widgetType: string, config: Record<string, unknown> = {}): WidgetBlock => ({
    id: `${Date.now()}-${Math.random()}`,
    type: 'widget',
    widgetType,
    config,
    createdAt: Date.now(),
})

export const createHeaderBlock = (level: 1 | 2 | 3): HeaderBlock => ({
    id: `${Date.now()}-${Math.random()}`,
    type: BLOCK_TYPES.HEADER,
    level,
    content: '',
    createdAt: Date.now(),
})

export const createTextBlock = (): TextBlock => ({
    id: `${Date.now()}-${Math.random()}`,
    type: BLOCK_TYPES.TEXT,
    content: '',
    createdAt: Date.now(),
})

export const createDividerBlock = (): DividerBlock => ({
    id: `${Date.now()}-${Math.random()}`,
    type: BLOCK_TYPES.DIVIDER,
    createdAt: Date.now(),
})
