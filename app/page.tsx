'use client'

import { SpaceBackground } from '../src/widgets/space-background'
import { GeneratorHero } from '../src/widgets/generator-hero'

/**
 * 📘 [PAGE] GitHub Profile Generator
 * 
 * 메인 랜딩 페이지
 * - 우주 배경
 * - Hero 섹션 + Input Form
 */
export default function Home() {
  return (
    <>
      <SpaceBackground />
      <GeneratorHero />
    </>
  )
}
