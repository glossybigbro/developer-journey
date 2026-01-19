import { useEffect, useRef } from 'react'
import type { Star, ShootingStar, NebulaDust, ExplosionParticle, Shockwave, Flash } from '../model/spaceTypes'
import { SPACE_CONFIG } from '../config/spaceConstants'

/**
 * 🎨 Space Animation Hook
 * 
 * @description
 * SpaceBackground 컴포넌트의 애니메이션 로직을 분리한 커스텀 훅입니다.
 * Canvas 레퍼런스와 클릭 핸들러를 반환합니다.
 */
export const useSpaceAnimation = () => {
    // [Canvas Reference]
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // [State Refs]
    const starsRef = useRef<Star[]>([])
    const explosionsRef = useRef<ExplosionParticle[]>([])
    const shockwavesRef = useRef<Shockwave[]>([])
    const flashesRef = useRef<Flash[]>([])
    const nebulaDustRef = useRef<NebulaDust[]>([])

    /**
     * 💥 폭발 효과 생성
     */
    const createExplosion = (x: number, y: number, color: string) => {
        const { PARTICLE_COUNT, MIN_SPEED, MAX_SPEED, MIN_SIZE, MAX_SIZE, COLORS, SHOCKWAVE, FLASH, GAS } = SPACE_CONFIG.EXPLOSION

        // 1. 섬광 (Flash) 생성
        flashesRef.current.push({
            x, y,
            radius: FLASH.BASE_RADIUS,
            maxRadius: FLASH.MAX_RADIUS,
            opacity: 1,
            life: 1,
            decay: FLASH.DECAY
        })

        // 2. 고속 파편 (Sparks/Debris) 생성
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = (Math.PI * 2 * i) / PARTICLE_COUNT
            const speed = Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED

            explosionsRef.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                opacity: 1,
                life: 1,
                decay: SPACE_CONFIG.EXPLOSION.DECAY,
                friction: SPACE_CONFIG.EXPLOSION.FRICTION,
                type: SPACE_CONFIG.PARTICLE_TYPE.SPARK
            })
        }

        // 3. 충격파 (Shockwave) 생성 - Cyan & Magenta Dual Ring
        const swColors = SHOCKWAVE.COLORS || ['#00FFFF', '#FF00FF']

        swColors.forEach((swColor, idx) => {
            const sizeRatio = idx === 0 ? 1 : SHOCKWAVE.LAYER_RATIO_SIZE
            const speedRatio = idx === 0 ? 1 : SHOCKWAVE.LAYER_RATIO_SPEED

            shockwavesRef.current.push({
                x, y,
                radius: SHOCKWAVE.BASE_RADIUS,
                maxRadius: SHOCKWAVE.MAX_RADIUS * sizeRatio,
                color: swColor,
                opacity: SHOCKWAVE.OPACITY_INITIAL,
                speed: SHOCKWAVE.SPEED * speedRatio
            })
        })

        // 4. 잔해 가스 (Gas/Afterglow) 생성
        for (let i = 0; i < GAS.PARTICLE_COUNT; i++) {
            const angle = Math.random() * Math.PI * 2
            const speed = Math.random() * GAS.SPEED

            explosionsRef.current.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Math.random() * (GAS.MAX_SIZE - GAS.MIN_SIZE) + GAS.MIN_SIZE,
                color: GAS.COLORS[Math.floor(Math.random() * GAS.COLORS.length)],
                opacity: GAS.OPACITY_INITIAL,
                life: 1,
                decay: GAS.DECAY,
                friction: GAS.FRICTION,
                type: SPACE_CONFIG.PARTICLE_TYPE.GAS
            })
        }
    }

    /**
     * 🖱️ 캔버스 클릭 핸들러
     */
    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const clickY = e.clientY - rect.top
        const { HITBOX_PADDING } = SPACE_CONFIG.EXPLOSION

        // 1. 별 클릭 체크
        let hit = false

        for (let i = starsRef.current.length - 1; i >= 0; i--) {
            const star = starsRef.current[i]
            const starX = star.x * canvas.width
            const starY = star.y * canvas.height
            const hitThreshold = star.size + HITBOX_PADDING

            const dist = Math.hypot(clickX - starX, clickY - starY)

            if (dist < hitThreshold) {
                createExplosion(starX, starY, star.color)

                star.x = Math.random()
                star.y = Math.random()
                star.opacity = 0
                hit = true
                break
            }
        }

        // 2. 은하수 먼지 클릭 체크
        if (!hit) {
            for (let i = nebulaDustRef.current.length - 1; i >= 0; i--) {
                const dust = nebulaDustRef.current[i]
                const hitThreshold = dust.size + HITBOX_PADDING

                const dist = Math.hypot(clickX - dust.x, clickY - dust.y)

                if (dist < hitThreshold) {
                    createExplosion(dust.x, dust.y, dust.color)
                    dust.opacity = 0
                    dust.x = Math.random() * canvas.width
                    hit = true
                    break
                }
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        /**
         * 🌫️ 은하수 먼지 생성
         */
        const createNebulaDust = () => {
            nebulaDustRef.current = []
            const { COUNT, BAND_WIDTH_RATIO, BAND_SLOPE, BASE_SPEED_X, BASE_SPEED_Y, SIZE_BASE, SIZE_VARIANCE } = SPACE_CONFIG.NEBULA

            const bandCenterY = canvas.height * 0.5
            const bandWidth = canvas.height * BAND_WIDTH_RATIO

            for (let i = 0; i < COUNT; i++) {
                const x = Math.random() * canvas.width
                const yOffset = x * BAND_SLOPE
                const randomY = (Math.random() - 0.5) * bandWidth * 2
                const y = yOffset + randomY
                const distanceFromCenter = Math.abs(yOffset + randomY - bandCenterY)

                if (distanceFromCenter < bandWidth) {
                    const densityFactor = 1 - (distanceFromCenter / bandWidth)
                    const opacity = Math.random() * SPACE_CONFIG.NEBULA.OPACITY_DENSITY_FACTOR * densityFactor + SPACE_CONFIG.NEBULA.OPACITY_BASE

                    nebulaDustRef.current.push({
                        x: x,
                        y: y,
                        size: (Math.random() * SIZE_VARIANCE + SIZE_BASE) * densityFactor,
                        opacity: opacity,
                        color: `rgba(255, 255, 255, ${opacity})`,
                        speedX: BASE_SPEED_X,
                        speedY: BASE_SPEED_Y,
                        layer: 1
                    })
                }
            }
        }

        /**
         * 📐 캔버스 리사이즈
         */
        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            createNebulaDust()
        }

        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        /**
         * ⭐ 별 생성
         */
        const createStars = () => {
            starsRef.current = []
            const stars = starsRef.current
            const { LAYER_1, LAYER_2, LAYER_3 } = SPACE_CONFIG.STARS
            const starColors = SPACE_CONFIG.COLORS.STARS

            // Layer 1
            for (let i = 0; i < LAYER_1.COUNT; i++) {
                stars.push({
                    x: Math.random(),
                    y: Math.random(),
                    size: Math.random() * (LAYER_1.SIZE_MAX - LAYER_1.SIZE_MIN) + LAYER_1.SIZE_MIN,
                    opacity: Math.random(),
                    twinkleSpeed: Math.random() * (LAYER_1.TWINKLE_MAX - LAYER_1.TWINKLE_MIN) + LAYER_1.TWINKLE_MIN,
                    layer: SPACE_CONFIG.LAYER_INDEX.ONE,
                    color: starColors[Math.floor(Math.random() * starColors.length)],
                    speed: LAYER_1.SPEED,
                    pulsePhase: Math.random() * Math.PI * 2
                })
            }
            // Layer 2
            for (let i = 0; i < LAYER_2.COUNT; i++) {
                stars.push({
                    x: Math.random(),
                    y: Math.random(),
                    size: Math.random() * (LAYER_2.SIZE_MAX - LAYER_2.SIZE_MIN) + LAYER_2.SIZE_MIN,
                    opacity: Math.random(),
                    twinkleSpeed: Math.random() * (LAYER_2.TWINKLE_MAX - LAYER_2.TWINKLE_MIN) + LAYER_2.TWINKLE_MIN,
                    layer: SPACE_CONFIG.LAYER_INDEX.TWO,
                    color: starColors[Math.floor(Math.random() * starColors.length)],
                    speed: LAYER_2.SPEED,
                    pulsePhase: Math.random() * Math.PI * 2
                })
            }
            // Layer 3
            for (let i = 0; i < LAYER_3.COUNT; i++) {
                stars.push({
                    x: Math.random(),
                    y: Math.random(),
                    size: Math.random() * (LAYER_3.SIZE_MAX - LAYER_3.SIZE_MIN) + LAYER_3.SIZE_MIN,
                    opacity: Math.random() * (LAYER_3.OPACITY_MAX || 0.6),
                    twinkleSpeed: Math.random() * (LAYER_3.TWINKLE_MAX - LAYER_3.TWINKLE_MIN) + LAYER_3.TWINKLE_MIN,
                    layer: SPACE_CONFIG.LAYER_INDEX.THREE,
                    color: starColors[Math.floor(Math.random() * starColors.length)],
                    speed: LAYER_3.SPEED,
                    pulsePhase: Math.random() * Math.PI * 2
                })
            }
        }

        createStars()

        const shootingStars: ShootingStar[] = []

        /**
         * 💫 유성 생성
         */
        const createShootingStar = () => {
            const { INTERVAL_MIN, INTERVAL_MAX, SPEED_MIN, SPEED_MAX, LENGTH_MIN, LENGTH_MAX, ANGLE } = SPACE_CONFIG.SHOOTING_STAR

            const shootingStarColors = [
                ...SPACE_CONFIG.EXPLOSION.COLORS,
                ...SPACE_CONFIG.COLORS.SHOOTING_STAR_EXTRA
            ]

            shootingStars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height * 0.5,
                length: Math.random() * (LENGTH_MAX - LENGTH_MIN) + LENGTH_MIN,
                speed: Math.random() * (SPEED_MAX - SPEED_MIN) + SPEED_MIN,
                opacity: 1,
                angle: ANGLE,
                color: shootingStarColors[Math.floor(Math.random() * shootingStarColors.length)]
            })
        }

        let lastShootingStarTime = 0
        const { INTERVAL_MIN, INTERVAL_MAX } = SPACE_CONFIG.SHOOTING_STAR
        let nextShootingStarInterval = Math.random() * (INTERVAL_MAX - INTERVAL_MIN) + INTERVAL_MIN
        let animationId: number

        /**
         * 🎬 메인 애니메이션 루프
         */
        const animate = (timestamp: number) => {
            if (!timestamp) timestamp = performance.now()

            // [배경]
            // [배경]
            // [배경]
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
            const { TOP, MIDDLE, BOTTOM } = SPACE_CONFIG.COLORS.GRADIENT

            // Helper to resolve CSS variables if needed
            const resolveColor = (color: string) => {
                if (color.startsWith('var(')) {
                    const varName = color.match(/var\(([^)]+)\)/)?.[1]
                    if (varName) {
                        return getComputedStyle(document.body).getPropertyValue(varName).trim()
                    }
                }
                return color
            }

            gradient.addColorStop(0, resolveColor(TOP))
            gradient.addColorStop(0.5, resolveColor(MIDDLE))
            gradient.addColorStop(1, resolveColor(BOTTOM))
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // [은하수 먼지]
            nebulaDustRef.current.forEach(dust => {
                ctx.fillStyle = dust.color
                ctx.globalAlpha = dust.opacity
                ctx.beginPath()
                ctx.arc(dust.x, dust.y, dust.size, 0, Math.PI * 2)
                ctx.fill()

                if (dust.size > SPACE_CONFIG.ANIMATION.NEBULA_SHADOW.THRESHOLD) {
                    ctx.shadowBlur = SPACE_CONFIG.ANIMATION.NEBULA_SHADOW.BLUR
                    ctx.shadowColor = dust.color
                    ctx.fill()
                    ctx.shadowBlur = 0
                }

                ctx.globalAlpha = 1
                dust.x += dust.speedX
                dust.y += dust.speedY

                if (dust.x < 0) dust.x = canvas.width
                if (dust.x > canvas.width) dust.x = 0
                if (dust.y < 0) dust.y = canvas.height
                if (dust.y > canvas.height) dust.y = 0
            })

            // [별]
            starsRef.current.forEach(star => {
                star.opacity += star.twinkleSpeed
                if (star.opacity > 1 || star.opacity < SPACE_CONFIG.ANIMATION.STAR_TWINKLE_MIN_OPACITY) star.twinkleSpeed *= -1

                star.pulsePhase += SPACE_CONFIG.ANIMATION.STAR_PULSE_SPEED
                const pulseFactor = 1 + Math.sin(star.pulsePhase) * SPACE_CONFIG.ANIMATION.STAR_PULSE_AMPLITUDE
                const actualX = star.x * canvas.width
                const actualY = star.y * canvas.height

                // 투명도 기반 렌더링 (String replace 제거 최적화)
                ctx.globalAlpha = star.opacity
                ctx.fillStyle = star.color
                ctx.beginPath()
                ctx.arc(actualX, actualY, star.size * pulseFactor, 0, Math.PI * 2)
                ctx.fill()

                if (star.layer === SPACE_CONFIG.LAYER_INDEX.ONE && star.opacity > SPACE_CONFIG.ANIMATION.STAR_SHADOW_THRESHOLD) {
                    ctx.shadowBlur = SPACE_CONFIG.ANIMATION.STAR_SHADOW_BLUR
                    ctx.shadowColor = star.color
                    ctx.fill()
                    ctx.shadowBlur = 0
                }
                ctx.globalAlpha = 1 // 리셋

                // 이동 속도 적용 (Config값 직접 사용)
                star.x -= star.speed

                if (star.x < SPACE_CONFIG.ANIMATION.STAR_WRAP_THRESHOLD) {
                    star.x = SPACE_CONFIG.ANIMATION.STAR_WRAP_RESET
                    star.y = Math.random()
                }
            })

            // [유성 생성]
            if (timestamp - lastShootingStarTime > nextShootingStarInterval) {
                createShootingStar()
                if (Math.random() > SPACE_CONFIG.SHOOTING_STAR.PROBABILITY_DOUBLE) createShootingStar()
                lastShootingStarTime = timestamp
                // INTERVAL_MAX is total range max, so span is MAX - MIN. 
                // However, config says MAX=1100 (300+800). So random range is MAX-MIN.
                const { INTERVAL_MIN, INTERVAL_MAX } = SPACE_CONFIG.SHOOTING_STAR
                nextShootingStarInterval = Math.random() * (INTERVAL_MAX - INTERVAL_MIN) + INTERVAL_MIN
            }

            // [유성 렌더링]
            shootingStars.forEach((star, index) => {
                const gradient = ctx.createLinearGradient(
                    star.x, star.y,
                    star.x - Math.cos(star.angle) * star.length,
                    star.y - Math.sin(star.angle) * star.length
                )
                gradient.addColorStop(0, star.color)
                gradient.addColorStop(1, SPACE_CONFIG.COLORS.COMMON.TRANSPARENT)

                ctx.globalAlpha = star.opacity
                ctx.strokeStyle = gradient
                ctx.lineWidth = SPACE_CONFIG.ANIMATION.SHOOTING_STAR_WIDTH
                ctx.beginPath()
                ctx.moveTo(star.x, star.y)
                ctx.lineTo(
                    star.x - Math.cos(star.angle) * star.length,
                    star.y - Math.sin(star.angle) * star.length
                )
                ctx.stroke()
                ctx.globalAlpha = 1

                star.x += Math.cos(star.angle) * star.speed
                star.y += Math.sin(star.angle) * star.speed
                star.opacity -= SPACE_CONFIG.ANIMATION.SHOOTING_STAR_DECAY

                if (star.x > canvas.width || star.y > canvas.height || star.opacity <= 0) {
                    shootingStars.splice(index, 1)
                }
            })

            // [폭발 이펙트]
            ctx.globalCompositeOperation = SPACE_CONFIG.CANVAS_OPTS.COMPOSITE.LIGHTER

            explosionsRef.current.forEach((p, i) => {
                p.x += p.vx
                p.y += p.vy
                if (p.friction) {
                    p.vx *= p.friction
                    p.vy *= p.friction
                }
                if (p.type !== SPACE_CONFIG.PARTICLE_TYPE.GAS) p.vy += SPACE_CONFIG.EXPLOSION.GRAVITY

                p.life -= p.decay
                p.opacity = p.life

                if (p.life <= 0) {
                    explosionsRef.current.splice(i, 1)
                    return
                }

                ctx.save()
                ctx.globalAlpha = p.opacity

                if (p.type === SPACE_CONFIG.PARTICLE_TYPE.GAS) {
                    ctx.fillStyle = p.color
                    ctx.beginPath()
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                    ctx.fill()
                } else {
                    const trailLen = SPACE_CONFIG.EXPLOSION.TRAIL_LENGTH || 3
                    ctx.strokeStyle = p.color
                    ctx.lineWidth = p.size
                    ctx.lineCap = SPACE_CONFIG.CANVAS_OPTS.LINE_CAP.ROUND
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(p.x - p.vx * trailLen, p.y - p.vy * trailLen)
                    ctx.stroke()
                }
                ctx.restore()
            })

            // [충격파]
            shockwavesRef.current.forEach((wave, i) => {
                wave.radius += wave.speed
                wave.opacity -= SPACE_CONFIG.ANIMATION.SHOCKWAVE_DECAY
                if (wave.opacity <= 0 || wave.radius > wave.maxRadius) {
                    shockwavesRef.current.splice(i, 1)
                    return
                }
                ctx.beginPath()
                ctx.strokeStyle = wave.color
                ctx.lineWidth = SPACE_CONFIG.EXPLOSION.SHOCKWAVE.WIDTH
                ctx.globalAlpha = wave.opacity
                ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2)
                ctx.stroke()
            })

            // [섬광]
            flashesRef.current.forEach((flash, i) => {
                const { LERP_FACTOR, GRADIENT_STOP, OPACITY_GLOW } = SPACE_CONFIG.EXPLOSION.FLASH
                flash.radius += (flash.maxRadius - flash.radius) * LERP_FACTOR
                flash.opacity -= flash.decay
                flash.life -= flash.decay

                if (flash.life <= 0) {
                    flashesRef.current.splice(i, 1)
                    return
                }

                const gradient = ctx.createRadialGradient(flash.x, flash.y, 0, flash.x, flash.y, flash.radius)
                gradient.addColorStop(0, `rgba(255, 255, 255, ${flash.opacity})`)
                gradient.addColorStop(GRADIENT_STOP, `rgba(255, 255, 255, ${flash.opacity * OPACITY_GLOW})`)
                gradient.addColorStop(1, SPACE_CONFIG.COLORS.COMMON.TRANSPARENT_WHITE)

                ctx.fillStyle = gradient
                ctx.beginPath()
                ctx.arc(flash.x, flash.y, flash.radius, 0, Math.PI * 2)
                ctx.fill()
            })

            ctx.globalCompositeOperation = SPACE_CONFIG.CANVAS_OPTS.COMPOSITE.SOURCE_OVER
            ctx.globalAlpha = 1
            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('resize', resizeCanvas)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return { canvasRef, handleCanvasClick }
}
