/**
 * 🖼️ [WIDGET] Wrapped Page Background - Public API
 * 
 * @layer widgets/wrapped-page-background
 * @description
 * Wrapped 페이지의 배경 위젯 컴포넌트를 export하는 Barrel Export 파일입니다.
 * 
 * 🏗️ FSD 아키텍처: [Widget Layer]
 * - **역할**: 페이지 레벨의 큰 UI 블록을 조립하는 레이어
 * - **위치**: Features와 Shared를 조합하여 더 큰 단위의 UI를 만듦
 * - **사용처**: App 레이어(pages, layouts)에서 import하여 사용
 * 
 * 🏗️ 디자인 패턴: [Barrel Export Pattern]
 * - **목적**: Widget의 내부 구조(ui/, lib/)를 숨기고 깔끔한 API 제공
 * - **효과**: `import { WrappedPageBackground } from '@/widgets/wrapped-page-background'`로 간결하게 사용
 * 
 * 💡 **Default Export vs Named Export**:
 * 
 * **파일 내부 (WrappedPageBackground.tsx):**
 * ```typescript
 * export default function WrappedPageBackground() { ... }
 * ```
 * 
 * **이 파일 (index.ts):**
 * ```typescript
 * export { default as WrappedPageBackground } from './ui/WrappedPageBackground'
 * ```
 * 
 * **의미:**
 * - `default`를 import하여 `WrappedPageBackground`라는 이름으로 재export
 * - 외부에서는 Named Export처럼 사용 가능
 * 
 * 🎓 [학습 목표]:
 * 1. **Default Export Re-export**: `export { default as Name }` 패턴 이해
 * 2. **FSD Widget Layer**: Widget의 역할과 책임 범위 이해
 * 3. **Module Encapsulation**: 내부 폴더 구조(ui/, lib/)를 외부에 노출하지 않는 법
 * 
 * @example
 * ```tsx
 * // App 레이어에서 사용 (app/wrapped/page.tsx)
 * import { WrappedPageBackground } from '@/widgets/wrapped-page-background'
 * 
 * export default function WrappedPage() {
 *   return (
 *     <WrappedPageBackground>
 *       <YourContent />
 *     </WrappedPageBackground>
 *   )
 * }
 * ```
 */

// [Default Export Re-export] ui/WrappedPageBackground.tsx의 default export를
// WrappedPageBackground라는 이름의 Named Export로 재export
export { default as WrappedPageBackground } from './ui/WrappedPageBackground'
