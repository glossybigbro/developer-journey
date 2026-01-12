/**
 * 📊 [FEATURE] StatsShowcase (통계 쇼케이스)
 * 
 * @layer features/stats-showcase
 * @description
 * 사용자의 GitHub 활동 통계를 시각적으로 아름답게 보여주는 섹션입니다.
 * Apple 스타일의 "Bento Grid" 레이아웃을 채택하여 다양한 정보를 질서정연하게 배치합니다.
 * 
 * 🏗️ 디자인 패턴: [Presentational Component]
 * - 이 컴포넌트는 데이터를 **어디서 가져오는지 모릅니다**. (의존성 없음)
 * - 오직 부모에게 받은 Props(`commits`, `pullRequests`...)를 **어떻게 보여줄지**에만 집중합니다.
 * 
 * 🎓 [학습 목표]:
 * 1. **Framer Motion**: 스크롤 기반 애니메이션과 카운팅 효과 구현
 * 2. **TypeScript Interface**: Props 타입 정의로 타입 안정성 확보
 * 3. **FSD Architecture**: 재사용 가능한 로직은 shared 레이어로 분리
 * 4. **Configuration Management**: 하드코딩 제거, 중앙화된 설정 사용
 */

// [Client Component Directive] Next.js 13+ App Router에서 클라이언트 컴포넌트임을 명시
'use client'

// [Framer Motion] 애니메이션 라이브러리
import { motion, useScroll, useTransform } from 'framer-motion'

// [React Hooks] React 기본 Hooks
import { useRef } from 'react'

// [GitHub Icons] Primer Octicons 아이콘 라이브러리
import { GitCommitIcon, GitPullRequestIcon, RepoIcon } from '@primer/octicons-react'

// [Shared UI] 재사용 가능한 UI 컴포넌트
import { Counter } from '../../../shared/ui/Counter'

// [Shared Config] 중앙화된 설정 파일
import { STATS_ANIMATIONS } from '../../../shared/config/animations'
import { STATS_COLORS } from '../../../shared/config/colors'

// [CSS Module] 로컬 스코프 스타일시트
import styles from './StatsShowcase.module.css'

/**
 * 📝 [TypeScript Interface] Props 타입 정의
 * 
 * 이 컴포넌트가 받을 수 있는 데이터의 "계약서"입니다.
 * TypeScript는 이 계약을 어기면 컴파일 에러를 발생시켜 버그를 사전에 방지합니다.
 */
interface StatsShowcaseProps {
    commits: number        // 총 커밋 수
    pullRequests: number   // 병합된 PR 수
    repositories: number   // 보유 리포지토리 수
    accountAge: number     // 계정 생성 후 경과 연수
    activeDays: number     // 활동 일수
    totalHours: number     // 추정 코딩 시간
}

/**
 * 🌟 [Main Component] StatsShowcase
 * 
 * @description
 * GitHub 통계를 Bento Grid 레이아웃으로 표시하는 메인 컴포넌트입니다.
 * 
 * @param props - StatsShowcaseProps 인터페이스에 정의된 통계 데이터
 */
