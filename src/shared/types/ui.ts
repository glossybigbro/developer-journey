/**
 * UI 관련 타입 정의
 * FSD: shared/types
 */

export interface RadarConfig {
    // Canvas 크기
    size: number
    radiusPadding: number

    // 그리드
    radialLines: number
    gridOpacity: number
    gridLineWidth: number

    // 동심원
    concentricRatios: readonly number[]
    concentricLineWidth: number
    concentricAlpha: number

    // 배경
    fadeAlpha: number
    backgroundAlpha: number

    // 외곽 테두리
    borderLineWidth: number
    borderAlpha: number

    // 중심점
    centerDotRadius: number

    // 스캔 라인
    scanSpeed: number
    scanLineWidth: number
    sweepArc: number
    sweepGradientStops: readonly string[]

    // 펄스 링
    pulseSpeed: number
    pulseLineWidth: number

    // 신호 감지
    signalUpdateInterval: number
    signalDistanceMin: number
    signalDistanceMax: number
    signalDotRadius: number
    signalGlowRadius: number
    signalBlinkSpeed: number
    signalBlinkMin: number
    signalBlinkMax: number
}

/**
 * ⭐ Star 인터페이스
 * 캔버스에 그려질 개별 별의 속성
 */
export interface Star {
    x: number
    y: number
    size: number
    opacity: number
    twinkleSpeed: number
    layer: number
    color: string
    pulsePhase: number
}

/**
 * 💫 ShootingStar 인터페이스
 * 유성(별똥별)의 속성
 */
export interface ShootingStar {
    x: number
    y: number
    length: number
    speed: number
    opacity: number
    angle: number
}

/**
 * 🌫️ NebulaDust 인터페이스
 * 은하수를 구성하는 개별 먼지 파티클의 속성
 */
export interface NebulaDust {
    x: number
    y: number
    size: number
    opacity: number
    color: string
    speedX: number
    speedY: number
    layer: number
}
