import { useProfileStore } from '@/entities/profile/model/useProfileStore'

export function useEditorPanel() {
    const { setStep, username } = useProfileStore()

    const handleChangeUser = () => {
        setStep('hero')
    }

    return {
        username,
        handleChangeUser
    }
}
