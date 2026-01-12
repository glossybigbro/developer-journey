/**
 * 🎯 [WIDGET] Generator Hero - Public API
 * 
 * @layer widgets/generator-hero
 * @description
 * GeneratorHero 위젯의 공개 인터페이스(Public API)를 정의하는 Barrel Export 파일입니다.
 * 
 * 🏗️ FSD 아키텍처: [Widget Layer]
 * - **역할**: Feature(GeneratorForm)를 조립하여 페이지 섹션 구성
 * - **위치**: widgets/ 디렉토리
 * - **사용처**: App 레이어(pages)에서 import하여 사용
 * 
 * 🏗️ 디자인 패턴: [Barrel Export Pattern]
 * - **목적**: Widget의 내부 구조(ui/)를 숨기고 깔끔한 API 제공
 * - **효과**: `import { GeneratorHero } from '@/widgets/generator-hero'`로 간결하게 사용
 * 
 * 🎓 [학습 목표]:
 * 1. **Default Export Re-export**: `export { default as Name }` 패턴 이해
 * 2. **FSD Widget Layer**: Widget의 역할과 책임 범위 이해
 * 3. **Module Encapsulation**: 내부 폴더 구조를 외부에 노출하지 않는 법
 * 
 * @example
 * ```tsx
 * // App 레이어에서 사용 (app/page.tsx)
 * import { GeneratorHero } from '@/widgets/generator-hero'
 * 
 * export default function HomePage() {
 *   return (
 *     <main>
 *       <GeneratorHero />
 *     </main>
 *   )
 * }
 * ```
 */

// [Default Export Re-export] ui/GeneratorHero.tsx의 default export를
// GeneratorHero라는 이름의 Named Export로 재export
export { default as GeneratorHero } from './ui/GeneratorHero'
