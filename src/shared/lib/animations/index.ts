/**
 * 🎬 [SHARED LIB] Animation Utilities - Public API
 * 
 * @layer shared/lib/animations
 * @description
 * 애니메이션 관련 유틸리티 함수들의 공개 인터페이스(Public API)를 정의하는 Barrel Export 파일입니다.
 * 
 * 🏗️ 디자인 패턴: [Barrel Export Pattern]
 * - **목적**: 여러 애니메이션 모듈(confetti, gradient, scroll)을 하나의 진입점으로 통합
 * - **효과**: `import { fireConfettiEffect, calculateGradientColors } from '@/shared/lib/animations'`처럼 간결하게 사용
 * 
 * 📦 **Export 목록**:
 * - `confetti.ts`: 폭죽 효과 관련 함수 (fireConfettiEffect, randomInRange, shouldShowConfetti)
 * - `gradient.ts`: 그라데이션 색상 계산 함수 (interpolateColor, rgbToString, calculateGradientColors)
 * - `scroll.ts`: 스크롤 유틸리티 함수 (getScrollProgress, shouldShowConfetti 등)
 * 
 * 💡 **Wildcard Export (`export *`)란?**
 * `export * from './module'`은 해당 모듈의 모든 named export를 재export합니다.
 * 
 * **장점:**
 * - 새로운 함수를 추가해도 이 파일을 수정할 필요 없음
 * - 모든 함수를 자동으로 export
 * 
 * **단점:**
 * - 어떤 함수가 export되는지 명시적이지 않음
 * - 이름 충돌 가능성 (여러 모듈에서 같은 이름 export 시)
 * 
 * 🎓 [학습 목표]:
 * 1. **Wildcard Re-export**: `export *` 구문의 동작 방식 이해
 * 2. **Module Organization**: 관련 함수들을 파일별로 분리하고 index에서 통합하는 패턴
 * 3. **Import Path Simplification**: 긴 경로를 짧게 만들어 DX 향상
 * 
 * @example
 * ```typescript
 * // Before (Barrel 없이)
 * import { fireConfettiEffect } from '@/shared/lib/animations/confetti'
 * import { calculateGradientColors } from '@/shared/lib/animations/gradient'
 * 
 * // After (Barrel 사용)
 * import { fireConfettiEffect, calculateGradientColors } from '@/shared/lib/animations'
 * ```
 */

// [Wildcard Export] confetti.ts의 모든 named export를 재export
// fireConfettiEffect, randomInRange, shouldShowConfetti 등
export * from './confetti'

// [Wildcard Export] gradient.ts의 모든 named export를 재export
// interpolateColor, rgbToString, calculateGradientColors 등
export * from './gradient'

// [Wildcard Export] scroll.ts의 모든 named export를 재export
// getScrollProgress, shouldShowConfetti 등
export * from './scroll'
