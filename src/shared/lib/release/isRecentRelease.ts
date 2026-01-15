/**
 * 릴리즈 날짜 기반 최신 여부 확인 유틸리티
 * FSD: shared/lib/release
 */

/**
 * 주어진 날짜가 최근 릴리즈인지 확인
 * @param releaseDate - 릴리즈 날짜 (YYYY-MM-DD 형식)
 * @param daysThreshold - 최신으로 간주할 기간 (기본: 7일)
 * @returns 최근 릴리즈 여부
 */
export function isRecentRelease(releaseDate: string, daysThreshold: number = 7): boolean {
    if (!releaseDate) return false

    const releaseTime = new Date(releaseDate).getTime()
    const currentTime = new Date().getTime()
    const thresholdMs = daysThreshold * 24 * 60 * 60 * 1000

    return (currentTime - releaseTime) < thresholdMs
}
