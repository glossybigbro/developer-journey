/**
 * 🔢 [SHARED UI] Counter Component - Public API
 * 
 * @layer shared/ui/Counter
 * @description
 * Counter 컴포넌트의 공개 인터페이스(Public API)를 정의하는 Barrel Export 파일입니다.
 * 
 * 🏗️ 디자인 패턴: [Barrel Export Pattern]
 * - **목적**: 모듈의 내부 구조를 숨기고, 깔끔한 import 경로를 제공합니다.
 * - **효과**: 다른 파일에서 `import { Counter } from '@/shared/ui/Counter'`처럼 간결하게 사용 가능
 * 
 * 💡 **Barrel Export란?**
 * 여러 파일에 흩어진 export들을 하나의 index 파일에서 재export하는 패턴입니다.
 * 
 * **Before (Barrel 없이):**
 * ```typescript
 * import { Counter } from '@/shared/ui/Counter/Counter'
 * import type { CounterProps } from '@/shared/ui/Counter/Counter'
 * ```
 * 
 * **After (Barrel 사용):**
 * ```typescript
 * import { Counter, type CounterProps } from '@/shared/ui/Counter'
 * ```
 * 
 * 🎓 [학습 목표]:
 * 1. **Module Encapsulation (모듈 캡슐화)**:
 *    내부 파일 구조(`Counter.tsx`)를 외부에 노출하지 않고,
 *    index.ts를 통해서만 접근하게 함으로써 나중에 내부 구조를 바꿔도
 *    외부 코드는 영향을 받지 않습니다.
 * 
 * 2. **Named Export vs Type Export**:
 *    - `export { Counter }`: 런타임 값(함수, 클래스 등)을 export
 *    - `export type { CounterProps }`: 타입만 export (컴파일 후 사라짐)
 * 
 * 3. **Import Path Simplification**:
 *    긴 경로를 짧게 만들어 개발자 경험(DX)을 향상시킵니다.
 * 
 * @example
 * ```tsx
 * // 다른 컴포넌트에서 사용
 * import { Counter, type CounterProps } from '@/shared/ui/Counter'
 * 
 * function MyComponent() {
 *   return <Counter value={100} duration={2} />
 * }
 * ```
 */

// [Named Export] Counter 컴포넌트 재export
// './Counter' 파일에서 export된 Counter 함수를 그대로 다시 export합니다.
export { Counter } from './Counter'

// [Type Export] CounterProps 타입 재export
// TypeScript 컴파일 후에는 사라지는 타입 정보입니다.
// 'export type'을 사용하면 명시적으로 "이것은 타입이다"라고 표시할 수 있습니다.
export type { CounterProps } from './Counter'
