/**
 * 🎨 [LIB] Confetti Animation (폭죽 효과)
 * 
 * @layer shared/lib/animations
 * @description
 * `canvas-confetti` 라이브러리를 감싸서(Wrapping),
 * 우리 프로젝트에 맞는 설정값(색상, 속도 등)으로 폭죽을 터트리는 함수입니다.
 * 
 * 🏗️ 디자인 패턴: [Wrapper Pattern]
 * 외부 라이브러리(`canvas-confetti`)에 직접 의존성을 갖는 코드를 최소화합니다.
 * 만약 나중에 다른 폭죽 라이브러리로 교체하더라도, 이 파일의 내부 구현만 바꾸면
 * 프로젝트 전체(`features/wrapped-header` 등)에 영향을 주지 않습니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Randomness Math**: `Math.random()`을 사용하여 자연스러운 불규칙성을 만드는 공식
 * 2. **Interval Management**: `setInterval`과 `clearInterval`을 이용한 애니메이션 루프 제어
 * 3. **Decay Physics**: 시간이 지날수록 입자 수가 줄어드는(Fade Out) 감쇠 로직 구현
 */

import confetti from 'canvas-confetti'
import { CONFETTI_CONFIG } from '../../config/animations'

/**
 * 🎲 랜덤 숫자 생성 유틸리티
 * 
 * @description
 * Math.random()은 0.0 ~ 1.0 사이의 난수를 반환합니다.
 * 이를 [min, max] 범위의 난수로 변환하는 표준 공식입니다.
 * Formula: `Math.random() * (max - min) + min`
 * 
 * @param min 최소값 (포함)
 * @param max 최대값 (포함)
 */
export const randomInRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
}

/**
 * 🎉 폭죽 발사 함수 (Main Function)
 * 
 * @description
 * 화면 양쪽(왼쪽 10~30%, 오른쪽 70~90%)에서 동시에 폭죽을 터트려 중앙을 향해 축하하는 느낌을 줍니다.
 * 단발성이 아니라 일정 시간(`DURATION`) 동안 지속적으로 발사됩니다.
 */
export const fireConfettiEffect = (): void => {
    // 애니메이션 종료 시각 계산 (현재 시간 + 지속 시간)
    const duration = CONFETTI_CONFIG.DURATION
    const animationEnd = Date.now() + duration

    // 공통 설정값 (shared/config에서 관리)
    // 매 호출마다 객체를 새로 만들지 않고, 기본값 객체를 재사용합니다.
    const defaults = {
        startVelocity: CONFETTI_CONFIG.START_VELOCITY, // 초기 발사 속도
        spread: CONFETTI_CONFIG.SPREAD,                // 퍼짐 정도 (360도 = 전방향)
        ticks: CONFETTI_CONFIG.TICKS,                  // 입자가 화면에 머무는 시간 (프레임 수)
        zIndex: CONFETTI_CONFIG.Z_INDEX,               // 레이어 순서 (배경에 깔리도록 0)
        // Readonly 배열([...COLORS])을 Mutable 배열로 복사하여 전달 (라이브러리 호환성)
        colors: [...CONFETTI_CONFIG.COLORS],
    }

    // 🔄 애니메이션 루프 (Interval)
    // requestAnimationFrame 대신 setInterval을 사용한 이유:
    // 정확한 프레임 제어보다는, 일정 시간 간격으로 '발사' 트리거를 당기는 것이 목적이기 때문입니다.
    const confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now()

        // 🛑 종료 조건: 시간이 다 되면 인터벌을 정지(Clear)합니다.
        // 메모리 누수(Memory Leak) 방지를 위해 반드시 clearInterval을 호출해야 합니다.
        if (timeLeft <= 0) {
            return clearInterval(confettiInterval)
        }

        // 📉 입자 개수 감쇠 (Decay Logic)
        // 시간이 지날수록(`timeLeft`가 줄어들수록) 생성되는 입자 수(`particleCount`)도 줄어듭니다.
        // 갑자기 뚝 끊키지 않고 자연스럽게 사라지는 효과를 줍니다.
        const particleCount = CONFETTI_CONFIG.PARTICLE_COUNT_MULTIPLIER * (timeLeft / duration)

        // 🚀 왼쪽 폭죽 발사
        // x: 0.1 ~ 0.3 (화면 왼쪽 10~30% 지점)
        // y: 화면 상단(-0.2)에서 시작하여 중력에 의해 떨어짐
        confetti({
            ...defaults,
            particleCount,
            origin: {
                x: randomInRange(0.1, 0.3),
                y: Math.random() - 0.2
            }
        })

        // 🚀 오른쪽 폭죽 발사
        // x: 0.7 ~ 0.9 (화면 오른쪽 70~90% 지점)
        confetti({
            ...defaults,
            particleCount,
            origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2
            }
        })
    }, CONFETTI_CONFIG.INTERVAL_MS)
}
