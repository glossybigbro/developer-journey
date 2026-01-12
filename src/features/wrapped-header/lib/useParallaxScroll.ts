/**
 * 🎢 [HOOK] useParallaxScroll (패럴랙스 로직)
 * 
 * @layer features/wrapped-header/lib
 * @description
 * 스크롤 위치(`scrollY`)를 기반으로 UI 요소들의 위치(`y`)와 투명도(`opacity`)를 계산합니다.
 * Framer Motion의 `useScroll`과 `useTransform`을 사용하여 리렌더링 없는 고성능 애니메이션을 구현합니다.
 * 
 * 🏗️ 핵심 기술: [MotionValue & GPU Acceleration]
 * - `MotionValue`는 React State가 아닙니다. 값이 바뀐다고 컴포넌트가 다시 그려지지(Re-render) 않습니다.
 * - 대신 변화된 값이 DOM의 `style` 속성에 직접 주입됩니다.
 * - 브라우저는 이를 GPU 레이어에서 처리하므로, 메인 스레드 부하 없이 60fps 부드러운 스크롤 애니메이션이 가능합니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Interpolation (보간)**: 입력값 범위(0~500px)를 출력값 범위(0~-150px)로 매핑하는 원리
 * 2. **Hook Separation**: 애니메이션 '값'만 계산하여 반환하고, 실제 적용은 컴포넌트에게 맡기는 역할 분리
 */

import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import { PARALLAX_CONFIG, SCROLL_THRESHOLDS } from '../../../shared/config/animations'

/**
 * 📤 Return Interface
 * 컴포넌트에서 사용할 MotionValue들의 타입을 명시합니다.
 */
interface ParallaxValues {
    heroY: MotionValue<number>            // 헤더 콘텐츠 위치
    heroOpacity: MotionValue<number>      // 헤더 콘텐츠 투명도
    bgY: MotionValue<number>              // 배경 위치 (천천히 이동)
    indicatorOpacity: MotionValue<number> // 스크롤 안내 표시 투명도
}

export const useParallaxScroll = (): ParallaxValues => {
    // 1. Source of Truth: Scroll Position
    // 페이지 전체의 수직 스크롤 위치를 실시간으로 추적하는 MotionValue입니다.
    const { scrollY } = useScroll()

    // 2. Transformations
    // useTransform(input, inputRange, outputRange)

    // [Foreground] 헤더 텍스트: 빠르게 위로 이동
    const heroY = useTransform(
        scrollY,
        [...PARALLAX_CONFIG.SCROLL_RANGE] as number[],
        [...PARALLAX_CONFIG.HERO_Y_RANGE] as number[]
    )

    // [Fade Out] 헤더 텍스트: 사라짐
    const heroOpacity = useTransform(
        scrollY,
        [SCROLL_THRESHOLDS.HERO_FADE_START, SCROLL_THRESHOLDS.HERO_FADE_END],
        [...PARALLAX_CONFIG.HERO_OPACITY_RANGE] as number[]
    )

    // [Background] 배경: 천천히 위로 이동 (깊이감 형성)
    // 전경(Foreground)과 이동 속도를 다르게 하여 3D 같은 공간감을 만듭니다.
    const bgY = useTransform(
        scrollY,
        [...PARALLAX_CONFIG.SCROLL_RANGE] as number[],
        [...PARALLAX_CONFIG.BG_Y_RANGE] as number[]
    )

    // [Indicator] 스크롤 시작하면 즉시 사라짐
    const indicatorOpacity = useTransform(
        scrollY,
        [...PARALLAX_CONFIG.INDICATOR_SCROLL_RANGE] as number[],
        [...PARALLAX_CONFIG.INDICATOR_OPACITY_RANGE] as number[]
    )

    return { heroY, heroOpacity, bgY, indicatorOpacity }
}
