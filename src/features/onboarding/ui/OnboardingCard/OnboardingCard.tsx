'use client'

import { useOnboarding } from '../../model/useOnboarding'
import { APP_CONFIG } from '@/app/config/constants'
import styles from './OnboardingCard.module.css'

export function OnboardingCard() {
    const {
        username,
        setUsername,
        isLoading,
        error,
        isInputLocked,
        handleStart,
        handleUnlock
    } = useOnboarding()

    return (
        <>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{APP_CONFIG.TITLES.MAIN}</h1>
                    <p className={styles.subtitle}>{APP_CONFIG.SUBTITLES.MAIN}</p>
                </div>

                <div className={styles.inputRow}>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
                            placeholder={APP_CONFIG.PLACEHOLDERS.USERNAME}
                            className={styles.input}
                            disabled={isInputLocked || isLoading}
                        />
                        {isInputLocked && (
                            <button onClick={handleUnlock} className={styles.unlockButton} aria-label="Reset">
                                ✕
                            </button>
                        )}
                    </div>

                    <button
                        onClick={handleStart}
                        disabled={isLoading}
                        className={styles.startButton}
                    >
                        {isLoading ? APP_CONFIG.BUTTONS.VERIFYING : (isInputLocked ? APP_CONFIG.BUTTONS.CONTINUE : APP_CONFIG.BUTTONS.VERIFY)}
                    </button>
                </div>

                {error && <p className={styles.error}>{error}</p>}
            </div>

        </>
    )
}
