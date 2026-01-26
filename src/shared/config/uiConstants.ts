/**
 * UI 관련 상수 및 애니메이션 설정
 * FSD: shared/config
 */

import type { RadarConfig } from '@/shared/types/uiTypes'

/**
 * 레이더 애니메이션 설정 (그리기 명세 - Generic)
 */
export const RADAR_CONFIG: RadarConfig = {
    // Canvas 크기
    size: 96,                      // Canvas 크기 (retina 대응)
    radiusPadding: 10,             // 중심에서 외곽까지 패딩

    // 그리드
    radialLines: 36,               // 방사형 그리드 선 개수
    gridOpacity: 0.4,              // 그리드 선 투명도
    gridLineWidth: 0.8,            // 그리드 선 두께

    // 동심원
    concentricRatios: [0.25, 0.5, 0.75, 1] as const,  // 동심원 비율
    concentricLineWidth: 0.5,      // 동심원 선 두께
    concentricAlpha: 0.3,          // 동심원 투명도

    // 배경
    fadeAlpha: 0.1,                // 페이드 효과 투명도
    backgroundAlpha: 0.8,          // 배경 원 투명도

    // 외곽 테두리
    borderLineWidth: 2,            // 테두리 선 두께
    borderAlpha: 0.8,              // 테두리 투명도

    // 중심점
    centerDotRadius: 2,            // 중심 점 반지름

    // 스캔 라인
    scanSpeed: 0.02,               // 스캔 라인 회전 속도
    scanLineWidth: 2,              // 스캔 라인 두께
    sweepArc: Math.PI / 3,         // 스캔 호 각도
    sweepGradientStops: ['CC', '66', '00'] as const,  // 그라디언트 색상 정지점

    // 펄스 링
    pulseSpeed: 0.01,              // 펄스 링 확장 속도
    pulseLineWidth: 1.5,           // 펄스 링 선 두께

    // 신호 감지
    signalUpdateInterval: 3000,    // 신호 위치 업데이트 간격 (ms)
    signalDistanceMin: 0.4,        // 신호 최소 거리 (반지름 비율)
    signalDistanceMax: 0.8,        // 신호 최대 거리 (반지름 비율)
    signalDotRadius: 4,            // 신호 점 반지름
    signalGlowRadius: 2,           // 신호 빛 반지름
    signalBlinkSpeed: 200,         // 신호 깜빡임 속도 (ms)
    signalBlinkMin: 0.5,           // 신호 최소 투명도
    signalBlinkMax: 1.0,           // 신호 최대 투명도
    signalInitialAngle: Math.PI / 6, // 초기 신호 각도
    signalInitialDistance: 0.6     // 초기 신호 거리
} as const

/**
 * 공통 애니메이션 설정
 */
export const COMMON_ANIMATION_CONFIG = {
    FADE_IN: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    }
} as const

/**
 * Accent color opacity values for selected state styling
 * Mimics the "Change User Button" aesthetic
 * Used in: HeaderSettings, BioSettings, etc.
 */
export const ACCENT_OPACITY = {
    BACKGROUND: 0.2,
    BORDER: 0.8,
    SHADOW: 0.4,
    TEXT_SHADOW: 0.6,
} as const
