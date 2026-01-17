/**
 * 🌌 SpaceBackground Configuration
 * 
 * FSD: shared/ui/SpaceBackground/config
 */

export const SPACE_CONFIG = {
    // 은하수 먼지
    NEBULA: {
        COUNT: 800,
        BAND_WIDTH_RATIO: 0.4,   // 화면 높이 대비 띠 너비
        BAND_SLOPE: 0.3,         // 대각선 기울기
        BASE_SPEED_X: -0.08,
        BASE_SPEED_Y: -0.024,
        SIZE_BASE: 0.8,
        SIZE_VARIANCE: 2.5,
        GLOW_THRESHOLD: 1.5,     // 이 크기 이상일 때 글로우 효과
        OPACITY_BASE: 0.1,       // 기본 투명도
        OPACITY_DENSITY_FACTOR: 0.5 // 밀도에 따른 추가 투명도 계수
    },
    // 파티클 종류
    PARTICLE_TYPE: {
        SPARK: 'spark',
        GAS: 'gas'
    },
    // 레이어 인덱스
    LAYER_INDEX: {
        ONE: 1,
        TWO: 2,
        THREE: 3
    },
    // 별 레이어 (3단)
    STARS: {
        LAYER_1: {
            COUNT: 50,
            SIZE_MIN: 1.5,
            SIZE_MAX: 3.5,
            SPEED: 0.00005,
            TWINKLE_MIN: 0.01,
            TWINKLE_MAX: 0.03
        },
        LAYER_2: {
            COUNT: 100,
            SIZE_MIN: 0.8,
            SIZE_MAX: 2.3,
            SPEED: 0.00003,
            TWINKLE_MIN: 0.008,
            TWINKLE_MAX: 0.023
        },
        LAYER_3: {
            COUNT: 200,
            SIZE_MIN: 0.3,
            SIZE_MAX: 1.3,
            SPEED: 0.00001,
            TWINKLE_MIN: 0.005,
            TWINKLE_MAX: 0.015,
            OPACITY_MAX: 0.6
        }
    },
    // 유성
    SHOOTING_STAR: {
        INTERVAL_MIN: 300,
        INTERVAL_MAX: 1100,    // 300 + 800
        SPEED_MIN: 3,
        SPEED_MAX: 7,          // 3 + 4
        LENGTH_MIN: 100,
        LENGTH_MAX: 220,       // 100 + 120
        ANGLE: Math.PI / 4,    // 45도
        PROBABILITY_DOUBLE: 0.5,
        PROBABILITY_TRIPLE: 0.2
    },
    // 색상 팔레트
    COLORS: {
        COMMON: {
            TRANSPARENT: 'rgba(0, 0, 0, 0)',
            TRANSPARENT_WHITE: 'rgba(255, 255, 255, 0)'
        },
        GRADIENT: {
            TOP: '#0a0e27',
            MIDDLE: '#1a1a3e',
            BOTTOM: '#2d1b3d'
        },
        STARS: [
            'rgba(255, 255, 255, 1)',   // 흰색
            'rgba(255, 240, 200, 1)',   // 노란빛
            'rgba(200, 220, 255, 1)',   // 파란빛
            'rgba(255, 200, 150, 1)',   // 주황빛
            'rgba(255, 220, 220, 1)',   // 분홍빛
            'rgba(200, 255, 220, 1)',   // 연두빛
        ],
        SHOOTING_STAR_EXTRA: [
            '#ffffff', // 순백색
            '#ffe4b5', // Moccasin
            '#b0e0e6', // Powder Blue
        ]
    },
    // 폭발 효과
    EXPLOSION: {
        PARTICLE_COUNT: 60,      // 파티클 수 대폭 증가 (24 -> 60)
        MIN_SPEED: 2,           // 최소 속도
        MAX_SPEED: 12,          // 최대 속도 증가 (8 -> 12) - 더 시원하게 퍼짐
        MIN_SIZE: 1,            // 크기 증가
        MAX_SIZE: 3,
        DECAY: 0.015,           // 수명 감소 속도 약간 감소 (더 오래 지속)
        GRAVITY: 0.08,          // 중력 약간 증가
        FRICTION: 0.98,         // 공기 저항 (속도 감속)
        HITBOX_PADDING: 20,     // 판정 범위 증가
        COLORS: [
            '#FFD700', // Gold
            '#FFA500', // Orange
            '#FF4500', // Orange Red
            '#FFFFFF', // White
            '#00FFFF', // Cyan (Sci-fi 느낌)
            '#FF00FF', // Magenta (Sci-fi 느낌)
        ],
        SHOCKWAVE: {
            SPEED: 4,               // 속도 증가
            MAX_RADIUS_RATIO: 3,    // 더 멀리 퍼지게
            BASE_RADIUS: 5,
            MAX_RADIUS: 100,        // 최대 반경 대폭 증가
            WIDTH: 3,
            COLORS: ['#00FFFF', '#FF00FF'], // Cyan & Magenta 고정
            OPACITY_INITIAL: 0.8,
            LAYER_RATIO_SIZE: 0.9,
            LAYER_RATIO_SPEED: 0.95
        },
        // 섬광 (Bloom Effect)
        FLASH: {
            BASE_RADIUS: 5,
            MAX_RADIUS: 120,        // 더 크게 (80 -> 120)
            DECAY: 0.1,             // 조금 더 오래 지속 (0.15 -> 0.1)
            COLOR: '#FFFFFF',
            GRADIENT_STOP: 0.4,     // 내부 코어 비율
            LERP_FACTOR: 0.1,       // 크기 변화 부드러움 정도
            OPACITY_GLOW: 0.3       // 글로우 투명도 비율
        },
        TRAIL_LENGTH: 3,            // 파편 꼬리 길이
        // 잔해 (Afterglow/Gas)
        GAS: {
            PARTICLE_COUNT: 8,
            MIN_SIZE: 10,
            MAX_SIZE: 30,
            SPEED: 0.5,             // 느리게 퍼짐
            DECAY: 0.005,           // 매우 천천히 사라짐
            FRICTION: 0.96,         // 공기 저항
            OPACITY_INITIAL: 0.6,
            COLORS: [
                'rgba(138, 43, 226, 0.4)', // Blue Violet
                'rgba(75, 0, 130, 0.4)',   // Indigo
                'rgba(255, 20, 147, 0.3)', // Deep Pink
                'rgba(0, 255, 255, 0.2)',  // Cyan
            ]
        }
    },
    // 애니메이션 미세 조정
    ANIMATION: {
        STAR_PULSE_SPEED: 0.02,
        STAR_PULSE_AMPLITUDE: 0.2, // 펄스 진폭
        STAR_TWINKLE_MIN_OPACITY: 0.2, // 별 깜빡임 최소 투명도 (반전 임계값)
        STAR_SHADOW_THRESHOLD: 0.7, // 섀도우 적용 투명도 임계값
        STAR_SHADOW_BLUR: 15, // 섀도우 블러 크기
        STAR_WRAP_THRESHOLD: -0.01, // 화면 왼쪽 밖으로 나가는 임계값
        STAR_WRAP_RESET: 1.01, // 화면 오른쪽 리셋 위치
        SHOOTING_STAR_WIDTH: 3,
        SHOOTING_STAR_DECAY: 0.01,
        SHOCKWAVE_DECAY: 0.02,
        NEBULA_SHADOW: {
            BLUR: 12,
            THRESHOLD: 1.5
        }
    },
    // Canvas 렌더링 옵션
    CANVAS_OPTS: {
        COMPOSITE: {
            LIGHTER: 'lighter' as GlobalCompositeOperation,
            SOURCE_OVER: 'source-over' as GlobalCompositeOperation
        },
        LINE_CAP: {
            ROUND: 'round' as CanvasLineCap
        }
    }
} as const
