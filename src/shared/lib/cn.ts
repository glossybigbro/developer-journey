/**
 * cn (classnames) 유틸리티 함수
 * 
 * 목적: 여러 CSS 클래스를 조건부로 결합하는 헬퍼 함수
 * 
 * 사용 예시:
 * cn('base-class', isActive && 'active-class', 'another-class')
 * → 'base-class active-class another-class' (isActive가 true일 때)
 * 
 * clsx: 조건부 클래스를 쉽게 처리하는 라이브러리
 */

import { clsx, type ClassValue } from 'clsx'

/**
 * 여러 클래스 값들을 하나의 문자열로 결합
 * @param inputs - 클래스 이름들 (문자열, 객체, 배열 등)
 * @returns 결합된 클래스 문자열
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
