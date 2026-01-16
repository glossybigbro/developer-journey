/**
 * 🌌 [WIDGET] Space Background - Public API
 * 
 * @layer shared/ui/SpaceBackground
 * @description
 * SpaceBackground 컴포넌트의 공개 인터페이스(Public API)를 정의하는 Barrel Export 파일입니다.
 * Canvas를 사용한 지브리 스타일의 우주 배경 애니메이션을 제공합니다.
 * 
 * 🏗️ FSD 아키텍처: [Shared Layer]
 * - **역할**: 페이지 전체 배경을 담당하는 재사용 가능한 UI 컴포넌트
 * - **위치**: shared/ui/ 디렉토리
 * - **사용처**: App 레이어(pages, layouts)에서 import하여 사용
 * 
 * 🎨 주요 기능:
 * - **3-Layer Stars**: 크기와 속도가 다른 별들로 깊이감 표현
 * - **Nebula Dust**: 대각선 띠 모양의 은하수 (800개 파티클)
 * - **Shooting Stars**: 랜덤하게 나타나는 유성 효과
 * - **Responsive**: 윈도우 리사이즈 시 자동 재조정
 * 
 * 🏗️ 디자인 패턴: [Barrel Export Pattern]
 * - **목적**: Widget의 내부 구조(ui/)를 숨기고 깔끔한 API 제공
 * - **효과**: `import { SpaceBackground } from '@/widgets/space-background'`로 간결하게 사용
 * 
 * 🎓 [학습 목표]:
 * 1. **Default Export Re-export**: `export { default as Name }` 패턴 이해
 * 2. **Canvas Animation Widget**: Canvas 기반 애니메이션을 위젯으로 캡슐화하는 법
 * 3. **Background Layer**: 배경 레이어를 독립적인 위젯으로 분리하는 아키텍처
 */

// [Default Export Re-export] ui/SpaceBackground.tsx의 default export를
// SpaceBackground라는 이름의 Named Export로 재export
export { default as SpaceBackground } from './SpaceBackground'
