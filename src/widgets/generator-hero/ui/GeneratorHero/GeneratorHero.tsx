'use client'

import { SectionBuilder } from '../../../../features/section-builder'
import { useProfileStore } from '../../../../entities/profile/model/useProfileStore'
import { APP_CONFIG } from '../../../../shared/config/constants'
import { OnboardingCard } from '../OnboardingCard'
import { PreviewPanel } from '../PreviewPanel'
import styles from './GeneratorHero.module.css'

export function GeneratorHero() {
    const { username, setUsername, setStep, currentStep, setLastValidUsername } = useProfileStore()

    const handleChangeUser = () => {
        setStep('hero')
    }

    if (currentStep === 'hero') {
        return (
            <div className={styles.onboardingContainer}>
                <OnboardingCard />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.leftPanel}>
                <div className={styles.panelHeader}>
                    <h3 className={styles.panelTitle}>{APP_CONFIG.TITLES.SECTION_BUILDER}</h3>
                    <button className={styles.changeUserButton} onClick={handleChangeUser}>
                        {APP_CONFIG.BUTTONS.CHANGE_USER}
                    </button>
                </div>

                <div className={styles.sections}>
                    <SectionBuilder />
                </div>
            </div>

            <PreviewPanel />
        </div>
    )
}
