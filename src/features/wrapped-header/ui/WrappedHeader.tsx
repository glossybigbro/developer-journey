/**
 * 📘 [FEATURE] WrappedHeader (히어로 헤더)
 * 
 * @layer features/wrapped-header
 * @description
 * 사용자가 페이지에 진입했을 때 가장 먼저 마주하는 "Hero Section"입니다.
 * 단순한 제목 표시를 넘어, Parallax 효과와 폭죽 애니메이션을 통해 강렬한 첫인상을 줍니다.
 * 
 * 🏗️ 디자인 패턴: [Container/Presenter] (유사 패턴)
 * 복잡한 로직(`useParallaxScroll`, `useConfettiEffect`)은 커스텀 훅으로 분리하고,
 * 이 컴포넌트는 오직 "화면에 어떻게 그릴지(Rendering)"에만 집중합니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Framer Motion**: `initial`, `animate`, `transition` props를 사용하여 선언적으로 애니메이션을 정의하는 법
 * 2. **Component Composition**: 배경(Background), 콘텐츠(Content), 오버레이(Overlay) 레이어를 겹쳐서 입체감을 만드는 법
 * 3. **Prop Drilling 방지**: 필요한 데이터(`year`, `username`)만 명확하게 Props로 정의하여 의존성 최소화
 */

'use client'

// 📦 Libraries
import { motion } from 'framer-motion'
import { HEADER_ANIMATIONS } from '../../../shared/config/animations'

// 🔗 Hooks (Business Logic)
import { useConfettiEffect } from '../lib/useConfettiEffect'
import { useParallaxScroll } from '../lib/useParallaxScroll'

// 🎨 Styles
import styles from './WrappedHeader.module.css'

/**
 * 📝 Props Interface
 * 타입스크립트를 사용해 부모 컴포넌트(`app/page.tsx` 또는 `app/wrapped/page.tsx`)로부터
 * 반드시 받아야 할 데이터를 명시합니다.
 */
interface WrappedHeaderProps {
    year: number     // 표시할 연도 (예: 2024)
    username: string // 사용자 이름 (Github ID)
}

export default function WrappedHeader({ year, username }: WrappedHeaderProps) {
    // 🎣 1. Parallax Logic
    // 스크롤 위치에 따라 변하는 값(MotionValue)들을 받아옵니다.
    // 리렌더링 없이 GPU 가속을 활용해 부드럽게 움직입니다.
    const { heroY, heroOpacity, bgY, indicatorOpacity } = useParallaxScroll()

    // 🎣 2. Confetti Logic
    // 컴포넌트 마운트 시 폭죽을 터트리는 사이드 이펙트(Side Effect)를 수행합니다.
    useConfettiEffect()

    return (
        // 레이아웃 컨테이너 (relative positioning context)
        // ==========================================
        // 🏗️ 3-Layer Architecture - 깊이감을 만드는 레이어 전략
        // ==========================================
        // 
        // 🎯 왜 3개 레이어로 나누었나요?
        // 
        // 현실 세계의 "원근법(Perspective)"을 재현하기 위해서입니다.
        // 차창 밖을 볼 때, 멀리 있는 산은 천천히, 가까운 나무는 빠르게 지나가는 것처럼
        // 각 레이어를 서로 다른 속도로 움직여 깊이감을 만듭니다.
        // 
        // 📊 레이어별 속도 비교:
        // 
        // 1. Background (bgY): 천천히 움직임 (0.5x 속도)
        //    → 멀리 있는 것처럼 보임 (원근감)
        //    → 시각적 깊이를 만드는 기반 레이어
        // 
        // 2. Content (heroY): 빠르게 움직임 (1x 속도)
        //    → 가까이 있는 것처럼 보임
        //    → 사용자의 시선이 머무는 주요 컨텐츠
        // 
        // 3. Indicator (고정): 움직이지 않음 (0x 속도)
        //    → 화면에 붙어있는 UI 요소
        //    → 사용자 행동 유도 (Call To Action)
        // 
        // 💡 이 속도 차이가 "Parallax Scrolling"의 핵심입니다!
        //    실제 세계에서 멀리 있는 산은 천천히, 가까운 나무는 빠르게 지나가는 것과 같은 원리

        <div className={styles.container}>
            {/* 
              ==========================================
              🌌 Layer 1: Background (가장 뒤)
              ==========================================
              
              🎯 역할: 시각적 깊이감의 기반
              
              📊 움직임: bgY (천천히)
              - 스크롤 시 천천히 움직여서 깊이감(Depth)을 줍니다.
              - heroY보다 느린 속도로 움직여 멀리 있는 것처럼 보입니다.
              
              🎨 시각적 효과:
              - 그라데이션 배경으로 분위기 조성
              - 컨텐츠를 돋보이게 하는 역할
              
              ♿️ 접근성:
              - aria-hidden="true": 스크린리더가 무시 (장식용 요소)
            */}
            <motion.div
                className={styles.bgLayer}
                style={{ y: bgY }}
                aria-hidden="true"
            >
                <div className={styles.bgGradient} />
            </motion.div>

            {/* 
              ==========================================
              ✨ Layer 2: Main Content (중간)
              ==========================================
              
              🎯 역할: 사용자의 시선이 머무는 핵심 컨텐츠
              
              📊 움직임: heroY + heroOpacity
              - heroY: 빠르게 위로 올라감 (가까운 느낌)
              - heroOpacity: 스크롤 시 투명해짐 (자연스러운 퇴장)
              
              🎭 애니메이션 전략:
              - initial: 처음 트리에 붙을 때의 상태 (투명, 아래쪽 위치)
              - animate: 최종적으로 보여질 상태 (불투명, 제자리)
              - transition: 변화의 속도와 딜레이 설정
            */}
            <motion.div
                className={styles.content}
                style={{ y: heroY, opacity: heroOpacity }}
            >
                {/* 
                  🎨 Title Animation
                  
                  🔢 딜레이 전략:
                  - TITLE_DELAY: 제목이 먼저 등장
                  - SUBTITLE_DELAY: 부제목이 조금 늦게 등장
                  - 순차적 등장으로 사용자의 시선을 유도
                */}
                <motion.h1
                    className={styles.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: HEADER_ANIMATIONS.TITLE_DURATION,
                        delay: HEADER_ANIMATIONS.TITLE_DELAY
                    }}
                >
                    Your <span className={styles.yearHighlight}>{year}</span> in Code
                </motion.h1>

                <motion.p
                    className={styles.subtitle}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: HEADER_ANIMATIONS.SUBTITLE_DELAY }}
                >
                    {username}, you've been busy! 🚀
                </motion.p>
            </motion.div>

            {/* 
              ==========================================
              ⬇️ Layer 3: Scroll Indicator (가장 앞)
              ==========================================
              
              🎯 역할: 사용자 행동 유도 (Call To Action)
              
              📊 움직임: indicatorOpacity
              - 스크롤을 시작하면 즉시 사라짐
              - 역할을 다한 후에는 방해가 되지 않도록 제거
              
              💡 UX 전략:
              - 사용자가 "스크롤하면 더 볼 수 있다"는 것을 직관적으로 알려줌
              - 특히 모바일 사용자에게 유용
            */}
            <motion.div
                className={styles.scrollIndicator}
                style={{ opacity: indicatorOpacity }}
                aria-hidden="true"
            >
                <span>Scroll to explore</span>
                <div className={styles.scrollArrow} />
            </motion.div>
        </div>
    )
}
