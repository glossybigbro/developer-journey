'use client'

import { useState } from 'react'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core'
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { useProfileStore } from '../../../entities/profile/model/useProfileStore'
import { ACT_LABELS, Section } from '../../../entities/profile/model/sections'
import styles from './SectionBuilder.module.css'

interface SectionItemProps {
    section: Section
    onToggle: (id: string) => void
}

function SectionItem({ section, onToggle }: SectionItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: section.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.item} ${section.enabled ? styles.enabled : ''}`}
        >
            <div className={styles.itemContent}>
                <input
                    type="checkbox"
                    checked={section.enabled}
                    onChange={() => onToggle(section.id)}
                    className={styles.checkbox}
                />
                <div className={styles.itemInfo}>
                    <span className={styles.itemIcon}>{section.icon}</span>
                    <span className={styles.itemName}>{section.name}</span>
                    {section.width && (
                        <span className={styles.badge}>{section.width}</span>
                    )}
                </div>
            </div>
            <div {...attributes} {...listeners} className={styles.handle}>
                ⋮⋮
            </div>
        </div>
    )
}

function SectionGroup({
    category,
    label,
    sections,
    onToggle
}: {
    category: string,
    label: string,
    sections: Section[],
    onToggle: (id: string) => void
}) {
    const [isOpen, setIsOpen] = useState(true)

    if (sections.length === 0) return null

    return (
        <div className={styles.group}>
            <button
                className={styles.groupHeader}
                onClick={() => setIsOpen(!isOpen)}
                type="button"
            >
                <span className={styles.groupTitle}>{label}</span>
                <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>▼</span>
            </button>

            {isOpen && (
                <div className={styles.list}>
                    <SortableContext
                        items={sections.map(s => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {sections.map((section) => (
                            <SectionItem
                                key={section.id}
                                section={section}
                                onToggle={onToggle}
                            />
                        ))}
                    </SortableContext>
                </div>
            )}
        </div>
    )
}

export function SectionBuilder() {
    const { sections, toggleSection, reorderSections } = useProfileStore()

    const sensors = useSensors(
        useSensor(PointerSensor),
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

    // 그룹별로 섹션 분류 (순서는 유지되지만, 렌더링 시 그룹화)
    // *주의: 드래그 앤 드롭을 전체 리스트에서 하려면 그룹화 UI가 복잡해질 수 있음.
    // 여기서는 단순히 그룹별로 보여주되, 드래그는 그룹 내에서만 가능하게 하거나
    // 전체 리스트를 하나의 컨텍스트로 묶어야 함.
    // 초기 구현: ACT별로 그룹화하여 보여줌. (그룹 간 이동은 일단 제한)

    return (
        <div className={styles.container}>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className={styles.content}>
                    {Object.entries(ACT_LABELS).map(([category, label]) => (
                        <SectionGroup
                            key={category}
                            category={category}
                            label={label}
                            sections={sections.filter(s => s.category === category)}
                            onToggle={toggleSection}
                        />
                    ))}
                </div>
            </DndContext>
        </div>
    )
}
