/**
 * 📋 [MODEL] Sections (섹션 데이터 모델)
 * 
 * @layer features/section-selector/model
 * @description
 * GitHub Wrapped 프로필에 포함될 수 있는 32개 섹션의 데이터 정의와 관리 로직입니다.
 * Spotify Wrapped처럼 7개의 "ACT"로 그룹화하여 스토리텔링 형식으로 구성됩니다.
 * 
 * 🏗️ 데이터 구조:
 * - **7개 ACT**: Welcome, Languages, Activity, Projects, Collaboration, Special Moments, Celebration
 * - **32개 Section**: 각 ACT에 속한 개별 통계 항목들
 * - **기본 선택**: 사용자 경험을 위해 일부 섹션은 기본으로 선택됨
 * 
 * 🎓 [학습 목표]:
 * 1. **TypeScript Interface**: 타입 안정성을 위한 데이터 구조 정의
 * 2. **Data Modeling**: 계층적 데이터 구조 설계 (ACT > Section)
 * 3. **Helper Functions**: 데이터 필터링 및 변환 유틸리티
 * 4. **FSD Model Layer**: 비즈니스 로직과 데이터를 UI와 분리
 */

// ==========================================
// [TypeScript Types] 데이터 타입 정의
// ==========================================

/**
 * 📝 Section 인터페이스
 * 
 * GitHub Wrapped에 표시될 수 있는 개별 통계 섹션을 정의합니다.
 * 
 * @property id - 고유 식별자 (1-32)
 * @property name - 섹션 이름 (영문, 사용자에게 표시)
 * @property description - 섹션 설명 (한글, 추가 정보)
 * @property act - 소속 ACT 번호 (1-7)
 * @property defaultSelected - 기본 선택 여부 (true면 체크박스가 기본으로 선택됨)
 */
export interface Section {
    id: number
    name: string
    description: string
    act: number
    defaultSelected: boolean
}

/**
 * 📝 Act 인터페이스
 * 
 * 여러 섹션을 그룹화하는 상위 카테고리입니다.
 * Spotify Wrapped의 스토리텔링 방식을 차용하여 7개의 챕터로 구성됩니다.
 * 
 * @property id - ACT 번호 (1-7)
 * @property name - ACT 이름 (영문)
 * @property emoji - 시각적 구분을 위한 이모지
 */
export interface Act {
    id: number
    name: string
    emoji: string
}

// ==========================================
// [Data] ACT 정의 (7개 챕터)
// ==========================================
// 
// 🎯 목적: GitHub 활동을 7개의 스토리로 나누어 표현
// 
// 🎭 ACT 구성:
// 1. Welcome - 전체 개요 및 환영 메시지
// 2. Languages - 사용한 프로그래밍 언어 통계
// 3. Activity - 커밋, 기여도 등 활동 패턴
// 4. Projects - 레포지토리 및 프로젝트 성과
// 5. Collaboration - 협업 및 커뮤니티 활동
// 6. Special Moments - 특별한 순간들 (첫 커밋, 최고 기록 등)
// 7. Celebration - 마무리 및 축하 메시지

export const ACTS: Act[] = [
    { id: 1, name: "Welcome", emoji: "🎉" },
    { id: 2, name: "Languages", emoji: "💻" },
    { id: 3, name: "Activity", emoji: "📊" },
    { id: 4, name: "Projects", emoji: "🌟" },
    { id: 5, name: "Collaboration", emoji: "🤝" },
    { id: 6, name: "Special Moments", emoji: "🎊" },
    { id: 7, name: "Celebration", emoji: "🎉" },
]

// ==========================================
// [Data] 섹션 정의 (32개 통계 항목)
// ==========================================
// 
// 🎯 목적: 사용자가 선택할 수 있는 모든 통계 항목 정의
// 
// 📊 섹션 분포:
// - ACT 1: 5개 (기본 정보)
// - ACT 2: 4개 (언어 통계)
// - ACT 3: 5개 (활동 패턴)
// - ACT 4: 5개 (프로젝트 성과)
// - ACT 5: 5개 (협업 활동)
// - ACT 6: 5개 (특별한 순간)
// - ACT 7: 3개 (마무리)
// 
// 💡 defaultSelected 전략:
// - 각 ACT에서 가장 중요한 1-2개 섹션만 기본 선택
// - 너무 많으면 압도적이고, 너무 적으면 밋밋함
// - 현재 총 7개 섹션이 기본 선택됨

