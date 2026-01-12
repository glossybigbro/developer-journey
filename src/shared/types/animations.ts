/**
 * 애니메이션 관련 타입 정의
 * 
 * @module shared/types/animations
 * @description
 * 애니메이션 설정 및 props에 사용되는 공통 타입들을 정의합니다.
 */

/**
 * 폭죽(Confetti) 효과 옵션
 * canvas-confetti 라이브러리 설정값과 정확히 매핑됩니다.
 */
export interface ConfettiOptions {
    /** 파티클 개수 (권장: 50~200) */
    particleCount: number
    /** 퍼짐 각도 (도). 360은 전방향 폭발을 의미합니다. */
    spread: number
    /** 발사 원점 좌표 (0~1 사이의 정규화된 값). {x: 0.5, y: 0.5}는 화면 정중앙입니다. */
    origin: { x: number; y: number }
    /** 사용할 색상 배열 (HEX 코드) */
    colors: string[]
    /** 파티클 초기 속도 (기본값: 45) */
    startVelocity?: number
    /** 애니메이션 프레임 수 (값이 클수록 오래 지속됨) */
    ticks?: number
    /** 캔버스 z-index (기본값: 100) */
    zIndex?: number
}

/**
 * 스크롤 임계값 (Thresholds)
 * 특정 스크롤 위치에 도달했을 때 이벤트를 트리거하기 위한 설정입니다.
 */
export interface ScrollThresholds {
    /** 히어로 섹션 페이드 아웃 시작 위치 (px) */
    readonly HERO_FADE_START: number
    /** 히어로 섹션 페이드 아웃 종료 위치 (px) */
    readonly HERO_FADE_END: number
    /** 폭죽 효과가 멈추는 스크롤 위치 (px) */
    readonly CONFETTI_STOP: number
}

/**
 * Parallax 효과 설정
 * Framer Motion의 useTransform 훅에 전달되는 입력/출력 범위입니다.
 */
export interface ParallaxConfig {
    /** [입력] 히어로 Y축 이동 범위 (px) */
    readonly HERO_Y_RANGE: readonly [number, number]
    /** [입력] 히어로 투명도 범위 (0~1) */
    readonly HERO_OPACITY_RANGE: readonly [number, number]
    /** [입력] 배경 레이어 Y축 이동 범위 (px) */
    readonly BG_Y_RANGE: readonly [number, number]
    /** [입력] 스크롤 인디케이터 투명도 범위 */
    readonly INDICATOR_OPACITY_RANGE: readonly [number, number]
    /** [출력] 스크롤 값 매핑 범위 (px) */
    readonly SCROLL_RANGE: readonly [number, number]
    /** [출력] 인디케이터용 스크롤 범위 (px) */
    readonly INDICATOR_SCROLL_RANGE: readonly [number, number]
}

/**
 * RGB 색상 객체
 * 색상 보간(interpolation) 계산을 위해 사용됩니다.
 */
export interface RGBColor {
    r: number
    g: number
    b: number
}

/**
 * 그라데이션 색상 설정
 * 시작색과 끝색을 정의하여 부드러운 전환 효과를 만듭니다.
 */
export interface GradientColors {
    /** 시작 색상 (RGB) */
    START: RGBColor
    /** 종료 색상 (RGB) */
    END: RGBColor
}
