import { useState, useEffect } from 'react'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { useUserVerification } from './useUserVerification'
import { APP_CONFIG } from '@/shared/config/constants'

export function useOnboarding() {
    const { username, setUsername, setStep } = useProfileStore()
    const { verifyUser, isLoading, error: apiError } = useUserVerification()

    const [localError, setLocalError] = useState<string | null>(null)
    const [isInputLocked, setIsInputLocked] = useState(!!username)

    // Clear local error when API error appears or username changes
    useEffect(() => {
        if (apiError) setLocalError(null)
    }, [apiError])

    const handleStart = async () => {
        if (isInputLocked && username) {
            setStep('generator')
            return
        }

        if (!username.trim()) {
            setLocalError(APP_CONFIG.ERRORS.EMPTY_USERNAME)
            return
        }

        setLocalError(null)
        await verifyUser(username)
    }

    const handleUnlock = () => {
        setIsInputLocked(false)
        setUsername('')
        setLocalError(null)
    }

    return {
        username,
        setUsername,
        isLoading,
        error: localError || apiError,
        isInputLocked,
        handleStart,
        handleUnlock
    }
}