export default function StatsShowcase({
    commits,
    pullRequests,
    repositories,
    accountAge,
    activeDays,
    totalHours
}: StatsShowcaseProps) {
    // ==========================================
    // [Local Parallax Scroll] 섹션 기반 스크롤 추적
    // ==========================================
    // 
    // 🎯 목적: 이 섹션만의 독립적인 패럴렉스 효과 구현
    // 
    // 🔍 작동 원리:
    // 1. useScroll({ target: containerRef })
    //    - 전역 scrollY가 아닌, 이 섹션의 스크롤 진행도만 추적
    //    - offset: ["start end", "end start"]
    //      → "start end": 섹션의 시작점이 화면 끝에 닿을 때 (진행도 0)
    //      → "end start": 섹션의 끝점이 화면 시작점에 닿을 때 (진행도 1)
    // 
    // 2. scrollYProgress: 0 ~ 1 사이의 값
    //    - 0: 섹션이 화면 아래 (아직 안 보임)
    //    - 0.5: 섹션이 화면 중앙
    //    - 1: 섹션이 화면 위로 벗어남
    // 
    // 💡 왜 전역 useParallaxScroll을 사용하지 않나요?
    //    - useParallaxScroll은 페이지 최상단(Hero 섹션)용으로 설계됨
    //    - Stats 섹션은 중간에 위치하므로 독립적인 추적이 필요

    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // ==========================================
    // [Parallax Transform] 스크롤 진행도 → 시각적 변화
    // ==========================================
    // 
    // 🎬 애니메이션 전략:
    // 
    // headerY (Y축 이동):
    //   - scrollYProgress [0, 0.3] → [60px, 0px]
    //   - 효과: 아래에서 위로 60px 올라오며 등장
    //   - 0.3 이후: 제자리 유지 (더 이상 움직이지 않음)
    // 
    // headerOpacity (투명도):
    //   - scrollYProgress [0, 0.3] → [0, 1]
    //   - 효과: 투명에서 선명하게 페이드인
    //   - 0.3 이후: 계속 선명하게 유지 (사라지지 않음)
    // 
    // 💡 왜 0.3에서 멈추나요?
    //    - 섹션이 화면에 30% 진입하면 완전히 나타남
    //    - 이후에는 사용자가 콘텐츠를 읽을 수 있도록 안정적으로 유지

    const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0])
    const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

    return (
        // [Semantic HTML] <section>: 독립적인 콘텐츠 섹션
        <section ref={containerRef} className={styles.container}>
            <div className={styles.content}>
                {/* 
                 * ==========================================
                 * 📌 Section Title - Fade-in Parallax
                 * ==========================================
                 * 
                 * 💡 왜 `initial/animate`가 아닌 `style`을 사용하나요?
                 * 
                 * 1. initial/animate (한 번만 실행):
                 *    - 컴포넌트가 마운트될 때 한 번만 실행되는 "진입 애니메이션"
                 *    - 예: 페이지 로드 시 페이드인
                 * 
                 * 2. style + MotionValue (계속 반응):
                 *    - 스크롤 위치에 **계속 반응**하는 "패럴렉스 애니메이션"
                 *    - MotionValue는 React 리렌더링 없이 GPU에서 직접 처리
                 *    - 60fps 부드러운 스크롤 애니메이션 가능
                 * 
                 * 🎬 현재 효과:
                 *    - 스크롤하면서 아래에서 위로 천천히 나타남
                 *    - 완전히 나타난 후에는 계속 선명하게 유지
                 *    - Hero 섹션처럼 사라지지 않음 (사용자가 계속 읽을 수 있도록)
                 */}
                <motion.div
                    className={styles.sectionHeader}
                    style={{
                        y: headerY,
                        opacity: headerOpacity
                    }}
                >
                    <h2 className={styles.sectionTitle}>Your GitHub Stats</h2>
                    <p className={styles.sectionSubtitle}>A snapshot of your development journey</p>
                </motion.div>

                {/* 
                 * ==========================================
                 * 🍱 Bento Grid Layout - 시각적 계층 구조
                 * ==========================================
                 * 
                 * 📐 레이아웃 전략:
                 * 
                 * 1. Large Cards (3개): 가장 중요한 통계
                 *    - Commits, Pull Requests, Repositories
                 *    - 50% width (2 columns)
                 *    - 큰 아이콘 + 큰 숫자 + 라벨
                 *    - 사용자의 시선을 먼저 끄는 주요 지표
                 * 
                 * 2. Small Cards (3개): 보조 통계
                 *    - Years, Days, Hours
                 *    - 33% width (3 columns)
                 *    - 숫자 중심, 아이콘 없음
                 *    - 추가 컨텍스트를 제공하는 부가 정보
                 * 
                 * 🎨 색상 전략:
                 *    - Yellow (Commits): 활동의 핵심, 따뜻한 느낌
                 *    - Blue (Pull Requests): 협업의 증거, 신뢰감
                 *    - Purple (Repositories): 창작의 결과, 창의성
                 * 
                 * 🎭 애니메이션 전략:
                 *    - whileInView: 화면에 보일 때 등장
                 *    - delay: 순차적 등장 (CARD_1 → CARD_2 → CARD_3)
                 *    - whileHover: 마우스 오버 시 살짝 확대 (피드백)
                 */}
                <div className={styles.bentoGrid}>
                    {/* 
                     * ==========================================
                     * 🟡 Large Card 1 - Commits (Yellow)
                     * ==========================================
                     * 
                     * 🎯 역할: 가장 중요한 통계 - 총 커밋 수
                     * 
                     * 🏗️ 구조:
                     * 1. cardGlow: 배경 글로우 효과 (카드에 깊이감 부여)
                     * 2. iconWrapper: 아이콘 컨테이너 (GitCommitIcon)
                     * 3. number: 숫자 표시 영역 (Counter 컴포넌트 사용)
                     * 4. label: 라벨 텍스트 ("Commits")
                     * 
                     * 🎭 애니메이션 Props 설명:
                     * 
                     * - initial: 초기 상태 (opacity: 0, scale: 0.9)
                     *   → 약간 투명하고 작게 시작
                     * 
                     * - whileInView: 화면에 보일 때의 상태 (opacity: 1, scale: 1)
                     *   → 선명하고 원본 크기로 변환
                     *   → Intersection Observer API를 내부적으로 사용
                     * 
                     * - viewport: 뷰포트 설정
                     *   → once: true (한 번만 실행, 스크롤 올렸다 내려도 재실행 안 됨)
                     *   → amount: 0.3 (카드의 30%가 화면에 보일 때 트리거)
                     * 
                     * - transition:
                     *   → duration: 애니메이션 지속 시간
                     *   → delay: CARD_1 딜레이 (순차적 등장 효과)
                     *   → ease: 이징 함수 (부드러운 감속)
                     * 
                     * - whileHover: 마우스 호버 시 상태 (scale: 1.02)
                     *   → 살짝 확대되어 사용자에게 피드백 제공
                     * 
                     * 🎨 색상 전략:
                     * - STATS_COLORS.YELLOW: 활동의 핵심, 따뜻한 느낌
                     * - glow: 배경 글로우 효과용 색상
                     * - primary: 아이콘과 숫자의 메인 색상
                     * 
                     * 🔢 Counter 컴포넌트:
                     * - value={commits}: 최종 도달할 숫자
                     * - duration: 애니메이션 지속 시간 (Large 카드는 더 길게)
                     * - 0부터 commits까지 부드럽게 카운팅 애니메이션
                     */}
                    <motion.div
                        className={`${styles.card} ${styles.cardLarge}`}
                        initial={STATS_ANIMATIONS.LARGE_CARD.INITIAL}
                        whileInView={STATS_ANIMATIONS.LARGE_CARD.ANIMATE}
                        viewport={STATS_ANIMATIONS.LARGE_CARD.VIEWPORT}
                        transition={{
                            duration: STATS_ANIMATIONS.LARGE_CARD.TRANSITION.DURATION,
                            delay: STATS_ANIMATIONS.DELAYS.CARD_1,
                            ease: STATS_ANIMATIONS.LARGE_CARD.TRANSITION.EASE
                        }}
                        whileHover={STATS_ANIMATIONS.LARGE_CARD.HOVER}
                    >
                        {/* 배경 글로우 레이어 - 카드에 깊이감과 프리미엄 느낌 부여 */}
                        <div className={styles.cardGlow} style={{ background: STATS_COLORS.YELLOW.glow }} />

                        {/* 아이콘 영역 - 시각적 식별성 향상 */}
                        <div className={styles.iconWrapper} style={{ color: STATS_COLORS.YELLOW.primary }}>
                            <GitCommitIcon size={48} className={styles.icon} />
                        </div>

                        {/* 숫자 영역 - Counter 컴포넌트로 카운팅 애니메이션 */}
                        <div className={styles.number} style={{ color: STATS_COLORS.YELLOW.primary }}>
                            <Counter value={commits} duration={STATS_ANIMATIONS.COUNTER.LARGE_DURATION} />
                        </div>

                        {/* 라벨 영역 - 통계 이름 */}
                        <div className={styles.label}>Commits</div>
                    </motion.div>

                    {/* 
                     * ==========================================
                     * 🔵 Large Card 2 - Pull Requests (Blue)
                     * ==========================================
                     * 
                     * 🎯 역할: 협업의 증거 - 병합된 PR 수
                     * 
                     * 💡 왜 Pull Requests가 중요한가요?
                     * - 코드 리뷰를 통한 품질 향상
                     * - 팀 협업 능력의 지표
                     * - 오픈소스 기여도 측정
                     * 
                     * 🎨 색상 전략:
                     * - STATS_COLORS.BLUE: 협업의 증거, 신뢰감
                     * - 파란색은 전문성과 안정감을 상징
                     * 
                     * 🔢 애니메이션 차이점:
                     * - delay: CARD_2 (첫 번째 카드보다 조금 늦게 등장)
                     * - 순차적 등장으로 사용자의 시선을 자연스럽게 유도
                     */}
                    <motion.div
                        className={`${styles.card} ${styles.cardLarge}`}
                        initial={STATS_ANIMATIONS.LARGE_CARD.INITIAL}
                        whileInView={STATS_ANIMATIONS.LARGE_CARD.ANIMATE}
                        viewport={STATS_ANIMATIONS.LARGE_CARD.VIEWPORT}
                        transition={{
                            duration: STATS_ANIMATIONS.LARGE_CARD.TRANSITION.DURATION,
                            delay: STATS_ANIMATIONS.DELAYS.CARD_2,
                            ease: STATS_ANIMATIONS.LARGE_CARD.TRANSITION.EASE
                        }}
                        whileHover={STATS_ANIMATIONS.LARGE_CARD.HOVER}
                    >
                        <div className={styles.cardGlow} style={{ background: STATS_COLORS.BLUE.glow }} />

                        <div className={styles.iconWrapper} style={{ color: STATS_COLORS.BLUE.primary }}>
                            <GitPullRequestIcon size={48} className={styles.icon} />
                        </div>

                        <div className={styles.number} style={{ color: STATS_COLORS.BLUE.primary }}>
                            <Counter value={pullRequests} duration={STATS_ANIMATIONS.COUNTER.LARGE_DURATION} />
                        </div>

                        <div className={styles.label}>Pull Requests</div>
                    </motion.div>

                    {/* 
                     * ==========================================
                     * 🟣 Large Card 3 - Repositories (Purple)
                     * ==========================================
                     * 
                     * 🎯 역할: 창작의 결과 - 보유 리포지토리 수
                     * 
                     * 💡 왜 Repositories가 중요한가요?
                     * - 프로젝트 다양성의 지표
                     * - 창의적 산출물의 양
                     * - 기술 스택 폭의 반영
                     * 
                     * 🎨 색상 전략:
                     * - STATS_COLORS.PURPLE: 창작의 결과, 창의성
                     * - 보라색은 창의성과 독창성을 상징
                     * 
                     * 🔢 애니메이션 차이점:
                     * - delay: CARD_3 (세 번째로 등장)
                     * - Large 카드 3개가 순차적으로 등장하는 마지막 카드
                     */}
                    <motion.div
                        className={`${styles.card} ${styles.cardLarge}`}
                        initial={STATS_ANIMATIONS.LARGE_CARD.INITIAL}
                        whileInView={STATS_ANIMATIONS.LARGE_CARD.ANIMATE}
                        viewport={STATS_ANIMATIONS.LARGE_CARD.VIEWPORT}
                        transition={{
                            duration: STATS_ANIMATIONS.LARGE_CARD.TRANSITION.DURATION,
                            delay: STATS_ANIMATIONS.DELAYS.CARD_3,
                            ease: STATS_ANIMATIONS.LARGE_CARD.TRANSITION.EASE
                        }}
                        whileHover={STATS_ANIMATIONS.LARGE_CARD.HOVER}
                    >
                        <div className={styles.cardGlow} style={{ background: STATS_COLORS.PURPLE.glow }} />

                        <div className={styles.iconWrapper} style={{ color: STATS_COLORS.PURPLE.primary }}>
                            <RepoIcon size={48} className={styles.icon} />
                        </div>

                        <div className={styles.number} style={{ color: STATS_COLORS.PURPLE.primary }}>
                            <Counter value={repositories} duration={STATS_ANIMATIONS.COUNTER.LARGE_DURATION} />
                        </div>

                        <div className={styles.label}>Repositories</div>
                    </motion.div>

                    {/* 
                     * ==========================================
                     * 🟡 Small Card 1 - Years (Yellow)
                     * ==========================================
                     * 
                     * 🎯 역할: 보조 통계 - GitHub 계정 연령
                     * 
                     * 🏗️ Small Card의 특징:
                     * - 아이콘 없음 (숫자에 집중)
                     * - 33% width (3 columns) - Large보다 작음
                     * - 더 빠른 애니메이션 (SMALL_DURATION)
                     * - 추가 컨텍스트를 제공하는 부가 정보
                     * 
                     * 🏷️ 레이블 구조:
                     * - smallLabel: 주 레이블 ("Years")
                     * - smallSublabel: 보조 레이블 ("on GitHub")
                     * - 2단 구조로 정보 명확성 향상
                     * 
                     * 💡 왜 Yellow를 사용하나요?
                     * - Commits와 동일한 색상 계열
                     * - 시간의 흐름을 따뜻하게 표현
                     */}
                    <motion.div
                        className={`${styles.card} ${styles.cardSmall}`}
                        initial={STATS_ANIMATIONS.SMALL_CARD.INITIAL}
                        whileInView={STATS_ANIMATIONS.SMALL_CARD.ANIMATE}
                        viewport={STATS_ANIMATIONS.SMALL_CARD.VIEWPORT}
                        transition={{
                            duration: STATS_ANIMATIONS.SMALL_CARD.TRANSITION.DURATION,
                            delay: STATS_ANIMATIONS.DELAYS.SMALL_1,
                            ease: STATS_ANIMATIONS.SMALL_CARD.TRANSITION.EASE
                        }}
                        whileHover={STATS_ANIMATIONS.SMALL_CARD.HOVER}
                    >
                        {/* 숫자 영역 - Small 카드는 아이콘 없이 숫자만 */}
                        <div className={styles.smallNumber} style={{ color: STATS_COLORS.YELLOW.primary }}>
                            <Counter value={accountAge} duration={STATS_ANIMATIONS.COUNTER.SMALL_DURATION} />
                        </div>

                        {/* 2단 레이블 구조 - 주 레이블 + 보조 레이블 */}
                        <div className={styles.smallLabel}>
                            Years
                            <span className={styles.smallSublabel}>on GitHub</span>
                        </div>
                    </motion.div>

                    {/* 
                     * ==========================================
                     * 🔵 Small Card 2 - Days (Blue)
                     * ==========================================
                     * 
                     * 🎯 역할: 보조 통계 - 활동 일수
                     * 
                     * 💡 왜 Days가 중요한가요?
                     * - 일관성과 꾸준함의 지표
                     * - 계정 연령보다 실제 활동도를 더 잘 반영
                     * 
                     * 🎨 색상 전략:
                     * - STATS_COLORS.BLUE: Pull Requests와 동일한 색상 계열
                     * - 활동의 지속성을 신뢰감 있게 표현
                     */}
                    <motion.div
                        className={`${styles.card} ${styles.cardSmall}`}
                        initial={STATS_ANIMATIONS.SMALL_CARD.INITIAL}
                        whileInView={STATS_ANIMATIONS.SMALL_CARD.ANIMATE}
                        viewport={STATS_ANIMATIONS.SMALL_CARD.VIEWPORT}
                        transition={{
                            duration: STATS_ANIMATIONS.SMALL_CARD.TRANSITION.DURATION,
                            delay: STATS_ANIMATIONS.DELAYS.SMALL_2,
                            ease: STATS_ANIMATIONS.SMALL_CARD.TRANSITION.EASE
                        }}
                        whileHover={STATS_ANIMATIONS.SMALL_CARD.HOVER}
                    >
                        <div className={styles.smallNumber} style={{ color: STATS_COLORS.BLUE.primary }}>
                            <Counter value={activeDays} duration={STATS_ANIMATIONS.COUNTER.SMALL_DURATION} />
                        </div>

                        <div className={styles.smallLabel}>
                            Days
                            <span className={styles.smallSublabel}>active</span>
                        </div>
                    </motion.div>

                    {/* 
                     * ==========================================
                     * 🟣 Small Card 3 - Hours (Purple)
                     * ==========================================
                     * 
                     * 🎯 역할: 보조 통계 - 추정 코딩 시간
                     * 
                     * 💡 왜 Hours가 중요한가요?
                     * - 실제 투입한 노력의 양
                     * - 커밋 수만으로는 알 수 없는 시간 투자
                     * 
                     * 🎨 색상 전략:
                     * - STATS_COLORS.PURPLE: Repositories와 동일한 색상 계열
                     * - 창작 활동에 투입된 시간을 창의적으로 표현
                     * 
                     * 🔢 애니메이션 차이점:
                     * - delay: SMALL_3 (마지막 Small 카드)
                     * - 모든 카드가 순차적으로 등장하는 마지막 요소
                     */}
                    <motion.div
                        className={`${styles.card} ${styles.cardSmall}`}
                        initial={STATS_ANIMATIONS.SMALL_CARD.INITIAL}
                        whileInView={STATS_ANIMATIONS.SMALL_CARD.ANIMATE}
                        viewport={STATS_ANIMATIONS.SMALL_CARD.VIEWPORT}
                        transition={{
                            duration: STATS_ANIMATIONS.SMALL_CARD.TRANSITION.DURATION,
                            delay: STATS_ANIMATIONS.DELAYS.SMALL_3,
                            ease: STATS_ANIMATIONS.SMALL_CARD.TRANSITION.EASE
                        }}
                        whileHover={STATS_ANIMATIONS.SMALL_CARD.HOVER}
                    >
                        <div className={styles.smallNumber} style={{ color: STATS_COLORS.PURPLE.primary }}>
                            <Counter value={totalHours} duration={STATS_ANIMATIONS.COUNTER.SMALL_DURATION} />
                        </div>

                        <div className={styles.smallLabel}>
                            Hours
                            <span className={styles.smallSublabel}>coding</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
