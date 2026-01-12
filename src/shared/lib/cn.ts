/**
 * 🛠️ [LIB] cn (Classname Helper)
 * 
 * @layer shared/lib
 * @description
 * 조건부로 클래스 이름을 결합(merge)하는 유틸리티 함수입니다.
 * Tailwind CSS나 CSS Modules를 사용할 때 동적으로 스타일을 적용하기 위해 필수적입니다.
 * 
 * 🏗️ 디자인 패턴: [Adapter / Wrapper]
 * `clsx`라는 외부 라이브러리를 직접 컴포넌트에서 import하지 않고,
 * 이 `cn` 함수로 감싸서(Wrapping) 사용함으로써 의존성을 격리합니다.
 * 추후 `tailwind-merge` 등을 도입할 때 이 파일만 수정하면 됩니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Utility Utility**: 불필요한 중복 코드를 줄이고 가독성을 높이는 헬퍼 함수 작성법
 * 2. **Rest Parameters**: `...inputs` 문법을 사용하여 가변 인자(Variadic Arguments)를 처리하는 법
 */

import { clsx, type ClassValue } from 'clsx'
// import { twMerge } from 'tailwind-merge' 

/**
 * 🧹 Classname Combiner
 * 
 * @param inputs - 결합할 클래스 값들 (문자열, 객체, 배열 등)
 * @returns 공백으로 구분된 하나의 클래스 문자열
 * 
 * @example
 * cn('p-4', isMobile && 'text-sm', 'bg-white')
 * // isMobile이 true면: "p-4 text-sm bg-white"
 * // isMobile이 false면: "p-4 bg-white"
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
  // return twMerge(clsx(inputs)) // Tailwind CSS 충돌(e.g. p-4 p-8) 해결 시 권장
}
