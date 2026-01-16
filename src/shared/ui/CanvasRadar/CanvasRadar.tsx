/**
 * Canvas Radar Component
 * FSD: shared/ui/CanvasRadar
 * 
 * 레이더 스캔 애니메이션을 Canvas로 렌더링하는 컴포넌트
 * - 실시간 60fps 애니메이션
 * - 회전하는 스캔 라인 + 블러 트레일
 * - 확장하는 펄스 링 (소나 효과)
 * - 방사형 그리드 (36개 분할)
 * - 신호 감지 시 랜덤 위치 표시
 */

'use client'

import { useEffect, useRef } from 'react'
import { RADAR_CONFIG, HUD_COLORS } from '@/shared/config/ui-constants'

interface CanvasRadarProps {
    hasSignal: boolean
    color: string
}

export function CanvasRadar({ hasSignal, color }: CanvasRadarProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationRef = useRef<number>(0)
    const angleRef = useRef(0)
    const pulseRef = useRef(0)
    const signalPosRef = useRef({ angle: Math.PI / 6, distance: 0.6 })
    const lastSignalUpdateRef = useRef(Date.now())

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const size = RADAR_CONFIG.size
        canvas.width = size
        canvas.height = size
        const centerX = size / 2
        const centerY = size / 2
        const radius = size / 2 - RADAR_CONFIG.radiusPadding

        const draw = () => {
            // Clear with fade effect (creates trail)
            ctx.fillStyle = `rgba(0, 0, 0, ${RADAR_CONFIG.fadeAlpha})`
            ctx.fillRect(0, 0, size, size)

            // Background circle
            ctx.fillStyle = `rgba(0, 0, 0, ${RADAR_CONFIG.backgroundAlpha})`
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.fill()

            // Concentric circles (draw first, before radial lines)
            ctx.strokeStyle = color
            ctx.lineWidth = RADAR_CONFIG.concentricLineWidth
            ctx.globalAlpha = RADAR_CONFIG.concentricAlpha
            RADAR_CONFIG.concentricRatios.forEach(ratio => {
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius * ratio, 0, Math.PI * 2)
                ctx.stroke()
            })

            // Draw radial grid lines (36 divisions for optimal balance)
            // Draw AFTER fade so they stay visible
            ctx.strokeStyle = color
            ctx.lineWidth = RADAR_CONFIG.gridLineWidth
            ctx.globalAlpha = RADAR_CONFIG.gridOpacity
            for (let i = 0; i < RADAR_CONFIG.radialLines; i++) {
                const angle = (i * (360 / RADAR_CONFIG.radialLines)) * (Math.PI / 180)
                ctx.beginPath()
                ctx.moveTo(centerX, centerY)
                ctx.lineTo(
                    centerX + radius * Math.cos(angle),
                    centerY + radius * Math.sin(angle)
                )
                ctx.stroke()
            }

            // Draw concentric circles
            ctx.globalAlpha = RADAR_CONFIG.concentricAlpha
            RADAR_CONFIG.concentricRatios.forEach(ratio => {
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius * ratio, 0, Math.PI * 2)
                ctx.stroke()
            })

            // Outer border
            ctx.lineWidth = RADAR_CONFIG.borderLineWidth
            ctx.globalAlpha = RADAR_CONFIG.borderAlpha
            ctx.beginPath()
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
            ctx.stroke()

            // Center dot
            ctx.globalAlpha = 1
            ctx.fillStyle = color
            ctx.beginPath()
            ctx.arc(centerX, centerY, RADAR_CONFIG.centerDotRadius, 0, Math.PI * 2)
            ctx.fill()

            // Rotating scan line with gradient trail
            const sweepAngle = angleRef.current
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
            gradient.addColorStop(0, color + RADAR_CONFIG.sweepGradientStops[0])
            gradient.addColorStop(0.5, color + RADAR_CONFIG.sweepGradientStops[1])
            gradient.addColorStop(1, color + RADAR_CONFIG.sweepGradientStops[2])

            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.arc(centerX, centerY, radius, sweepAngle - RADAR_CONFIG.sweepArc, sweepAngle)
            ctx.lineTo(centerX, centerY)
            ctx.fill()

            // Bright scan line
            ctx.strokeStyle = color
            ctx.lineWidth = RADAR_CONFIG.scanLineWidth
            ctx.globalAlpha = 1
            ctx.beginPath()
            ctx.moveTo(centerX, centerY)
            ctx.lineTo(
                centerX + radius * Math.cos(sweepAngle),
                centerY + radius * Math.sin(sweepAngle)
            )
            ctx.stroke()

            // Expanding pulse ring (sonar effect)
            if (hasSignal) {
                ctx.strokeStyle = color
                ctx.lineWidth = RADAR_CONFIG.pulseLineWidth
                ctx.globalAlpha = 1 - pulseRef.current
                ctx.beginPath()
                ctx.arc(centerX, centerY, radius * pulseRef.current, 0, Math.PI * 2)
                ctx.stroke()

                // Update signal position every 3 seconds
                const now = Date.now()
                if (now - lastSignalUpdateRef.current > RADAR_CONFIG.signalUpdateInterval) {
                    signalPosRef.current = {
                        angle: Math.random() * Math.PI * 2,
                        distance: RADAR_CONFIG.signalDistanceMin + Math.random() * (RADAR_CONFIG.signalDistanceMax - RADAR_CONFIG.signalDistanceMin)
                    }
                    lastSignalUpdateRef.current = now
                }

                // Signal detection dot (random position)
                const signalX = centerX + radius * signalPosRef.current.distance * Math.cos(signalPosRef.current.angle)
                const signalY = centerY + radius * signalPosRef.current.distance * Math.sin(signalPosRef.current.angle)

                ctx.globalAlpha = RADAR_CONFIG.signalBlinkMin + (RADAR_CONFIG.signalBlinkMax - RADAR_CONFIG.signalBlinkMin) * Math.sin(Date.now() / RADAR_CONFIG.signalBlinkSpeed)
                ctx.fillStyle = HUD_COLORS.signal
                ctx.beginPath()
                ctx.arc(signalX, signalY, RADAR_CONFIG.signalDotRadius, 0, Math.PI * 2)
                ctx.fill()

                ctx.globalAlpha = 1
                ctx.fillStyle = HUD_COLORS.signalGlow
                ctx.beginPath()
                ctx.arc(signalX, signalY, RADAR_CONFIG.signalGlowRadius, 0, Math.PI * 2)
                ctx.fill()
            }

            // Update angles
            angleRef.current += RADAR_CONFIG.scanSpeed
            pulseRef.current += RADAR_CONFIG.pulseSpeed
            if (pulseRef.current > 1) pulseRef.current = 0

            animationRef.current = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [hasSignal, color])

    return (
        <canvas
            ref={canvasRef}
            style={{
                width: '100%',
                height: '100%',
                imageRendering: 'crisp-edges'
            }}
        />
    )
}
