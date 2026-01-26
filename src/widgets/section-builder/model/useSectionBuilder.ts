import {
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
    KeyboardSensor,
    DragEndEvent
} from '@dnd-kit/core'
import {
    sortableKeyboardCoordinates,
    arrayMove
} from '@dnd-kit/sortable'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'

import { useBlockStore } from '@/entities/block/model/useBlockStore'
import { createWidgetBlock } from '@/entities/block/model/blockUtils'

export function useSectionBuilder() {
    const { sections, toggleSection: toggleProfileSection, reorderSections } = useProfileStore()
    const { addBlock, removeBlock, blocks } = useBlockStore()

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250,
                tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            const oldIndex = sections.findIndex((s) => s.id === active.id)
            const newIndex = sections.findIndex((s) => s.id === over.id)

            reorderSections(arrayMove(sections, oldIndex, newIndex))
        }
    }

    const toggleSection = (sectionId: string) => {
        const section = sections.find(s => s.id === sectionId)
        if (!section) return

        // 1. Toggle in Profile Store (Left Panel UI)
        toggleProfileSection(sectionId)

        // 2. Sync with Block Store (Right Panel Editor)
        // If currently disabled -> enabling -> Add Block
        if (!section.enabled) {
            // Check if already exists to avoid duplicates (optional safety)
            const exists = blocks.some(b => b.type === 'widget' && (b as any).widgetType === section.id)
            if (!exists) {
                addBlock(createWidgetBlock(section.id, {}))
            }
        }
        // If currently enabled -> disabling -> Remove Block
        else {
            const blockToRemove = blocks.find(b => b.type === 'widget' && (b as any).widgetType === section.id)
            if (blockToRemove) {
                removeBlock(blockToRemove.id)
            }
        }
    }

    return {
        sections,
        sensors,
        handleDragEnd,
        toggleSection
    }
}
