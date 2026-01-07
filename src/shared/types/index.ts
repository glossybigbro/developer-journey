/**
 * 공유 타입 정의
 * 
 * 목적: 프로젝트 전체에서 사용하는 TypeScript 타입들을 정의
 * TypeScript는 코드 작성 시 타입 에러를 미리 잡아줍니다
 */

/**
 * GitHub 커밋 데이터 타입
 */
export interface Commit {
  date: string          // ISO 날짜 문자열 (예: "2024-01-07T12:00:00Z")
  count: number         // 해당 날짜의 커밋 수
  message?: string      // 커밋 메시지 (선택사항)
}

/**
 * GitHub 저장소 정보 타입
 */
export interface Repository {
  name: string          // 저장소 이름
  description: string   // 저장소 설명
  language: string      // 주 사용 언어
  stars: number         // 스타 수
  url: string          // 저장소 URL
  createdAt: string    // 생성 날짜
  thumbnail?: string   // 썸네일 이미지 경로 (선택사항)
}

/**
 * 프로그래밍 언어 통계 타입
 */
export interface LanguageStats {
  language: string      // 언어 이름 (예: "TypeScript")
  percentage: number    // 사용 비율 (0-100)
  linesOfCode: number  // 코드 라인 수
  files: number        // 파일 수
  color: string        // 언어 대표 색상 (예: "#3178c6")
}

/**
 * 월별 커밋 데이터 타입
 */
export interface MonthlyCommit {
  month: string        // 월 이름 (예: "Jan", "Feb")
  count: number        // 해당 월의 커밋 수
}

/**
 * 업적/배지 타입
 */
export interface Achievement {
  id: string                                          // 고유 ID
  title: string                                       // 업적 제목
  description: string                                 // 업적 설명
  icon: string                                        // 아이콘 (이모지 또는 이미지 경로)
  rarity: 'common' | 'rare' | 'epic' | 'legendary'   // 희귀도
  unlockedAt: string                                  // 획득 날짜
}

/**
 * AI 인사이트 타입
 */
export interface Insight {
  type: 'pattern' | 'prediction' | 'recommendation'  // 인사이트 유형
  message: string                                     // 인사이트 메시지
  icon: string                                        // 아이콘
}

/**
 * Wrapped 대시보드 전체 데이터 타입
 * 
 * 이 타입은 Wrapped 페이지에서 보여줄 모든 데이터를 포함합니다
 */
export interface WrappedData {
  year: number                    // 연도 (예: 2024)
  
  // 사용자 정보
  user: {
    username: string              // GitHub 사용자명
    name: string                  // 실명
    avatar: string                // 프로필 이미지 URL
  }
  
  // 전체 통계
  stats: {
    totalCommits: number          // 총 커밋 수
    totalHours: number            // 총 코딩 시간
    totalStars: number            // 받은 스타 총합
    totalRepos: number            // 저장소 수
    longestStreak: number         // 최장 연속 커밋 일수
    currentStreak: number         // 현재 연속 커밋 일수
  }
  
  // 가장 많이 쓴 언어
  language: LanguageStats
  
  // 월별 커밋 데이터
  monthlyCommits: MonthlyCommit[]
  
  // 상위 프로젝트
  topProjects: Repository[]
  
  // 획득한 업적
  achievements: Achievement[]
  
  // AI 인사이트
  insights: Insight[]
}

/**
 * 타임라인 노드 타입
 */
export interface TimelineNode {
  id: string                                                    // 고유 ID
  date: string                                                  // 날짜
  type: 'milestone' | 'project' | 'achievement' | 'learning' | 'bugfix'  // 노드 유형
  title: string                                                 // 제목
  description: string                                           // 설명
  techStack: string[]                                          // 사용 기술 스택
  
  // 3D 공간에서의 위치 (Three.js용)
  position: {
    x: number
    y: number
    z: number
  }
  
  // 추가 메타데이터
  metadata: {
    commits?: number        // 커밋 수
    stars?: number          // 스타 수
    contributors?: number   // 기여자 수
    screenshot?: string     // 스크린샷 경로
    repository?: string     // 저장소 URL
  }
}
