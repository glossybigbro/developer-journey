/**
 * 🎨 [LIB] Gradient Math (그라데이션 수학)
 * 
 * @layer shared/lib/animations
 * @description
 * 스크롤 위치에 따라 배경색을 부드럽게 바꾸기 위해,
 * 두 색상(RGB) 사이의 중간값(Interpolation)을 계산하는 수학 함수들의 모음입니다.
 * 
 * 🏗️ 핵심 원리: [Linear Interpolation (LERP, 선형 보간)]
 * "A에서 B로 가는데, t만큼 갔을 때의 위치는 어디인가?"를 구하는 공식입니다.
 * Formula: `Current = Start + (End - Start) * t`
 * (여기서 t는 0.0 ~ 1.0 사이의 진행률입니다)
 * 
 * 🎓 [학습 목표]:
 * 1. **RGB Color Mixing**: CSS `linear-gradient`가 내부적으로 어떻게 색을 섞는지 이해합니다.
 * 2. **Math.round**: 색상값(0~255)은 정수여야 하므로 반올림 처리가 필수적임을 배웁니다.
 * 3. **Pure Function**: 외부 상태에 의존하지 않고, 입력값(progress)만으로 항상 같은 색상을 뱉어내는 순수 함수의 장점을 이해합니다.
 */

import type { RGBColor, GradientColors } from '../../types/animations'

/**
 * 🔢 색상 보간 함수 (LERP implementation)
 * 
 * @param color1 시작 색상 (t = 0)
 * @param color2 끝 색상 (t = 1)
 * @param factor 진행률 t (0.0 ~ 1.0)
 * @returns 중간 지점의 RGB 색상
 */
export const interpolateColor = (
    color1: RGBColor,
    color2: RGBColor,
    factor: number
): RGBColor => {
    return {
        // Red 채널 보간: R1 + (R2 - R1) * t
        r: Math.round(color1.r + (color2.r - color1.r) * factor),
        // Green 채널 보간
        g: Math.round(color1.g + (color2.g - color1.g) * factor),
        // Blue 채널 보간
        b: Math.round(color1.b + (color2.b - color1.b) * factor),
    }
}

/**
 * 🎨 RGB 객체를 CSS 문자열로 변환
 * 
 * @description
 * JavaScript 객체 `{r:255, g:0, b:0}`을 CSS가 이해할 수 있는 문자열 `"rgb(255, 0, 0)"`로 바꿉니다.
 * 템플릿 리터럴(Template Literal)을 사용하면 가독성이 좋습니다.
 */
export const rgbToString = (color: RGBColor): string => {
    return `rgb(${color.r}, ${color.g}, ${color.b})`
}

/**
 * 🎢 스크롤 기반 그라데이션 계산기
 * 
 * @description
 * 스크롤 진행률(progress)에 따라 3가지 상태 중 하나를 반환합니다:
 * 1. **Before**: 전환 시작 전 (Start Color 유지)
 * 2. **After**: 전환 완료 후 (End Color 유지)
 * 3. **Transitioning**: 전환 구간 (Start와 End 사이를 보간)
 * 
 * 이렇게 구간을 나누면(Clamping logic), 스크롤을 아주 빠르게 내리거나 올릴 때
 * 색상이 이상하게 튀는 현상을 막을 수 있습니다.
 */
export const calculateGradientColors = (
    progress: number,
    heroColors: GradientColors,
    statsColors: GradientColors,
    transitionStart: number,
    transitionEnd: number
): { color1: string; color2: string } => {
    let color1: RGBColor
    let color2: RGBColor

    // 1. [Before] 전환 구역 진입 전 -> 히어로 테마 유지
    if (progress < transitionStart) {
        color1 = heroColors.START
        color2 = heroColors.END
    }
    // 2. [After] 전환 구역 통과 후 -> 통계 테마 유지
    else if (progress > transitionEnd) {
        color1 = statsColors.START
        color2 = statsColors.END
    }
    // 3. [During] 전환 구역 내부 -> LERP 수행
    else {
        // 지역 진행률(Local Progress) 정규화 (Normalization)
        // 전체 스크롤(0~1) 중, 전환 구간(Start~End) 내에서만 0~1로 다시 매핑합니다.
        // 예: 전체 0.5이고 구간이 0.4~0.6이면 -> (0.5 - 0.4) / (0.6 - 0.4) = 0.5 (딱 중간)
        const transitionProgress = (progress - transitionStart) / (transitionEnd - transitionStart)

        // 두 테마의 시작색끼리, 끝색끼리 각각 섞습니다.
        color1 = interpolateColor(heroColors.START, statsColors.START, transitionProgress)
        color2 = interpolateColor(heroColors.END, statsColors.END, transitionProgress)
    }

    return {
        color1: rgbToString(color1),
        color2: rgbToString(color2),
    }
}
