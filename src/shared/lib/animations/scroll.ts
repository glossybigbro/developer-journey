/**
 * 📜 [LIB] Scroll Physics (스크롤 계산)
 * 
 * @layer shared/lib/animations
 * @description
 * 스크롤 이벤트(`window.scrollY`)를 받아 특정 UI의 가시성을 판단하거나(Boolean),
 * 진행률(0.0~1.0)로 변환(Normalize)하는 순수 함수 모음입니다.
 * 
 * 🏗️ 디자인 패턴: [Threshold Pattern]
 * 복잡한 `if (scrollY > 150 && scrollY < 300)` 같은 로직을
 * `shouldShowConfetti` 같은 의미있는 함수명으로 추상화합니다.
 * 코드를 읽는 사람은 숫자 150이 뭔지 알 필요 없이, 함수 이름만 보고 의도를 파악할 수 있습니다.
 */

import { SCROLL_THRESHOLDS } from '../../config/animations'

/**
 * 🎉 폭죽 표시 여부 판단
 * 
 * @description
 * 사용자가 페이지 최상단(Hero Section)에 머물 때만 폭죽을 터트립니다.
 * 스크롤을 내려서 콘텐츠를 읽기 시작하면 방해되지 않도록 멈춥니다.
 * 
 * @param scrollY 현재 세로 스크롤 위치 (px)
 */
export const shouldShowConfetti = (scrollY: number): boolean => {
    // threshold: CONFETTI_STOP (150px)
    return scrollY < SCROLL_THRESHOLDS.CONFETTI_STOP
}

/**
 * 👻 히어로 섹션 페이드아웃 판단
 * 
 * @description
 * 히어로 섹션이 스크롤에 따라 점점 투명해지다가, 완전히 사라졌는지(투명도 0) 확인합니다.
 * 완전히 사라졌다면 렌더링을 중단하거나 DOM에서 제거하여 **성능을 최적화**할 수 있습니다.
 */
export const isHeroVisible = (scrollY: number): boolean => {
    return scrollY < SCROLL_THRESHOLDS.HERO_FADE_END
}

/**
 * 📏 스크롤 진행률 정규화 (Normalization)
 * 
 * @description
 * 스크롤 값을 0.0 ~ 1.0 사이의 비율로 변환합니다.
 * 이 값은 `opacity`, `scale`, `x/y position` 등 다양한 CSS 속성을 비례적으로 조절할 때 사용됩니다.
 * 
 * @param scrollY 현재 스크롤 위치
 * @param maxScroll 진행률이 100%(1.0)가 되는 목표 스크롤 위치
 */
export const getScrollProgress = (scrollY: number, maxScroll: number): number => {
    // Math.min(..., 1): 스크롤이 목표치를 넘어가도 결과값은 1.0을 초과하지 않도록 제한(Clamping)합니다.
    // 방어적 코딩(Defensive Coding)의 일종입니다.
    return Math.min(scrollY / maxScroll, 1)
}
