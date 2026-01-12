/**
 * 🛠️ [LIB] Data Formatting (데이터 포맷팅)
 * 
 * @layer shared/lib
 * @description
 * Raw Data(숫자, 날짜 ISO 문자열 등)를 사람이 읽기 쉬운(Human Readable) 형태의 문자열로 변환합니다.
 * UI 컴포넌트 내부에서 변환 로직을 직접 짜지 않고, 이곳의 순수 함수를 재사용합니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Pure Functions (순수 함수)**:
 *    입력값(인자)이 같으면 언제나 똑같은 결과가 나오는 함수입니다.
 *    외부 상태(DB, 네트워크, 전역변수)에 의존하지 않으므로 **테스트하기 쉽고 버그가 적습니다**.
 * 
 * 2. **Localization (i18n)**:
 *    `date-fns/locale/ko`를 사용하여 날짜를 '한국식'으로 표기합니다.
 *    글로벌 서비스로 확장하려면 이 `locale` 값만 동적으로 교체하면 됩니다.
 */

import { format } from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * 🔢 숫자 축약 (K/M Suffix)
 * 
 * @description
 * '1,500' -> '1.5K', '1,200,000' -> '1.2M' 형태로 변환합니다.
 * 공간이 좁은 UI(통계 카드, 모바일 화면)에서 유용하게 쓰이는 패턴입니다.
 * 
 * @param num 변환할 숫자
 * @returns 축약된 문자열 (string)
 */
export function formatNumber(num: number): string {
  // 100만(Million) 이상인 경우
  // toFixed(1): 소수점 첫째 자리까지만 표시하여 깔끔하게 만듭니다.
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  // 1000(Thousand) 이상인 경우
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  // 그 외 작은 숫자는 그대로 문자열로 변환
  return num.toString()
}

/**
 * 📅 날짜 포맷팅 (Korean Date)
 * 
 * @description
 * `date-fns` 라이브러리를 사용해 복잡한 날짜 연산을 처리합니다.
 * 기본값으로 'yyyy년 MM월 dd일' 형식을 제공합니다.
 * 
 * @param date Date 객체이거나 ISO 문자열("2024-01-01")
 * @param formatStr 출력할 포맷 패턴 (Optional)
 */
export function formatDate(
  date: Date | string,
  formatStr: string = 'yyyy년 MM월 dd일'
): string {
  // 방어 코드: 문자열로 들어오면 Date 객체로 변환 (Hydration Error 방지)
  const dateObj = typeof date === 'string' ? new Date(date) : date

  // ko 로케일을 주입하여 한국어 요일/월이 나오도록 설정
  return format(dateObj, formatStr, { locale: ko })
}

/**
 * 💯 퍼센트 포맷팅
 * 
 * @description
 * 소수점이 지저분하게 길어지는 것을 방지하기 위해 `toFixed`를 사용합니다.
 * 
 * @param value 0~100 사이의 실수
 * @param decimals 표시할 소수점 자릿수 (기본값 1)
 */
export function formatPercent(value: number, decimals: number = 1): string {
  return value.toFixed(decimals) + '%'
}