export const SECTIONS: Section[] = [
    // ==========================================
    // ACT 1: Welcome (5개)
    // ==========================================
    // 사용자를 환영하고 전체 개요를 보여주는 섹션들

    { id: 1, name: "Hero", description: "Your 2024 in Code", act: 1, defaultSelected: true },
    { id: 2, name: "Total Contributions", description: "전체 활동 수", act: 1, defaultSelected: true },
    { id: 3, name: "Total Commits", description: "총 커밋 수", act: 1, defaultSelected: true },
    { id: 4, name: "Total Repositories", description: "레포지토리 수", act: 1, defaultSelected: false },
    { id: 5, name: "Account Age", description: "GitHub 계정 나이", act: 1, defaultSelected: false },

    // ==========================================
    // ACT 2: Languages (4개)
    // ==========================================
    // 사용한 프로그래밍 언어 통계

    { id: 6, name: "Language Stats", description: "가장 많이 쓴 언어", act: 2, defaultSelected: true },
    { id: 7, name: "Language Diversity", description: "사용한 언어 개수", act: 2, defaultSelected: false },
    { id: 8, name: "New Languages", description: "올해 처음 사용한 언어", act: 2, defaultSelected: false },
    { id: 9, name: "Language Evolution", description: "연도별 언어 변화", act: 2, defaultSelected: false },

    // ==========================================
    // ACT 3: Activity (5개)
    // ==========================================
    // 커밋, 기여도 등 활동 패턴 분석

    { id: 10, name: "Commit Activity Chart", description: "월별 커밋", act: 3, defaultSelected: true },
    { id: 11, name: "Contribution Heatmap", description: "날짜별 활동", act: 3, defaultSelected: true },
    { id: 12, name: "Streak Tracker", description: "최장 연속 기록", act: 3, defaultSelected: false },
    { id: 13, name: "Peak Time", description: "가장 활발한 시간대", act: 3, defaultSelected: false },
    { id: 14, name: "Weekend vs Weekday", description: "주말/평일 활동 비교", act: 3, defaultSelected: false },

    // ==========================================
    // ACT 4: Projects (5개)
    // ==========================================
    // 레포지토리 및 프로젝트 성과

    { id: 15, name: "Top Repository", description: "가장 인기있는 repo", act: 4, defaultSelected: true },
    { id: 16, name: "Stars Collected", description: "받은 총 스타 수", act: 4, defaultSelected: false },
    { id: 17, name: "Stars Given", description: "내가 준 스타 수", act: 4, defaultSelected: false },
    { id: 18, name: "Forks Received", description: "받은 fork 수", act: 4, defaultSelected: false },
    { id: 19, name: "Watchers", description: "지켜보는 사람 수", act: 4, defaultSelected: false },

    // ==========================================
    // ACT 5: Collaboration (5개)
    // ==========================================
    // 협업 및 커뮤니티 활동

    { id: 20, name: "PR & Issues", description: "Pull Request & Issue 통계", act: 5, defaultSelected: false },
    { id: 21, name: "Code Reviews", description: "리뷰한/받은 수", act: 5, defaultSelected: false },
    { id: 22, name: "Collaborators", description: "함께 작업한 사람 수", act: 5, defaultSelected: false },
    { id: 23, name: "Organizations", description: "기여한 조직 목록", act: 5, defaultSelected: false },
    { id: 24, name: "Followers Growth", description: "팔로워 증가 추이", act: 5, defaultSelected: false },

    // ==========================================
    // ACT 6: Special Moments (5개)
    // ==========================================
    // 특별한 순간들과 기록들

    { id: 25, name: "First Commit", description: "올해 첫 커밋 날짜", act: 6, defaultSelected: false },
    { id: 26, name: "Most Active Day", description: "가장 바빴던 날", act: 6, defaultSelected: false },
    { id: 27, name: "Longest Gap", description: "가장 긴 휴식 기간", act: 6, defaultSelected: false },
    { id: 28, name: "Busiest Month", description: "가장 바빴던 달", act: 6, defaultSelected: false },
    { id: 29, name: "Commit Size", description: "평균 커밋 크기", act: 6, defaultSelected: false },

    // ==========================================
    // ACT 7: Celebration (3개)
    // ==========================================
    // 마무리 및 축하 메시지

    { id: 30, name: "Favorite Day", description: "가장 좋아하는 요일", act: 7, defaultSelected: false },
    { id: 31, name: "Night Owl Score", description: "밤샘 코딩 점수", act: 7, defaultSelected: false },
    { id: 32, name: "Productivity Score", description: "생산성 점수", act: 7, defaultSelected: false },
]

// ==========================================
// [Helper Functions] 데이터 조회 유틸리티
// ==========================================

/**
 * 🔧 getSectionsByAct
 * 
 * 특정 ACT에 속한 모든 섹션을 반환합니다.
 * 
 * @param actId - ACT 번호 (1-7)
 * @returns 해당 ACT에 속한 Section 배열
 * 
 * @example
 * const welcomeSections = getSectionsByAct(1)
 * // => [Hero, Total Contributions, Total Commits, ...]
 */
export function getSectionsByAct(actId: number): Section[] {
    return SECTIONS.filter(section => section.act === actId)
}

/**
 * 🔧 getDefaultSelectedIds
 * 
 * 기본으로 선택되어야 하는 섹션들의 ID 배열을 반환합니다.
 * SectionSelector 컴포넌트의 초기 상태로 사용됩니다.
 * 
 * @returns 기본 선택된 섹션 ID 배열
 * 
 * @example
 * const defaultIds = getDefaultSelectedIds()
 * // => [1, 2, 3, 6, 10, 11, 15]
 */
export function getDefaultSelectedIds(): number[] {
    return SECTIONS.filter(section => section.defaultSelected).map(section => section.id)
}
