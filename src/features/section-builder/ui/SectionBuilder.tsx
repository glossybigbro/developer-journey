'use client'

import {
    DndContext,
    closestCenter,
} from '@dnd-kit/core'

import { useSectionBuilder } from '../model/useSectionBuilder'
import { ACT_LABELS } from '../../../entities/profile/model/sections'
import styles from './SectionBuilder.module.css'
import { SectionGroup } from './blocks/SectionGroup'

export function SectionBuilder() {
    const { sections, sensors, handleDragEnd, toggleSection } = useSectionBuilder()

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
