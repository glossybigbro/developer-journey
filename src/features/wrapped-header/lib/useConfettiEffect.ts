/**
 * 🎇 [HOOK] useConfettiEffect (폭죽 효과 훅)
 * 
 * @layer features/wrapped-header/lib
 * @description
 * 히어로 섹션 진입 시 축하 폭죽을 터트리는 사이드 이펙트(Side Effect)를 캡슐화한 커스텀 훅입니다.
 * 
 * 🏗️ 디자인 패턴: [Logic/View Separation]
 * - View(`WrappedHeader.tsx`): 폭죽이 언제/어떻게 터지는지 몰라도 됩니다. 그냥 `useConfettiEffect()`를 부르면 끝입니다.
 * - Logic(This file): 폭죽의 타이밍, 조건 검사, 클린업 로직을 전담합니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Encapsulation (캡슐화)**: 복잡한 로직을 숨기고 단순한 인터페이스만 제공하는 원리
 * 2. **Memory Leak Prevention**: `useEffect`의 return 함수(cleanup)에서 타이머를 해제(`clearInterval`)하는 중요성
 * 3. **Guard Clause**: `shouldShowConfetti` 체크를 통해 불필요한 연산을 조기에 차단하는 패턴
 */

import { useEffect } from 'react'
import { fireConfettiEffect, shouldShowConfetti } from '../../../shared/lib/animations'
import { CONFETTI_CONFIG } from '../../../shared/config/animations'

export const useConfettiEffect = () => {
    // React Effect Hook: 컴포넌트 생명주기(Mount, Unmount)와 연동된 작업을 수행합니다.
    useEffect(() => {
        // 타이머 ID 저장용 변수 (클린업 시 필요)
        let interval: NodeJS.Timeout | null = null

        /**
         * 🎯 조건부 실행 함수
         * 현재 스크롤 위치 등을 확인하여 "터트려도 되는지" 검사 후 실행합니다.
         */
        const fireIfVisible = () => {
            // [Guard Clause] 방어 코드
            // 스크롤이 많이 내려가서 히어로 섹션이 안 보인다면, 굳이 폭죽을 터트려 성능을 낭비할 필요가 없습니다.
            if (!shouldShowConfetti(window.scrollY)) {
                return
            }

            // 조건 통과 시 실제 라이브러리 호출
            fireConfettiEffect()
        }

        // 1. Initial Blast: 컴포넌트 마운트 후 잠시 뒤에 첫 폭죽 발사
        // (화면이 완전히 그려지고 난 뒤 터트리는 것이 자연스럽기 때문에 delay를 줍니다)
        const initialTimer = setTimeout(fireIfVisible, CONFETTI_CONFIG.INITIAL_DELAY)

        // 2. Interval Blast: 사용자가 계속 머무르면 주기적으로 발사
        interval = setInterval(fireIfVisible, CONFETTI_CONFIG.INTERVAL)

        // 🧹 Cleanup Function
        // 컴포넌트가 화면에서 사라질 때(Unmount) 실행됩니다.
        // 실행 중인 타이머를 모두 정지시켜야 메모리 누수를 막을 수 있습니다.
        return () => {
            clearTimeout(initialTimer)
            if (interval) clearInterval(interval)
        }
    }, []) // 의존성 배열이 비어있음 = 마운트 시 1회만 실행
}
