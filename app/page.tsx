'use client'

import { SpaceBackground } from '../src/shared/ui/space-background'
import { GeneratorHero } from '@/widgets/generator-hero'

export default function GeneratorPage() {
    return (
        <>
            <SpaceBackground />

            <div className="relative z-10 min-h-screen">


                <main className="w-full h-screen overflow-hidden">
                    <GeneratorHero />
                </main>
            </div>
        </>
    )
}
