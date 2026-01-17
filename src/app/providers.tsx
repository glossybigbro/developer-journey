/**
 * 🌐 [App Config] Global Providers Wrapper
 * 
 * @layer app
 * @description
 * React Context API를 기반으로 하는 전역 상태 공급자(Providers)를 통합 관리하는 컴포넌트입니다.
 * 최상위 `layout.tsx`에서 이 컴포넌트를 사용하여 앱 전체(Children)를 감쌉니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Server vs Client Component**: 왜 Providers가 별도 파일로 분리되어야 하는지?
 * 2. **React Query Configuration**: `staleTime`과 `gcTime`의 결정적 차이 이해
 * 3. **Singleton Pattern**: 리렌더링 시 QueryClient가 초기화되지 않게 막는 법
 */

'use client' // Context는 React Hooks(UseState, UseContext)를 쓰므로 무조건 클라이언트 컴포넌트여야 함

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  /*
   * 🔒 [Singleton Pattern for QueryClient]
   * 
   * Q: 왜 `const queryClient = new QueryClient()`를 밖에서 만들거나 그냥 쓰면 안 되나요?
   * A: 
   * 1. 밖에서 만들면(Global variable): 여러 요청 간에 캐시가 공유되어버립니다. (서버 사이드 렌더링 시 치명적)
   * 2. 컴포넌트 내부에서 그냥 쓰면: 이 컴포넌트가 리렌더링될 때마다 캐시가 다 날아갑니다.
   * 
   * 해결책: `useState`의 Lazy Initialization(() => value)을 사용하여
   * 컴포넌트 생명주기 동안 **딱 한 번만** 생성되도록 보장합니다.
   */
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        /*
         * 🕒 [Caching Strategy]
         * 
         * - staleTime (상미유효기간): 5분
         *   데이터를 가져온 후 5분 동안은 "신선하다"고 판단하여,
         *   사용자가 같은 데이터를 요청해도 서버에 재요청하지 않고 캐시를 줍니다.
         * 
         * - gcTime (Garbage Collection Time): 30분
         *   해당 쿼리가 사용되지 않게 된(언마운트) 후 30분이 지나면 메모리에서 삭제합니다.
         */
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,

        // 윈도우 포커스 시 자동 갱신 끄기 (사용자 경험에 따라 호불호 갈림)
        refetchOnWindowFocus: false,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
