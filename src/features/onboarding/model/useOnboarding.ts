import { useState } from 'react'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { APP_CONFIG } from '@/shared/config/constants'

export function useOnboarding() {
    const { username, setUsername, setStep, verifyUser } = useProfileStore()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isInputLocked, setIsInputLocked] = useState(!!username)

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

    return {
        username,
        setUsername,
        isLoading,
        error,
        isInputLocked,
        handleStart,
        handleUnlock
    }
}
