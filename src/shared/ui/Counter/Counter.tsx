/**
 * 🔢 [SHARED UI] Counter Component
 * 
 * @layer shared/ui
 * @description
 * 숫자가 0부터 목표값까지 부드럽게 올라가는 애니메이션 컴포넌트입니다.
 * 
 * 💡 **Performance Optimization**:
 * React의 `useState`를 써서 1프레임마다 숫자를 업데이트하면, 컴포넌트 전체가 60번 리렌더링됩니다.
 * 이는 성능에 악영향을 줍니다. (특히 하위 컴포넌트가 많을 때)
 * 대신 `useMotionValue`와 `ref.textContent`를 사용하면, React 리렌더링 **0회**로 숫자를 바꿀 수 있습니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Direct DOM Manipulation**: React의 선언적 방식을 벗어나 성능 최적화하는 법
 * 2. **Framer Motion MotionValue**: React State 없이 애니메이션 값 추적하기
 * 3. **Intersection Observer**: 화면에 보일 때만 애니메이션 실행하기
 */

'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'

/**
 * Props Interface
 */
export interface CounterProps {
    /** 최종 도달할 숫자 */
    value: number

    /** 애니메이션 지속 시간 (초), 기본값 2초 */
    duration?: number

    /** 추가 CSS 클래스 */
    className?: string
}

/**
 * Counter Component
 * 
 * @param value - 최종 도달할 숫자
 * @param duration - 애니메이션 지속 시간 (초), 기본값 2초
 * @param className - 추가 CSS 클래스
 */
export function Counter({ value, duration = 2, className }: CounterProps) {
    // [DOM Reference] DOM 요소를 직접 참조하기 위한 ref
    // HTMLSpanElement: <span> 태그의 TypeScript 타입
    // null: 초기값 (아직 DOM이 생성되지 않음)
    const ref = useRef<HTMLSpanElement>(null)

    // [Motion Value] Framer Motion의 반응형 값 (React State가 아님!)
    // 이 값이 변해도 컴포넌트가 리렌더링되지 않습니다.
    // 초기값: 0
    const motionValue = useMotionValue(0)

    // [Transform] motionValue를 실수에서 정수로 변환
    // (latest) => Math.round(latest): 소수점을 반올림
    // 예: 123.7 -> 124
    const rounded = useTransform(motionValue, (latest) => Math.round(latest))

    // [Intersection Observer] 요소가 화면에 보이는지 감지
    // ref: 관찰할 DOM 요소
    // once: true -> 한 번만 트리거 (스크롤 올렸다 내려도 재실행 안 됨)
    // amount: 0.5 -> 요소의 50%가 보일 때 트리거
    const isInView = useInView(ref, { once: true, amount: 0.5 })

    // [Effect 1: Animation Trigger] 화면에 보이면 애니메이션 시작
    useEffect(() => {
        // 화면에 보일 때만 실행
        if (isInView) {
            // motionValue를 0에서 value로 애니메이션
            const controls = animate(motionValue, value, {
                // [Duration] 애니메이션 지속 시간 (초)
                duration,

                // [Easing] Cubic Bezier 이징 (부드러운 감속)
                // [0.25, 0.46, 0.45, 0.94]: CSS의 ease-out과 유사
                ease: [0.25, 0.46, 0.45, 0.94]
            })

            // [Cleanup Function] 컴포넌트가 언마운트되면 애니메이션 중단
            // 메모리 누수 방지
            return controls.stop
        }
    }, [isInView, motionValue, value, duration]) // 의존성 배열: 이 값들이 변하면 Effect 재실행

    // [Effect 2: DOM Update] rounded 값이 변할 때마다 DOM 직접 업데이트
    useEffect(() => {
        // rounded.on('change', callback): 값 변경 구독
        // rounded 값이 변할 때마다 콜백 실행
        return rounded.on('change', (latest) => {
            // ref.current가 null이 아닐 때만 실행 (타입 안전성)
            if (ref.current) {
                // [Direct DOM Manipulation] 텍스트 노드 직접 수정 (No Re-render!)
                // toLocaleString(): 1000 -> "1,000" (천 단위 콤마)
                ref.current.textContent = latest.toLocaleString()
            }
        })
    }, [rounded]) // rounded가 변하면 Effect 재실행

    // [Initial Render] 초기 화면에는 "0"을 표시
    // ref를 연결하여 DOM 요소를 추적
    // className을 통해 외부에서 스타일 커스터마이징 가능
    return <span ref={ref} className={className}>0</span>
}
