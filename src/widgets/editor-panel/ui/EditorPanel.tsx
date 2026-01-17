'use client'

import { SectionBuilder } from '@/features/section-builder'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { APP_CONFIG } from '@/app/config/constants'
import styles from './EditorPanel.module.css'

export function EditorPanel() {
    const { setStep } = useProfileStore()

    const handleChangeUser = () => {
        setStep('hero')
    }

    return (
        <div className={styles.leftPanel}>
            <div className={styles.panelHeader}>
                <h3 className={styles.panelTitle}>{APP_CONFIG.TITLES.SECTION_BUILDER}</h3>
                <button
                    className={styles.changeUserButton}
                    onClick={handleChangeUser}
                    aria-label="Change User"
                >
                    {APP_CONFIG.BUTTONS.CHANGE_USER}
                </button>
            </div>

            <div className={styles.sections}>
                <SectionBuilder />
            </div>
        </div>
    )
}
