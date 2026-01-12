/**
 * 📘 [TYPE] Wrapped Domain Model
 * 
 * @layer shared/types
 * @description
 * "Wrapped: 2024 Developer Journey" 기능의 핵심 데이터 구조(Schema)를 정의합니다.
 * 백엔드(또는 GitHub API)에서 받아온 Raw Data를 클라이언트 UI가 소비하기 편한 형태로 정제(Normalize)한 결과입니다.
 * 
 * 🏗️ 설계 원칙: [Ubiquitous Language]
 * 기획자, 디자이너, 개발자가 공통으로 사용하는 용어(Ubiquitous Language)를 타입명으로 채택하여
 * 소통 비용을 줄입니다. (e.g. `User` -> `UserInfo`, `Stats` -> `WrappedData`)
 * 
 * 🎓 [학습 목표]:
 * 1. **Interface Composition**: 작은 인터페이스(`UserInfo`, `LanguageStats`)를 조립하여 큰 인터페이스(`WrappedData`)를 만드는 법
 * 2. **Semantics**: `number` 타입 변수명에 단위나 의미(`bytes`, `count`)를 포함시켜 가독성을 높이는 법
 */

/* 
 * 👤 기본 사용자 프로필 정보 
 * GitHub API의 User 객체에서 UI에 필요한 필드만 추출(Pick)했습니다.
 */
export interface UserInfo {
    username: string  // 고유 ID (login)
    name: string      // 표시 이름 (displayName)
    avatar: string    // 프로필 이미지 URL
    bio?: string      // 자기소개 (Optional)
    createdAt?: string // 계정 생성일
    followers?: number
    following?: number
}

/* 
 * 📁 리포지토리 메타데이터
 */
export interface Repository {
    name: string
    description: string
    stars: number       // 인기도 척도
    url: string         // 링크
    language: string    // 주 사용 언어
}

/* 
 * 📊 언어 통계
 */
export interface LanguageStats {
    name: string        // 언어명 (TypeScript)
    percentage: number  // 사용 비율 (0~100)
    color: string       // 시각화용 색상 코드
}

/* 
 * 📅 활동 데이터 (Calendar Heatmap용)
 */
export interface ActivityDay {
    date: string        // YYYY-MM-DD
    count: number       // 기여 횟수
    level: 0 | 1 | 2 | 3 | 4 // 히트맵 색상 단계 (0: 없음 ~ 4: 많음)
}

/* 
 * 🤝 협업 지표 (Collaboration Stats)
 */
export interface PRIssueStats {
    totalPRs: number    // 생성한 Pull Request 총합
    mergedPRs: number   // 머지된 PR (실제 기여 성공률 지표)
    totalIssues: number // 생성한 이슈 수
    closedIssues: number// 해결된(닫힌) 이슈 수
}

/**
 * 🎁 [ROOT] Wrapped Data Facade
 * 
 * 이 인터페이스는 `api/wrapped.ts`가 반환하는 최종 데이터 구조입니다.
 * 컴포넌트는 오직 이 타입만 알면 되며, 내부적으로 GitHub API를 썼는지 Mock을 썼는지 알 필요가 없습니다.
 */
export interface WrappedData {
    year: number          // 대상 연도

    // 1. 사용자 Identity
    username: string
    displayName: string
    avatarUrl: string
    yearsOnGithub: number

    // 2. 핵심 정량 지표 (Hero/Stats 섹션용)
    commits: number
    pullRequests: number // aka PRs
    repositories: number

    // 3. 파생된/계산된 지표 (Fun Fact용)
    activeDays: number    // 1년 중 코딩한 날짜 수
    estimatedHours: number // 추산 코딩 시간

    // 4. 상세 분석 데이터 (차트용)
    // Optional로 두어 데이터가 부족할 때도 UI가 깨지지 않게 합니다.
    topLanguages?: LanguageStats[]
    monthlyActivity?: ActivityDay[] // ActivityDay[] 대신 직접 정의된 것을 쓸 수도 있음. CommitActivity?

    /* 
     * ----------------------------------------------------------------
     * 3. Activity Patterns: 언제 코딩하는가?
     * ---------------------------------------------------------------- */
    commitsByMonth?: any[]    // 월별 추이 (라인 차트용) - FIXME: Use proper type
    contributionHeatmap?: ActivityDay[] // 잔디 심기 데이터 (일자별)
    longestStreak?: number               // 최장 연속 코딩 일수 (성실성 지표)
    currentStreak?: number               // 현재 진행 중인 연속 일수
    peakTime?: string                    // 주로 활동하는 시간대 (예: "Night", "Morning")
    weekendVsWeekday?: {                 // 주말 vs 평일 코딩 비율
        weekend: number
        weekday: number
    }

    /* 
     * ----------------------------------------------------------------
     * 4. Project Highlights: 대표 프로젝트
     * ---------------------------------------------------------------- */
    topRepositories?: Repository[] // 스타/활성도 기준 Top N 프로젝트
    totalStars?: number            // 받은 스타 총합
    totalForks?: number            // 내 코드가 복제된 횟수
    totalWatchers?: number         // 내 코드를 구독하는 사람 수

    /* 
     * ----------------------------------------------------------------
     * 5. Community & Impact: 오픈소스 영향력
     * ---------------------------------------------------------------- */
    prIssueStats?: PRIssueStats    // PR/이슈 상세 통계
    codeReviews?: number           // 코드 리뷰 수행 횟수
    collaborators?: number         // 함께 작업한 개발자 수
    organizations?: string[]       // 소속된 GitHub 조직 목록
    followersGrowth?: number       // 팔로워 증가량 (+N명)

    /* 
     * ----------------------------------------------------------------
     * 6. Special Moments: 의미 있는 기록들
     * ---------------------------------------------------------------- */
    firstCommitDate?: string       // 그 해의 첫 커밋 (시작일)
    mostActiveDay?: string         // 가장 커밋을 많이 한 날 (하드코딩된 날)
    longestGap?: number            // 코딩을 가장 오래 쉰 기간 (휴식 기간)
    busiestMonth?: string          // 가장 활동이 많았던 달
    avgCommitSize?: number         // 평균 커밋 크기 (라인 수 등)

    /* 
     * ----------------------------------------------------------------
     * 7. Fun Facts & Gamification: 재미 요소
     * ---------------------------------------------------------------- */
    favoriteDay?: string           // 가장 좋아하는 요일
    nightOwlScore?: number         // 밤샘 코딩 지수 (0~100)
    productivityScore?: number     // 종합 생산성 점수
}
