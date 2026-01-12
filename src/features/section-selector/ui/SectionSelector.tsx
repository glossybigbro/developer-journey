/**
 * 🎛️ [FEATURE] SectionSelector (섹션 선택기)
 * 
 * @layer features/section-selector/ui
 * @description
 * 사용자가 GitHub Wrapped 프로필에 포함할 섹션을 선택하는 UI 컴포넌트입니다.
 * 아코디언 방식으로 7개 ACT를 펼치고 접을 수 있으며, 각 ACT 내부의 섹션들을
 * 체크박스로 선택/해제할 수 있습니다.
 * 
 * 🏗️ 디자인 패턴: [Controlled Component]
 * - 선택 상태를 내부에서 관리하지만, 부모 컴포넌트에게도 알림
 * - onSelectionChange 콜백을 통해 상위 컴포넌트와 동기화
 * 
 * 🎨 UI 특징:
 * - **글래스모피즘 스타일**: 반투명 배경 + 블러 효과
 * - **펄스 애니메이션**: 닫혀있을 때만 미묘한 글로우 효과로 주의 끌기
 * - **그라데이션 뱃지**: 선택된 섹션 개수를 시각적으로 강조
 * - **중첩 아코디언**: 메인 토글 + ACT별 토글 2단계 구조
 * 
 * 🎓 [학습 목표]:
 * 1. **복잡한 상태 관리**: 여러 레벨의 펼침/접힘 상태 관리
 * 2. **배열 불변성**: filter, spread 연산자로 상태 업데이트
 * 3. **조건부 렌더링**: isExpanded, isActExpanded 상태에 따른 UI 변화
 * 4. **CSS Modules**: 로컬 스코프 스타일링
 * 5. **접근성**: label + checkbox 조합으로 클릭 영역 확대
 */

// [Client Component Directive] Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시
'use client'

// [React Hooks] React 기본 Hooks
import { useState } from 'react'

// [CSS Module] 로컬 스코프 스타일시트
import styles from './SectionSelector.module.css'

// [Feature Model] 같은 feature 내부의 데이터 모델 (상대 경로 사용)
import { ACTS, getSectionsByAct, getDefaultSelectedIds } from '../model/sections'
import type { Section } from '../model/sections'

// ==========================================
// [Constants] 상수 정의
// ==========================================

/**
 * 기본으로 펼쳐질 ACT ID
 * ACT 1 (Welcome)은 가장 중요한 섹션들을 포함하므로 기본으로 펼쳐진 상태로 표시
 */
const DEFAULT_EXPANDED_ACT_ID = 1

// ==========================================
// [TypeScript Interface] Props 타입 정의
// ==========================================

/**
 * 📝 SectionSelectorProps
 * 
 * @property onSelectionChange - 선택된 섹션 ID 배열이 변경될 때 호출되는 콜백
 *                                부모 컴포넌트(GeneratorForm)가 선택 상태를 알 수 있도록 함
 */
interface SectionSelectorProps {
    onSelectionChange?: (selectedIds: number[]) => void
}

// ==========================================
// [Main Component] SectionSelector
// ==========================================

/**
 * 🌟 SectionSelector 컴포넌트
 * 
 * @description
 * 사용자가 GitHub Wrapped에 포함할 섹션을 선택하는 UI를 제공합니다.
 * 
 * @param props - SectionSelectorProps 인터페이스에 정의된 props
 */
