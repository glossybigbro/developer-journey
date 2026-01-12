/**
 * 🎛️ [PUBLIC API] Section Selector (섹션 선택기)
 * 
 * @layer features/section-selector
 * @description
 * section-selector feature의 Public API입니다.
 * Barrel Export 패턴을 사용하여 내부 구조를 숨기고 깔끔한 인터페이스를 제공합니다.
 * 
 * 🏗️ FSD 아키텍처: [Feature Layer]
 * - **역할**: 독립적인 비즈니스 기능 단위
 * - **위치**: features/ 디렉토리
 * - **사용처**: widgets, pages 레이어에서 import
 * 
 * 🏗️ 디자인 패턴: [Barrel Export Pattern]
 * - **목적**: Feature의 내부 구조(ui/, model/)를 숨기고 깔끔한 API 제공
 * - **효과**: `import { SectionSelector } from '@/features/section-selector'`로 간결하게 사용
 * 
 * 🎓 [학습 목표]:
 * 1. **Barrel Export**: 여러 모듈을 하나의 진입점으로 통합
 * 2. **Public API Design**: 외부에 노출할 것과 숨길 것을 명확히 구분
 * 3. **FSD Feature Layer**: Feature의 역할과 책임 범위 이해
 * 
 * @example
 * ```tsx
 * // UI 컴포넌트 import
 * import { SectionSelector } from '@/features/section-selector'
 * 
 * // 데이터 모델 import
 * import { SECTIONS, ACTS } from '@/features/section-selector'
 * import type { Section, Act } from '@/features/section-selector'
 * 
 * // 사용
 * <SectionSelector onSelectionChange={handleChange} />
 * ```
 */

// ==========================================
// [UI Component Export] UI 컴포넌트 내보내기
// ==========================================
// 
// default export를 Named Export로 재export
// 외부에서는 `import { SectionSelector }`로 사용 가능

export { default as SectionSelector } from './ui/SectionSelector'

// ==========================================
// [Model Export] 데이터 모델 내보내기
// ==========================================
// 
// 섹션 데이터와 헬퍼 함수를 외부에 노출
// 다른 컴포넌트에서 섹션 정보를 참조할 때 사용

export { SECTIONS, ACTS, getSectionsByAct, getDefaultSelectedIds } from './model/sections'

// ==========================================
// [Type Export] TypeScript 타입 내보내기
// ==========================================
// 
// TypeScript 타입만 export (런타임에는 제거됨)
// 다른 컴포넌트에서 타입 체크에 사용

export type { Section, Act } from './model/sections'
