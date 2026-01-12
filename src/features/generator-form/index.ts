/**
 * 📝 [PUBLIC API] Generator Form (프로필 생성 폼)
 * 
 * @layer features/generator-form
 * @description
 * generator-form feature의 Public API입니다.
 * Barrel Export 패턴을 사용하여 내부 구조를 숨기고 깔끔한 인터페이스를 제공합니다.
 * 
 * 🏗️ FSD 아키텍처: [Feature Layer]
 * - **역할**: GitHub Username 입력 및 섹션 선택 기능
 * - **위치**: features/ 디렉토리
 * - **사용처**: widgets 레이어(GeneratorHero)에서 import
 * 
 * 🏗️ 디자인 패턴: [Barrel Export Pattern]
 * - **목적**: Feature의 내부 구조(ui/)를 숨기고 깔끔한 API 제공
 * - **효과**: `import { GeneratorForm } from '@/features/generator-form'`로 간결하게 사용
 * 
 * 🎓 [학습 목표]:
 * 1. **Barrel Export**: 여러 모듈을 하나의 진입점으로 통합
 * 2. **Public API Design**: 외부에 노출할 것과 숨길 것을 명확히 구분
 * 3. **FSD Feature Layer**: Feature의 역할과 책임 범위 이해
 * 
 * @example
 * ```tsx
 * // Widget 레이어에서 사용
 * import { GeneratorForm } from '@/features/generator-form'
 * 
 * export default function GeneratorHero() {
 *   return (
 *     <div>
 *       <h1>GitHub Profile Generator</h1>
 *       <GeneratorForm />
 *     </div>
 *   )
 * }
 * ```
 */

// ==========================================
// [UI Component Export] UI 컴포넌트 내보내기
// ==========================================
// 
// default export를 Named Export로 재export
// 외부에서는 `import { GeneratorForm }`로 사용 가능

export { default as GeneratorForm } from './ui/GeneratorForm'