export default function SectionSelector({ onSelectionChange }: SectionSelectorProps) {
    // ==========================================
    // [State Management] 상태 관리
    // ==========================================

    /**
     * 전체 섹션 선택 UI의 펼침/접힘 상태
     * - true: 섹션 선택 UI가 펼쳐진 상태
     * - false: 섹션 선택 UI가 접힌 상태 (기본값)
     */
    const [isExpanded, setIsExpanded] = useState(false)

    /**
     * 현재 선택된 섹션 ID 배열
     * 초기값은 defaultSelected: true인 섹션들의 ID
     */
    const [selectedIds, setSelectedIds] = useState<number[]>(getDefaultSelectedIds())

    /**
     * 현재 펼쳐진 ACT ID 배열
     * 초기값은 ACT 1 (Welcome)만 펼쳐진 상태
     */
    const [expandedActs, setExpandedActs] = useState<number[]>([DEFAULT_EXPANDED_ACT_ID])

    // ==========================================
    // [Event Handlers] 이벤트 핸들러
    // ==========================================

    /**
     * 전체 섹션 선택 UI 토글
     * 
     * 🎯 목적: "Customize Content" 버튼 클릭 시 UI 펼치기/접기
     */
    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    /**
     * 특정 ACT 토글
     * 
     * 🎯 목적: ACT 헤더 클릭 시 해당 ACT의 섹션 목록 펼치기/접기
     * 
     * 🔍 작동 원리:
     * - 이미 펼쳐져 있으면 → 배열에서 제거 (접기)
     * - 접혀있으면 → 배열에 추가 (펼치기)
     * 
     * @param actId - 토글할 ACT의 ID
     */
    const toggleAct = (actId: number) => {
        setExpandedActs(prev =>
            prev.includes(actId)
                ? prev.filter(id => id !== actId)  // 이미 있으면 제거
                : [...prev, actId]                 // 없으면 추가
        )
    }

    /**
     * 특정 섹션 선택/해제
     * 
     * 🎯 목적: 체크박스 클릭 시 섹션 선택 상태 토글
     * 
     * 🔍 작동 원리:
     * - 이미 선택되어 있으면 → 배열에서 제거 (선택 해제)
     * - 선택되어 있지 않으면 → 배열에 추가 (선택)
     * - 변경된 배열을 부모 컴포넌트에게 알림 (onSelectionChange 콜백)
     * 
     * @param sectionId - 토글할 섹션의 ID
     */
    const toggleSection = (sectionId: number) => {
        const newSelectedIds = selectedIds.includes(sectionId)
            ? selectedIds.filter(id => id !== sectionId)  // 이미 선택되어 있으면 제거
            : [...selectedIds, sectionId]                 // 선택되어 있지 않으면 추가

        setSelectedIds(newSelectedIds)
        onSelectionChange?.(newSelectedIds)  // 부모 컴포넌트에게 알림
    }

    // ==========================================
    // [Render] JSX 렌더링
    // ==========================================

    return (
        <div className={styles.container}>
            {/* 
             * ==========================================
             * 메인 토글 버튼
             * ==========================================
             * 
             * 🎨 스타일 특징:
             * - collapsed 클래스: 닫혀있을 때만 추가되어 펄스 애니메이션 활성화
             * - 펄스 애니메이션: 사용자의 주의를 끌어 커스터마이징 기능 발견 유도
             * - 호버 시: 펄스 애니메이션 중지 (사용자가 상호작용 중일 때는 방해하지 않음)
             * 
             * 📊 표시 정보:
             * - 좌측: 화살표 아이콘 + "Customize Content" 텍스트
             * - 우측: 선택된 섹션 개수 뱃지 (그라데이션 + 글로우)
             */}
            <button
                type="button"
                className={`${styles.toggleButton} ${!isExpanded ? styles.collapsed : ''}`}
                onClick={toggleExpand}
            >
                <div className={styles.toggleTextWrapper}>
                    <span className={styles.toggleIcon}>{isExpanded ? '▲' : '▼'}</span>
                    Customize Content
                </div>
                <span className={styles.badge}>{selectedIds.length} selected</span>
            </button>

            {/* 
             * ==========================================
             * 섹션 선택 UI (조건부 렌더링)
             * ==========================================
             * 
             * isExpanded가 true일 때만 렌더링됩니다.
             * 
             * 🏗️ 구조:
             * - ACT 목록 (map으로 순회)
             *   - ACT 헤더 (클릭 시 토글)
             *   - 섹션 목록 (조건부 렌더링)
             *     - 체크박스 + 섹션 이름 + 설명
             */}
            {isExpanded && (
                <div className={styles.selectorContent}>
                    {ACTS.map(act => {
                        // 현재 ACT에 속한 섹션들 가져오기
                        const sections = getSectionsByAct(act.id)
                        // 현재 ACT가 펼쳐져 있는지 확인
                        const isActExpanded = expandedActs.includes(act.id)

                        return (
                            <div key={act.id} className={styles.actGroup}>
                                {/* 
                                 * ACT 헤더 버튼
                                 * 
                                 * 클릭 시 해당 ACT의 섹션 목록을 펼치거나 접습니다.
                                 * 
                                 * 📊 표시 정보:
                                 * - 화살표 아이콘 (▶ 또는 ▼)
                                 * - ACT 번호, 이름, 이모지
                                 */}
                                <button
                                    type="button"
                                    className={styles.actHeader}
                                    onClick={() => toggleAct(act.id)}
                                >
                                    <span className={styles.actIcon}>{isActExpanded ? '▼' : '▶'}</span>
                                    <span className={styles.actName}>
                                        ACT {act.id}: {act.name} {act.emoji}
                                    </span>
                                </button>

                                {/* 
                                 * 섹션 목록 (조건부 렌더링)
                                 * 
                                 * isActExpanded가 true일 때만 렌더링됩니다.
                                 * 
                                 * 🏗️ 구조:
                                 * - label 요소로 감싸서 클릭 영역 확대 (접근성 향상)
                                 * - checkbox + 섹션 이름 + 설명
                                 */}
                                {isActExpanded && (
                                    <div className={styles.sectionList}>
                                        {sections.map(section => (
                                            <label
                                                key={section.id}
                                                className={styles.sectionItem}
                                            >
                                                {/* 
                                                 * 체크박스
                                                 * 
                                                 * checked: selectedIds 배열에 포함되어 있는지 확인
                                                 * onChange: toggleSection 호출하여 선택 상태 토글
                                                 */}
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(section.id)}
                                                    onChange={() => toggleSection(section.id)}
                                                    className={styles.checkbox}
                                                />
                                                {/* 섹션 이름 (영문) */}
                                                <span className={styles.sectionName}>{section.name}</span>
                                                {/* 섹션 설명 (한글) - 모바일에서는 숨김 */}
                                                <span className={styles.sectionDescription}>- "{section.description}"</span>
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
