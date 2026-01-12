/**
 * 🌈 [HOOK] useScrollGradient (스크롤 그라데이션)
 * 
 * @layer widgets/wrapped-page-background
 * @description
 * 스크롤 위치에 따라 조금씩 변하는 반응형 배경 스타일을 계산합니다.
 * CSS의 `background-attachment: fixed` 만으로는 할 수 없는, 
 * "스크롤 진행도에 따른 정교한 색상 보간(Color Interpolation)"을 구현합니다.
 * 
 * 🏗️ 디자인 패턴: [Passive Event Listener]
 * 스크롤 이벤트는 매우 빈번하게 발생(초당 60~120회)하므로 최적화가 필수입니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Passive Event**: `addEventListener`의 `passive: true` 옵션이 무엇이며 왜 성능에 좋은지 이해
 * 2. **Optimization**: 색상 계산 로직을 `shared/lib`로 분리하여 훅의 책임을 가볍게 유지하는 법
 * 3. **Throttling (심화)**: 현재 코드는 매 프레임 실행되지만, 필요하다면 `requestAnimationFrame`을 써야 함을 인지
 */

import { useState, useEffect, type CSSProperties } from 'react'
import { calculateGradientColors, getScrollProgress } from '../../../shared/lib/animations'
import { GRADIENT_CONFIG } from '../../../shared/config/animations'

export const useScrollGradient = () => {
    // 배경 스타일(CSS Object)을 State로 관리
    const [backgroundStyle, setBackgroundStyle] = useState<CSSProperties>({})

    useEffect(() => {
        /**
         * 🎢 스크롤 핸들러
         * 현재 스크롤 위치를 확인하고, 그에 맞는 배경색을 계산하여 State를 업데이트합니다.
         */
        const handleScroll = () => {
            const scrollY = window.scrollY

            // [Max Scroll Calculation]
            // "스크롤 가능한 전체 길이" = 문서 전체 높이 - 뷰포트 높이
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight

            // 1. 진행률 계산 (0.0 ~ 1.0)
            const progress = getScrollProgress(scrollY, maxScroll)

            // 2. 색상 보간 (Interpolation)
            // progress에 맞춰 두 가지 색상(시작색, 끝색)을 섞어 반환받습니다.
            const { color1, color2 } = calculateGradientColors(
                progress,
                GRADIENT_CONFIG.HERO_COLORS,
                GRADIENT_CONFIG.STATS_COLORS,
                GRADIENT_CONFIG.TRANSITION_START,
                GRADIENT_CONFIG.TRANSITION_END
            )

            // 3. 상태 업데이트 (리렌더링 유발)
            setBackgroundStyle({
                background: `linear-gradient(to bottom, ${color1}, ${color2})`,
            })
        }

        // Mount 시점 실행: 페이지 로드 직후의 스크롤 위치에 맞춰 초기 색상 설정
        handleScroll()

        // Event Attachment
        // { passive: true }: "이 핸들러는 preventDefault()를 호출하지 않는다"고 브라우저에 알림.
        // 브라우저는 스크롤 처리를 메인 스레드에서 분리하여 더 부드럽게(Async) 처리할 수 있음.
        window.addEventListener('scroll', handleScroll, { passive: true })

        // Cleanup: Unmount 시 리스너 제거
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return backgroundStyle
}
