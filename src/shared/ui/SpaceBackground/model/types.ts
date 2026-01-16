/**
 * 🌌 SpaceBackground Types
 * 
 * FSD: shared/ui/SpaceBackground/model
 */

/**
 * ⭐ Star 인터페이스
 * 캔버스에 그려질 개별 별의 속성
 */
export interface Star {
    x: number
    y: number
    size: number
    opacity: number
    twinkleSpeed: number
    layer: number
    color: string
    speed: number
    pulsePhase: number
}

/**
 * 💫 ShootingStar 인터페이스
 * 유성(별똥별)의 속성
 */
export interface ShootingStar {
    x: number
    y: number
    length: number
    speed: number
    opacity: number
    angle: number
    color: string
}

/**
 * 🌫️ NebulaDust 인터페이스
 * 은하수를 구성하는 개별 먼지 파티클의 속성
 */
export interface NebulaDust {
    x: number
    y: number
    size: number
    opacity: number
    color: string
    speedX: number
    speedY: number
    layer: number
}

/**
 * 💥 ExplosionParticle 인터페이스
 * 별이 터질 때 생성되는 파티클 속성
 */
export interface ExplosionParticle {
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    opacity: number
    life: number // 남은 수명 (0~1)
    decay: number // 수명 감소 속도
    friction?: number // 마찰계수 (0~1)
    type?: 'spark' | 'gas' // 파티클 종류 (불꽃 vs 안개)
}

/**
 * ⚡ Flash 인터페이스
 * 폭발 순간의 눈부신 섬광
 */
export interface Flash {
    x: number
    y: number
    radius: number
    maxRadius: number
    opacity: number
    life: number // 0~1
    decay: number
}

/**
 * 🌊 Shockwave 인터페이스
 * 폭발 시 퍼져나가는 충격파 링
 */
export interface Shockwave {
    x: number
    y: number
    radius: number
    maxRadius: number
    color: string
    opacity: number
    speed: number
}
