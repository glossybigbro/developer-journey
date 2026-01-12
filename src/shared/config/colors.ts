/**
 * 🎨 [CONFIG] Color Constants (색상 설정값)
 * 
 * @layer shared/config
 * @description
 * 애플리케이션 전체에서 사용하는 색상을 중앙 관리합니다.
 * 하드코딩된 색상 값(#60a5fa 등)을 제거하고 의미있는 이름으로 관리합니다.
 * 
 * 🏗️ 디자인 패턴: [Single Source of Truth]
 * - 색상 변경 시 이 파일만 수정하면 프로젝트 전체에 반영됩니다.
 * - 디자인 시스템과의 일관성을 유지합니다.
 */

/**
 * 📊 통계 카드 색상
 * StatsShowcase 컴포넌트에서 사용하는 색상 팔레트
 */
export const STATS_COLORS = {
    // Yellow (노란색) - Commits
    YELLOW: {
        primary: 'var(--accent-yellow)',
        glow: 'radial-gradient(circle at 50% 50%, rgba(255, 217, 61, 0.15), transparent 70%)'
    },

    // Blue (파란색) - Pull Requests
    BLUE: {
        primary: '#60a5fa', // Tailwind blue-400
        glow: 'radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.15), transparent 70%)'
    },

    // Purple (보라색) - Repositories
    PURPLE: {
        primary: '#a78bfa', // Tailwind purple-400
        glow: 'radial-gradient(circle at 50% 50%, rgba(167, 139, 250, 0.15), transparent 70%)'
    }
} as const

/**
 * 🌈 타입 헬퍼
 * TypeScript에서 색상 키를 타입으로 사용할 수 있게 합니다.
 */
export type StatsColorKey = keyof typeof STATS_COLORS
