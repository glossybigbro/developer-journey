/**
 * ⚙️ [CONFIG] Animation Constants (애니메이션 설정값)
 * 
 * @layer shared/config
 * @description
 * 애플리케이션 전체에서 쓰이는 애니메이션 타이밍, 색상, 스크롤 임계값 등을 **Hardcoding 하지 않고**
 * 이곳에서 상수(Constant)로 중앙 관리합니다.
 * 
 * 🏗️ 디자인 패턴: [Single Source of Truth]
 * - 문제: "폭죽 색깔 바꾸고 싶은데 어느 파일에 있었지?" -> 여기저기 흩어져 있으면 찾기 힘듭니다.
 * - 해결: 이 파일 하나만 수정하면 프로젝트 전체의 폭죽 색상, 애니메이션 속도가 일괄 변경됩니다.
 * 
 * 🎓 [학습 포인트]:
 * **Magic Number**란?
 * 코드 중간에 뜬금없이 등장하는 숫자(예: `if (y > 300)`)를 말합니다.
 * 이는 코드를 읽는 사람에게 "도대체 300이 뭐지?"라는 의문을 줍니다.
 * 이를 `SCROLL_THRESHOLDS.HERO_FADE_END` 같은 상수로 치환하면 코드 자체가 설명이 됩니다.
 */

/**
 * 📏 스크롤 임계값 (Scroll Thresholds)
 */
export const SCROLL_THRESHOLDS = {
    HERO_FADE_START: 0,      // 페이드 아웃 시작점
    HERO_FADE_END: 300,      // 300px 스크롤 시 완전히 투명해짐
    CONFETTI_STOP: 150,      // 150px 이상 내려가면 폭죽 멈춤 (성능 최적화)
} as const // as const: 값을 더 이상 수정할 수 없는 'Readonly 리터럴'로 만듭니다.

/**
 * 🎉 폭죽(Confetti) 파라미터
 * canvas-confetti 라이브러리 설정 객체입니다.
 */
export const CONFETTI_CONFIG = {
    // 🎨 Theme Colors: 디자인 시스템의 Warm Yellow 계열을 사용
    COLORS: ['#fbbf24', '#f59e0b', '#fb923c', '#f97316', '#fde047', '#facc15'],
    DURATION: 3000,              // 3초 동안 지속
    INTERVAL: 3000,              // 3초마다 재발사
    START_VELOCITY: 30,          // 폭발력 (높을수록 멀리 퍼짐)
    SPREAD: 360,                 // 퍼짐 각도 (360 = 원형, 180 = 반원)
    TICKS: 60,                   // 입자 수명 (Frame 단위)
    Z_INDEX: 0,                  // 배경에 위치
    PARTICLE_COUNT_MULTIPLIER: 50, // 입자 밀도
    INTERVAL_MS: 250,            // 연사 속도 (기관총처럼 다다다 쏘는 간격)
    INITIAL_DELAY: 500,          // 페이지 로드 후 첫 발사 대기 시간
} as const

/**
 * ⏱️ 헤더 타이밍 설정
 * Framer Motion의 `duration`(지속시간)과 `delay`(지연시간) 값입니다.
 */
export const HEADER_ANIMATIONS = {
    TITLE_DURATION: 0.8,
    TITLE_DELAY: 0.2,
    SUBTITLE_DELAY: 0.5, // 제목보다 0.3초 늦게 등장하여 '순차적(Stagger)' 느낌을 줌
} as const

/**
 * 📊 통계 섹션 애니메이션
 */
export const STATS_ANIMATIONS = {
    // Large Cards (큰 카드)
    LARGE_CARD: {
        INITIAL: { opacity: 0, y: 150, scale: 0.8 },
        ANIMATE: { opacity: 1, y: 0, scale: 1 },
        VIEWPORT: { once: true, amount: 0.1 },
        TRANSITION: {
            DURATION: 1.2,
            EASE: [0.25, 0.46, 0.45, 0.94] as const
        },
        HOVER: {
            y: -12,
            scale: 1.02,
            transition: { duration: 0.3 }
        }
    },

    // Small Cards (작은 카드)
    SMALL_CARD: {
        INITIAL: { opacity: 0, y: 100, scale: 0.85 },
        ANIMATE: { opacity: 1, y: 0, scale: 1 },
        VIEWPORT: { once: true, amount: 0.2 },
        TRANSITION: {
            DURATION: 1.0,
            EASE: [0.25, 0.46, 0.45, 0.94] as const
        },
        HOVER: {
            y: -6,
            scale: 1.03,
            transition: { duration: 0.2 }
        }
    },

    // Delays (순차 등장 효과)
    DELAYS: {
        CARD_1: 0.15,
        CARD_2: 0.3,
        CARD_3: 0.45,
        SMALL_1: 0.6,
        SMALL_2: 0.75,
        SMALL_3: 0.9
    },

    // Counter (숫자 카운팅)
    COUNTER: {
        LARGE_DURATION: 2,
        SMALL_DURATION: 1.5
    },

    // Legacy (하위 호환성)
    COUNTER_DURATION_LONG: 2,
    COUNTER_DURATION_SHORT: 1.5,
    CARD_APPEAR_DURATION: 1.2,
    CARD_HOVER_DURATION: 0.3,
} as const

/**
 * 🍱 Bento Grid 애니메이션
 */
export const BENTO_ANIMATIONS = {
    // Item (개별 아이템)
    ITEM: {
        INITIAL: { opacity: 0, scale: 0.95 },
        ANIMATE: { opacity: 1, scale: 1 },
        TRANSITION: {
            DURATION: 0.4
        },
        VIEWPORT: { once: true }
    }
} as const

/**
 * 🌌 Parallax(시차) 스크롤 설정
 * 스크롤 속도보다 느리거나 빠르게 요소를 움직여 깊이감을 줍니다.
 */
export const PARALLAX_CONFIG = {
    HERO_Y_RANGE: [0, -150],           // 스크롤 내릴 때 히어로는 위로 조금 더 빨리 올라감 (이질감 형성)
    HERO_OPACITY_RANGE: [1, 0],        // 투명도 1 -> 0
    BG_Y_RANGE: [0, -50],              // 배경은 아주 천천히 따라옴 (먼 산 효과)
    INDICATOR_OPACITY_RANGE: [1, 0],   // "Scroll Down" 화살표 사라짐
    SCROLL_RANGE: [0, 500],            // 입력값 범위 (0~500px 스크롤 구간 동안)
    INDICATOR_SCROLL_RANGE: [0, 100],  // 인디케이터는 초반 100px 만에 사라짐
} as const

/**
 * 🌈 배경 그라데이션 설정 (RGB)
 * CSS가 아닌 JS로 색을 섞어야 하므로 RGB(Red, Green, Blue) 숫자로 정의합니다.
 */
export const GRADIENT_CONFIG = {
    HERO_COLORS: {
        START: { r: 254, g: 243, b: 199 }, // #fef3c7 (Warm Yellow)
        END: { r: 254, g: 252, b: 245 },   // #fefcf5 (Cream)
    },
    STATS_COLORS: {
        START: { r: 255, g: 255, b: 255 }, // #ffffff (Pure White)
        END: { r: 255, g: 255, b: 255 },
    },
    // 스크롤 비율(0.0 ~ 1.0) 기준 전환 구간
    TRANSITION_START: 0,    // 0% 지점부터 색 변화 시작
    TRANSITION_END: 0.5,    // 50% 지점에서 색 변화 완료
} as const
