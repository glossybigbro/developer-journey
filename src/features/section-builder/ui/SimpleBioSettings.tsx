'use client'

import { useEffect, useRef, useState } from 'react'
import {
    DndContext,
    closestCenter,
} from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { useBioList } from '../model/useBioList'
import { useSortableSensors } from '../model/useSortableSensors'
import { hexToRgba, autoResizeTextarea } from '@/shared/lib/utils/styleUtils'
import styles from './SectionBuilder.module.css'
import {
    BIO_UI_LABELS,
    BIO_PLACEHOLDERS,
    HEADING_SIZE_OPTIONS,
    ACCENT_OPACITY,
} from '../config/bioConstants'
import { SortableBulletItem } from './SortableBulletItem'

/**
 * 심플 바이오 설정 컴포넌트
 * 
 * @description
 * 사용자의 자기소개(Bio) 섹션을 설정하는 UI입니다.
 * - 제목 및 소개글 설정 (자동 조절 텍스트 영역)
 * - 불렛 포인트 리스트 관리 (추가, 삭제, 드래그 앤 드롭 정렬)
 * - 테마 색상에 따른 동적 스타일링
 */
export function SimpleBioSettings() {
    // 전역 상태 관리 (Zustand)
    // 전역 상태 및 로직 훅 사용
    const accentColor = useProfileStore(state => state.accentColor)
    const { bio, setBio, updateBullet, addBullet, removeBullet, handleDragEnd } = useBioList()

    // 텍스트 영역 자동 조절을 위한 Ref
    const headingRef = useRef<HTMLTextAreaElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)

    // DnD 센서 설정 (Custom Hook)
    const sensors = useSortableSensors()

    // 데이터 변경 시 텍스트 영역 높이 자동 조절
    useEffect(() => {
        autoResizeTextarea(headingRef.current)
    }, [bio?.heading])

    useEffect(() => {
        autoResizeTextarea(descriptionRef.current)
    }, [bio?.description])

    if (!bio) return null

    // 선택된 테마 색상에 따른 동적 스타일 생성
    // CSS 변수로 처리하기 어려운 미세한 투명도 조정을 위해 유틸리티 사용
    const getSelectedStyle = (color: string) => ({
        background: hexToRgba(color, ACCENT_OPACITY.BACKGROUND),
        borderColor: hexToRgba(color, ACCENT_OPACITY.BORDER),
        color: color,
        boxShadow: `0 0 15px ${hexToRgba(color, ACCENT_OPACITY.SHADOW)}`,
        textShadow: `0 0 8px ${hexToRgba(color, ACCENT_OPACITY.TEXT_SHADOW)}`,
    })

    // 불렛 포인트 내용 변경 핸들러


    return (
        <div className={styles.popOverContent}>
            {/* 섹션 1: 제목 및 헤딩 크기 설정 */}
            <div className={styles.settingsSection}>
                <div className={styles.settingsGroup}>
                    {/* 타이틀과 컨트롤이 수평 정렬 (flex) + 하단 마진 일치 (8px) */}
                    <div className={styles.labelRow} style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>{BIO_UI_LABELS.HEADING}</span>
                        <div className={styles.headingControls}>
                            {/* 헤딩 태그(H1, H2, H3) 선택기 */}
                            <div className={styles.sizeSelector}>
                                {HEADING_SIZE_OPTIONS.map((option) => {
                                    const isSelected = (bio.headingSize || 'h2') === option.value
                                    return (
                                        <div
                                            key={option.value}
                                            className={`${styles.sizeOption}`}
                                            onClick={() => setBio({ headingSize: option.value })}
                                            style={isSelected ? getSelectedStyle(accentColor) : {}}
                                        >
                                            {option.label}
                                        </div>
                                    )
                                })}
                            </div>
                            {/* 섹션 표시 여부 토글 */}
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={bio.showHeading !== false}
                                    onChange={(e) => setBio({ showHeading: e.target.checked })}
                                />
                                <span className={styles.slider}></span>
                            </label>
                        </div>
                    </div>

                    {/* 제목 입력 필드 (조건부 렌더링) */}
                    {bio.showHeading !== false && (
                        <textarea
                            ref={headingRef}
                            value={bio.heading}
                            onChange={(e) => setBio({ heading: e.target.value })}
                            className={`${styles.settingsInput} ${styles.textareaInput} ${styles.headingTextarea}`}
                            placeholder={BIO_PLACEHOLDERS.HEADING}
                            rows={1}
                            onInput={(e) => autoResizeTextarea(e.target as HTMLTextAreaElement)}
                        />
                    )}
                </div>

                {/* 섹션 2: 소개글 설정 */}
                <div className={styles.settingsGroup}>
                    <div className={styles.labelRow} style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <span className={styles.sectionTitle} style={{ marginBottom: 0 }}>{BIO_UI_LABELS.INTRODUCTION}</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={bio.showDescription !== false}
                                onChange={(e) => setBio({ showDescription: e.target.checked })}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    {/* 소개글 입력 필드 */}
                    {bio.showDescription !== false && (
                        <textarea
                            ref={descriptionRef}
                            value={bio.description}
                            onChange={(e) => setBio({ description: e.target.value })}
                            className={`${styles.settingsInput} ${styles.textareaInput} ${styles.introTextarea}`}
                            placeholder={BIO_PLACEHOLDERS.INTRODUCTION}
                            rows={3}
                            onInput={(e) => autoResizeTextarea(e.target as HTMLTextAreaElement)}
                        />
                    )}
                </div>
            </div>

            {/* 섹션 3: 상세 불렛 포인트 (DnD 리스트) */}
            <div className={styles.settingsSection}>
                <div className={styles.settingsGroup}>
                    <div className={styles.labelRow} style={{ marginBottom: 'var(--spacing-sm)' }}>
                        <span className={`${styles.sectionTitle} ${styles.detailsLabel}`} style={{ marginBottom: 0 }}>{BIO_UI_LABELS.DETAILS}</span>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={bio.showBullets !== false}
                                onChange={(e) => setBio({ showBullets: e.target.checked })}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    {bio.showBullets !== false && (
                        <div className={`${styles.list} ${styles.detailsList}`}>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={bio.bullets.map((b) => b.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {bio.bullets.map((bullet: { id: string; text: string }, index: number) => (
                                        <SortableBulletItem
                                            key={bullet.id}
                                            id={bullet.id}
                                            value={bullet.text}
                                            index={index}
                                            onChange={updateBullet}
                                            onRemove={removeBullet}
                                        />
                                    ))}
                                </SortableContext>
                            </DndContext>

                            <button
                                onClick={addBullet}
                                className={`${styles.settingsButton} ${styles.addBulletButton}`}
                            >
                                {BIO_UI_LABELS.ADD_BULLET}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
