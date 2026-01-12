/**
 * 📘 [PAGE] 메인 페이지 (Home Page)
 * 
 * @file app/page.tsx
 * @description
 * 애플리케이션의 루트 페이지(`/`)입니다.
 * 2024년 개발자의 활동을 요약하여 보여주는 대시보드를 표시합니다.
 * Spotify Wrapped에서 영감을 받아, 스크롤 인터랙션이 풍부한 스토리텔링 방식으로 구성되었습니다.
 * 
 * 🏗️ FSD (Feature-Sliced Design) 아키텍처 관점:
 * 이 파일은 Next.js의 Page 계층('app/')에 속합니다.
 * Page 계층의 핵심 역할은 "조립(Composition)"입니다.
 * - `widgets`(배경), `features`(헤더, 통계) 등 하위 레이어의 블록들을 가져와 하나의 완성된 화면으로 조립합니다.
 * - 비즈니스 로직은 최소화하고, 주로 데이터 fetching과 레이아웃 구성에 집중합니다.
 * 
 * 📚 주요 학습 포인트:
 * 1. **TanStack Query (React Query)**: 서버 상태 관리와 비동기 데이터 fetching의 표준 패턴을 학습합니다.
 * 2. **Conditional Rendering**: 데이터 로딩 중, 에러 발생, 성공 시 각각 다른 UI를 보여주는 패턴입니다.
 * 3. **Component Composition**: 배경 컴포넌트(`WrappedPageBackground`) 안에 자식 요소(`children`)를 배치하는 합성 패턴입니다.
 */

'use client' // 이 페이지는 브라우저에서 실행되는 클라이언트 컴포넌트입니다. (hooks 사용 위해 필수)

// 📦 외부 라이브러리 및 타입
import { useQuery } from '@tanstack/react-query'
import type { WrappedData } from '../src/shared/types/wrapped'

// 📡 API 로직 (Shared Layer)
// 컴포넌트 내부에서 직접 fetch를 하지 않고, api 모듈로 분리하여 재사용성과 유지보수성을 높입니다.
import { getWrappedData } from '../src/shared/api/wrapped'

// 🧩 기능 블록 (Features Layer)
import WrappedHeader from '../src/features/wrapped-header/ui/WrappedHeader'
import StatsShowcase from '../src/features/stats-showcase/ui/StatsShowcase'

// 🖼️ 위젯 블록 (Widgets Layer)
import { WrappedPageBackground } from '../src/widgets/wrapped-page-background'

export default function Home() {
  /**
   * 🎣 Data Fetching Hook
   * 
   * TanStack Query의 `useQuery`를 사용하여 비동기 데이터를 선언적으로 관리합니다.
   * 
   * - `queryKey`: ['wrapped', 'dev-wizard']
   *   - 이 쿼리를 고유하게 식별하는 키입니다. 캐싱 처리의 기준이 됩니다.
   *   - 다른 컴포넌트에서 같은 키를 쓰면 데이터를 공유할 수 있습니다.
   * 
   * - `queryFn`: 실제 데이터를 가져오는 비동기 함수
   *   - Promise를 반환해야 합니다. (여기서는 getWrappedData가 Promise를 반환)
   * 
   * - 반환값 객체 분해 할당:
   *   - `data`: 성공적으로 받아온 데이터 (타입: WrappedData | undefined)
   *   - `isLoading`: 데이터를 처음 불러오는 중인지 여부 (Boolean)
   *   - `error`: 실패 시 에러 객체
   */
  const { data, isLoading, error } = useQuery<WrappedData>({
    queryKey: ['wrapped', 'dev-wizard'],
    queryFn: () => getWrappedData('dev-wizard') // FIXME: 실제로는 로그인한 유저 정보를 받아와야 함
  })

  // ⏳ [Loading State] 데이터 로딩 UI
  // 사용자에게 "기다려주세요"라는 피드백을 줍니다. 스켈레톤 UI를 사용하면 더 좋습니다.
  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: 'var(--text-secondary)' // globals.css에 정의된 변수 사용
      }}>
        Loading your journey...
      </div>
    )
  }

  // ⚠️ [Error State] 에러 처리 UI
  // 네트워크 오류나 데이터 파싱 실패 시 사용자에게 알립니다.
  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.5rem',
        color: '#ef4444' // Tailwind 'red-500'
      }}>
        Error loading data: {error.message}
      </div>
    )
  }

  // 🚫 [Null State] 예상치 못한 데이터 부재
  if (!data) {
    return null
  }

  return (
    // 🧱 Layout Composition (레이아웃 합성)
    // WrappedPageBackground는 페이지 전체의 배경(스크롤 그라데이션)을 담당하는 Widget입니다.
    // children으로 전달된 <main> 내용물을 감싸서 렌더링합니다.
    <WrappedPageBackground>
      <main>
        {/* 
          🎯 ACT 1: Intro Section (Features)
          - 사용자의 연도와 이름을 받아 환영 메시지와 파티클 효과를 보여줍니다.
          - Props Drilling: data 객체에서 필요한 primitive 값만 추출하여 전달합니다.
        */}
        <WrappedHeader
          year={data.year}
          username={data.displayName}
        />

        {/* 
          📊 ACT 2: Statistics Section (Features)
          - Bento Grid 스타일로 핵심 개발 지표를 시각화합니다.
          - 각 숫자는 카운팅 애니메이션과 함께 등장합니다.
        */}
        <StatsShowcase
          commits={data.commits}
          pullRequests={data.pullRequests}
          repositories={data.repositories}
          accountAge={data.yearsOnGithub}
          activeDays={data.activeDays}
          totalHours={data.estimatedHours}
        />
      </main>
    </WrappedPageBackground>
  )
}
