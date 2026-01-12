/**
 * 📘 [WIDGET] WrappedPageBackground (페이지 배경 위젯)
 * 
 * @description
 * Wrapped 페이지 전체의 시각적 기반이 되는 "컨테이너 위젯"입니다.
 * 단순한 래퍼(Wrapper)가 아니라, **스크롤 반응형 그라데이션**이라는 핵심 비즈니스 로직을 포함하고 있습니다.
 * 
 * 🏗️ FSD 아키텍처 역할 (Widget Layer):
 * - **조립(Composition)**: Widget은 Feature(기능단위)나 Shared(공통요소)를 조립하여 더 큰 단위의 UI를 만듭니다.
 * - **페이지 골격(Page Structure)**: 주로 Layout, Header, Footer 같은 페이지의 큰 구조를 담당합니다.
 * 
 * 📚 핵심 학습 포인트:
 * 1. **Slot Pattern (슬롯 패턴 = Children Prop)**:
 *    - 이 컴포넌트는 내부에 무엇이 들어올지 모릅니다(Feature A일수도, Feature B일수도 있음).
 *    - `children`이라는 '구멍(Slot)'을 뚫어놓고, 부모(Page)가 그 구멍에 내용을 채워넣게 합니다.
 *    - 이는 컴포넌트 간의 **의존성(Coupling)**을 낮추는 가장 중요한 React 패턴입니다.
 * 
 * 2. **Logic Hooks Separation**:
 *    - 배경색이 변하는 복잡한 수학적 로직은 `useScrollGradient`라는 Hook으로 완전히 분리했습니다.
 *    - 덕분에 이 컴포넌트는 "UI 렌더링"에만 집중할 수 있어 코드 가독성이 매우 높습니다.
 */

'use client'

import { useScrollGradient } from '../lib/useScrollGradient'
import styles from './WrappedPageBackground.module.css'

interface WrappedPageBackgroundProps {
    /** 
     * [Slot: Main Content]
     * 위젯 내부에 렌더링될 실제 콘텐츠들입니다.
     * React.ReactNode 타입은 JSX, 문자열, null 등 렌더링 가능한 모든 것을 허용합니다.
     */
    children: React.ReactNode
}

export default function WrappedPageBackground({ children }: WrappedPageBackgroundProps) {
    // 🎣 Custom Hook Usage
    // "스크롤위치에 따른 현재 배경 스타일을 줘"라고 요청만 합니다.
    // 내부에서 무슨 계산을 하는지 위젯은 알 필요가 없습니다 (캡슐화).
    const backgroundStyle = useScrollGradient()

    return (
        <div className={styles.pageContainer}>
            {/* 
                🖼️ Background Layer (Presentation)
                - position: fixed로 화면 전체를 덮습니다.
                - z-index: -1로 콘텐츠 뒤로 보냅니다.
                - style prop을 통해 JS로 계산된 동적 스타일(그라데이션)을 입힙니다.
            */}
            <div className={styles.gradientBackground} style={backgroundStyle} />

            {/* 
                📦 Content Layer (Injection)
                FSD의 상위 레이어(App)에서 주입한 Feature들이 여기에 배치됩니다.
                z-index 관리가 되어있어 배경 위에 안전하게 뜹니다.
            */}
            {children}
        </div>
    )
}
