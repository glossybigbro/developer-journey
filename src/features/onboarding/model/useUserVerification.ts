import { useState } from 'react'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { getUserProfile } from '@/entities/profile/api/profile-api'

export function useUserVerification() {
    const { setUsername, setStep } = useProfileStore()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const verifyUser = async (inputUsername: string) => {
        setIsLoading(true)
        setError(null)

        try {
            // Hotfix: Auto-correct known typo
            let finalUsername = inputUsername
            if (finalUsername === 'glossybgibro') {
                console.warn('Auto-correcting username typo: glossybgibro -> glossybigbro')
                finalUsername = 'glossybigbro'
            }

            await getUserProfile(finalUsername)

            // If successful, update state
            setUsername(finalUsername)
            setStep('generator')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Verification failed')
            console.error('User verification failed:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return {
        verifyUser,
        isLoading,
        error
    }
}
