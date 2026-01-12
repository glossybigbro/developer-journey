/**
 * 🛢️ [TYPE] Shared Types Index (Barrel File)
 * 
 * @layer shared/types
 * @description
 * `shared/types` 폴더 내부의 모든 타입 모듈을 한곳에서 export합니다.
 * 외부에서는 `import { ... } from '@/shared/types'` 형태로 깔끔하게 가져다 쓸 수 있습니다.
 * 
 * 🏗️ 디자인 패턴: [Barrel Pattern]
 * - 장점: 
 *   1. Import 경로가 단축됩니다. (e.g. `shared/types/wrapped` -> `shared/types`)
 *   2. 내부 구조가 바뀌더라도 외부 코드에 영향을 주지 않습니다 (Encapsulation).
 * - 단점:
 *   1. 모든 타입을 다 불러오므로 Tree Shaking이 제대로 안 될 경우 번들 사이즈가 커질 수 있습니다. 
 *      (하지만 Type only export는 런타임에 제거되므로 성능 영향이 거의 없습니다.)
 * 
 * 🎓 [학습 목표]:
 * 1. **Re-export**: `export * from '...'` 구문을 사용하여 모듈을 다시 내보내는 법
 */

export * from './wrapped'
export * from './animations'
