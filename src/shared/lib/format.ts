/**
 * 포맷팅 유틸리티 함수들
 * 
 * 목적: 숫자, 날짜 등을 사용자 친화적인 형식으로 변환
 */

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * 큰 숫자를 K, M 단위로 축약
 * 
 * @param num - 변환할 숫자
 * @returns 축약된 문자열 (예: 1500 → "1.5K", 1000000 → "1M")
 * 
 * 사용 예시:
 * formatNumber(1234) → "1.2K"
 * formatNumber(1234567) → "1.2M"
 */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

/**
 * 날짜를 한국어 형식으로 포맷
 * 
 * @param date - Date 객체 또는 날짜 문자열
 * @param formatStr - 포맷 문자열 (기본: 'yyyy년 MM월 dd일')
 * @returns 포맷된 날짜 문자열
 * 
 * 사용 예시:
 * formatDate(new Date()) → "2024년 01월 07일"
 * formatDate(new Date(), 'yyyy.MM.dd') → "2024.01.07"
 */
export function formatDate(
  date: Date | string,
  formatStr: string = 'yyyy년 MM월 dd일'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return format(dateObj, formatStr, { locale: ko })
}

/**
 * 퍼센트 값을 포맷
 * 
 * @param value - 0~100 사이의 숫자
 * @param decimals - 소수점 자릿수 (기본: 1)
 * @returns 퍼센트 문자열 (예: "68.5%")
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return value.toFixed(decimals) + '%'
}
