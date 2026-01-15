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
