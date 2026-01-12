/**
 * 🍱 [SHARED] BentoGrid Layout (벤토 그리드)
 * 
 * @layer shared/ui
 * @description
 * Apple의 요약/대시보드 UI에서 영감을 받은 "도시락 통(Bento Box)" 스타일의 레이아웃 시스템입니다.
 * CSS Grid를 기반으로 하며, 각 아이템이 다양한 크기(ColSpan, RowSpan)를 가질 수 있습니다.
 * 
 * 🏗️ 디자인 패턴: [Compound Component]
 * - `BentoGrid`: 레이아웃의 뼈대(Grid Container)를 정의합니다.
 * - `BentoItem`: 개별 셀(Grid Item)의 배치와 스타일을 정의합니다.
 * 
 * 💡 **사용 예시**:
 * ```tsx
 * <BentoGrid>
 *   <BentoItem colSpan={2} rowSpan={1}>큰 카드</BentoItem>
 *   <BentoItem colSpan={1} rowSpan={2}>세로로 긴 카드</BentoItem>
 * </BentoGrid>
 * ```
 * 
 * 🎓 [학습 목표]:
 * 1. **CSS Grid Wrapper**: 복잡한 Grid 문법(`grid-template-columns`, `grid-column`)을 직관적인 Props(`colSpan`)로 추상화하는 법
 * 2. **Scroll Trigger Animation**: `framer-motion`의 `whileInView`를 사용하여 스크롤 시 순차적으로 등장하는 UI 구현
 * 3. **Compound Component Pattern**: 관련된 컴포넌트들을 함께 export하여 API 일관성 유지
 */

// [Client Component Directive] Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시
'use client'

// [React] React 기본 import
import React from 'react'

// [Framer Motion] 애니메이션 라이브러리
import { motion } from 'framer-motion'

// [Shared Config] 중앙화된 애니메이션 설정
import { BENTO_ANIMATIONS } from '../config/animations'

// [CSS Module] 로컬 스코프 스타일시트
import styles from './BentoGrid.module.css'

/**
 * 📦 [Interface] BentoGrid Container Props
 * 
 * Grid Container의 Props 타입 정의
 */
interface BentoGridProps {
    /** 추가 CSS 클래스 (선택사항) */
    className?: string

    /** Grid 내부에 배치될 자식 요소들 (BentoItem 컴포넌트들) */
    children: React.ReactNode
}

/**
 * 🏗️ [Component] BentoGrid
 * 
 * @description
 * Bento Grid의 컨테이너 컴포넌트입니다.
 * CSS Grid를 사용하여 자식 요소들을 배치합니다.
 * 
 * @param className - 추가 CSS 클래스
 * @param children - Grid 내부에 배치될 자식 요소들
 * 
 * @example
 * ```tsx
 * <BentoGrid className="my-custom-class">
 *   <BentoItem>...</BentoItem>
 * </BentoGrid>
 * ```
 */
export const BentoGrid = ({ className, children }: BentoGridProps) => {
    return (
        // [Grid Container] CSS Grid 컨테이너
        // styles.grid: CSS Module에서 정의된 grid 클래스
        // className: 외부에서 전달된 추가 클래스 (없으면 빈 문자열)
        <div className={`${styles.grid} ${className || ''}`}>
            {/* [Children] Grid Item들을 렌더링 */}
            {children}
        </div>
    )
}

/**
 * 📦 [Interface] BentoItem Props
 * 
 * Grid Item의 Props 타입 정의
 */
interface BentoItemProps {
    /** 추가 CSS 클래스 (선택사항) */
    className?: string

    /** 카드 내부에 표시될 콘텐츠 */
    children: React.ReactNode

    /** 
     * 가로로 차지할 칸 수 (1 ~ 4)
     * 
     * @default 1
     * @example
     * colSpan={2} // 2칸 차지 (화면의 절반)
     * colSpan={4} // 4칸 차지 (화면 전체)
     */
    colSpan?: 1 | 2 | 3 | 4

    /** 
     * 세로로 차지할 줄 수 (1 ~ 3)
     * 
     * @default 1
     * @example
     * rowSpan={2} // 2줄 차지 (세로로 길게)
     */
    rowSpan?: 1 | 2 | 3
}

/**
 * 🎴 [Component] BentoItem
 * 
 * @description
 * Bento Grid의 개별 아이템(카드) 컴포넌트입니다.
 * Framer Motion을 사용하여 스크롤 시 부드럽게 등장하는 애니메이션을 제공합니다.
 * 
 * @param className - 추가 CSS 클래스
 * @param children - 카드 내부에 표시될 콘텐츠
 * @param colSpan - 가로로 차지할 칸 수 (1~4), 기본값 1
 * @param rowSpan - 세로로 차지할 줄 수 (1~3), 기본값 1
 * 
 * @example
 * ```tsx
 * // 2x2 크기의 큰 카드
 * <BentoItem colSpan={2} rowSpan={2}>
 *   <h3>큰 카드</h3>
 * </BentoItem>
 * 
 * // 1x1 크기의 작은 카드
 * <BentoItem>
 *   <p>작은 카드</p>
 * </BentoItem>
 * ```
 */
export const BentoItem = ({
    className,
    children,
    colSpan = 1,  // 기본값: 1칸
    rowSpan = 1   // 기본값: 1줄
}: BentoItemProps) => {
    return (
        // [Motion Div] Framer Motion 애니메이션이 적용된 div
        <motion.div
            // [CSS Classes] 동적 클래스 바인딩
            // styles.item: 기본 아이템 스타일
            // styles[`col-${colSpan}`]: 가로 칸 수에 따른 클래스 (예: col-2)
            // styles[`row-${rowSpan}`]: 세로 줄 수에 따른 클래스 (예: row-2)
            // className: 외부에서 전달된 추가 클래스
            className={`${styles.item} ${styles[`col-${colSpan}`]} ${styles[`row-${rowSpan}`]} ${className || ''}`}

            // [Initial State] 초기 상태: 약간 투명하고 작게
            // BENTO_ANIMATIONS.ITEM.INITIAL에서 관리
            initial={BENTO_ANIMATIONS.ITEM.INITIAL}

            // [Animate When In View] 화면에 보이면 이 상태로 전환
            // BENTO_ANIMATIONS.ITEM.ANIMATE에서 관리
            whileInView={BENTO_ANIMATIONS.ITEM.ANIMATE}

            // [Transition] 애니메이션 설정
            // duration: BENTO_ANIMATIONS.ITEM.TRANSITION.DURATION (0.4초)
            transition={{ duration: BENTO_ANIMATIONS.ITEM.TRANSITION.DURATION }}

            // [Viewport Options] 뷰포트 설정
            // BENTO_ANIMATIONS.ITEM.VIEWPORT에서 관리
            viewport={BENTO_ANIMATIONS.ITEM.VIEWPORT}
        >
            {/* [Glass Panel] Glassmorphism 효과를 위한 내부 래퍼 */}
            {/* 실제 시각적 스타일(배경, 테두리, 그림자)은 이 div에 적용됨 */}
            <div className={styles.glassPanel}>
                {/* [Content] 카드 내부 콘텐츠 */}
                {children}
            </div>
        </motion.div>
    )
}
