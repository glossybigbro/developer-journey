'use client'

import { useState } from 'react'
import { SpaceBackground } from '@/shared/ui'
import { EditorPanel } from '@/widgets/editor-panel'
import { CanvasEditor } from '@/widgets/canvas-editor'
import { OnboardingCard } from '@/features/onboarding'
import { HudTransmission, ReleaseModal } from '@/features/release-notification'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import styles from './page.module.css'

export default function GeneratorPage() {
    const { currentStep } = useProfileStore()
    const [showNotice, setShowNotice] = useState(false)

    return (
        <>
            <SpaceBackground />

            <div className={styles.pageContainer}>
                {currentStep === 'hero' ? (
                    <div className={styles.onboardingWrapper}>
                        <OnboardingCard />
                        <HudTransmission onClick={() => setShowNotice(true)} />
                        <ReleaseModal isOpen={showNotice} onClose={() => setShowNotice(false)} />
                    </div>
                ) : (
                    <main className={styles.editorLayout}>
                        <EditorPanel />
                        <CanvasEditor />
                    </main>
                )}
            </div>
        </>
    )
}
