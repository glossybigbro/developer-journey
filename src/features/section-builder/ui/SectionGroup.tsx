'use client'

import { useState } from 'react'
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { Section } from '../../../entities/profile/model/sections'
import styles from './SectionBuilder.module.css'
import { SectionItem } from './SectionItem'

interface SectionGroupProps {
    category: string
    label: string
    sections: Section[]
    onToggle: (id: string) => void
}

export function SectionGroup({
    category,
    label,
    sections,
    onToggle
}: SectionGroupProps) {
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
