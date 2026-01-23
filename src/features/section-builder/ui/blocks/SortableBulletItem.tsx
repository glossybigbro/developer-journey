'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import styles from '../SectionBuilder.module.css'
import { DragHandleIcon, DeleteIcon } from './BioIcons'
import { BIO_PLACEHOLDERS, BIO_UI_LABELS } from '../../config/bioConstants'

/**
 * 정렬 가능한 불렛 아이템 컴포넌트
 * 
 * @description
 * 개별 불렛 포인트의 드래그 앤 드롭 동작과 렌더링을 담당합니다.
 * dnd-kit의 useSortable 훅을 사용하여 드래그 이벤트를 처리합니다.
 */
interface SortableBulletItemProps {
    id: string
    value: string
    index: number
    onChange: (index: number, value: string) => void
    onRemove: (index: number) => void
}

export function SortableBulletItem({ id, value, index, onChange, onRemove }: SortableBulletItemProps) {
    // dnd-kit 훅: 드래그 상태 및 이벤트 핸들러 제공
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id })

    // 드래그 중 시각적 피드백을 위한 스타일
    // CSS.Transform을 사용하여 GPU 가속 활용
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`${styles.unifiedListItem} ${isDragging ? styles.dragging : ''}`}
        >
            {/* 드래그 핸들: 이 영역을 잡고 드래그 시작 */}
            <div className={styles.dragHandle} {...attributes} {...listeners}>
                <DragHandleIcon />
            </div>

            {/* 내용 입력 필드 */}
            <input
                type="text"
                className={styles.unifiedInput}
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                placeholder={BIO_PLACEHOLDERS.BULLET}
            />

            {/* 삭제 버튼: 항목 제거 */}
            <button
                onClick={() => onRemove(index)}
                className={styles.deleteAction}
                aria-label={BIO_UI_LABELS.REMOVE_ITEM}
            >
                <DeleteIcon />
            </button>
        </div>
    )
}
