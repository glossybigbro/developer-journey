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

export function useSectionBuilder() {
    const { sections, toggleSection, reorderSections } = useProfileStore()

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

    return {
        sections,
        sensors,
        handleDragEnd,
        toggleSection
    }
}
