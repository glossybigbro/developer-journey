'use client'

import { useState } from 'react'
import { useProfileStore } from '../../../../entities/profile/model/useProfileStore'
import { APP_CONFIG } from '../../../../shared/config/constants'
import { HudTransmission } from '../HudTransmission/HudTransmission'
import { ReleaseModal } from '../ReleaseModal/ReleaseModal'
import styles from './OnboardingCard.module.css'

export function OnboardingCard() {
    const { username, setUsername, setStep, verifyUser } = useProfileStore()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isInputLocked, setIsInputLocked] = useState(!!username)
    const [showNotice, setShowNotice] = useState(false)

    const handleStart = async () => {
        if (isInputLocked && username) {
            setStep('generator')
            return
        }

        if (!username.trim()) {
            setError(APP_CONFIG.ERRORS.EMPTY_USERNAME)
            return
        }

        setError(null)
        setIsLoading(true)

        try {
            await verifyUser(username)
            setStep('generator')
        } catch (err) {
            // Display the specific error message from the API
            const errorMessage = err instanceof Error ? err.message : APP_CONFIG.ERRORS.NETWORK_ERROR
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleUnlock = () => {
        setIsInputLocked(false)
        setUsername('')
    }

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
                            <button onClick={handleUnlock} className={styles.unlockButton}>
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

            {/* Fixed Position HUD Element */}
            <HudTransmission onClick={() => setShowNotice(true)} />

            <ReleaseModal isOpen={showNotice} onClose={() => setShowNotice(false)} />
        </>
    )
}
