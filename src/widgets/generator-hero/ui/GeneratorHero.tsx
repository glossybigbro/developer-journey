/**
 * 🎯 [WIDGET] GeneratorHero (생성기 히어로 섹션)
 * 
 * @layer widgets/generator-hero
 * @description
 * GitHub Profile Generator 페이지의 메인 Hero 섹션입니다.
 * GeneratorForm feature를 포함하여 사용자가 프로필을 생성할 수 있도록 합니다.
 * 
 * 🏗️ FSD 아키텍처 역할 (Widget Layer):
 * - **조립(Composition)**: Feature(GeneratorForm)를 조립하여 페이지 섹션 구성
 * - **레이아웃**: 타이틀, 서브타이틀, 폼을 하나의 카드로 묶어 시각적 계층 구조 제공
 * 
 * 🎨 디자인 특징:
 * - **글래스모피즘 카드**: 반투명 배경 + 블러 효과
 * - **그라데이션 텍스트**: "Generator" 텍스트에 보라-파랑 그라데이션 적용
 * - **중앙 정렬**: 화면 중앙에 배치하여 사용자 시선 집중
 * 
 * 🎓 [학습 목표]:
 * 1. **Widget Pattern**: Feature를 조합하여 더 큰 UI 단위 구성
 * 2. **Composition**: 컴포넌트 조합을 통한 재사용성 향상
 * 3. **Visual Hierarchy**: 타이틀 → 서브타이틀 → 폼 순서로 시각적 흐름 유도
 */

'use client'

import GeneratorForm from '../../../features/generator-form/ui/GeneratorForm'
import styles from './GeneratorHero.module.css'

/**
 * 🌟 GeneratorHero 컴포넌트
 * 
 * @description
 * GitHub Profile Generator의 메인 섹션으로,
 * 사용자에게 프로필 생성 기능을 제공합니다.
 */
export default function GeneratorHero() {
    return (
        // 컨테이너: 화면 중앙 정렬 및 여백 설정
        <div className={styles.container}>
            {/* 글래스모피즘 카드 */}
            <div className={styles.card}>
                {/* 메인 타이틀 */}
                <h1 className={styles.title}>
                    GitHub Profile
                    <br />
                    {/* 그라데이션 강조 텍스트 */}
                    <span className={styles.gradient}>Generator</span>
                </h1>

                {/* 서브타이틀 */}
                <p className={styles.subtitle}>
                    Create your developer journey card
                </p>

                {/* 프로필 생성 폼 (Feature) */}
                <GeneratorForm />
            </div>
        </div>
    )
}
