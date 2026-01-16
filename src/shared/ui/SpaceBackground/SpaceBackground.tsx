/**
 * 🌌 [WIDGET] SpaceBackground (지브리 스타일 우주 배경)
 * 
 * @layer shared/ui
 * @description
 * HTML Canvas API를 사용하여 실시간으로 그려지는 인터랙티브 우주 배경입니다.
 * 애니메이션 로직은 `lib/useSpaceAnimation` 훅으로 분리되었습니다.
 */

'use client'

import styles from './SpaceBackground.module.css'
import { useSpaceAnimation } from './lib/useSpaceAnimation'

/**
 * 🌟 SpaceBackground 컴포넌트
 * 
 * @description
 * Canvas를 사용하여 실시간으로 우주 배경을 그리는 메인 컴포넌트입니다.
 * 비즈니스 로직은 커스텀 훅으로 위임하여 View와 Logic을 분리했습니다 (FSD).
 */
export default function SpaceBackground() {
    const { canvasRef, handleCanvasClick } = useSpaceAnimation()

    return (
        <div className={styles.container}>
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                onClick={handleCanvasClick}
            />
        </div>
    )
}