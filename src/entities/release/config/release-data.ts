/**
 * Release Notice 관련 상수 및 설정
 * FSD: entities/release/config
 */

import type { ReleaseNote } from '../model/types'

/**
 * 릴리즈 노트 데이터
 * 새로운 기능이 추가될 때마다 여기에 항목을 추가하세요.
 */
export const RELEASE_NOTES: ReleaseNote[] = [
    {
        title: 'PEAK ACTIVITY',
        desc: 'Discover your coding chronotype! New "Peak Activity" section with 5 visualizations including Git Graph and Terminal style.',
        date: '2026-01-19'
    },
    {
        title: 'CUSTOMIZE YOUR BIO',
        desc: 'Make your intro pop! You can now easily change heading sizes and add bullet points to tell your story.',
        date: '2026-01-16'
    },
    {
        title: 'STYLIZE YOUR GRAPH',
        desc: 'Your contributions, your style. Pick custom themes, adjust rounded corners, and choose how many days to show.',
        date: '2026-01-16'
    },
]

/**
 * 릴리즈 알림 표시 기간 (일)
 */
export const RELEASE_NOTIFICATION_DAYS = 7
