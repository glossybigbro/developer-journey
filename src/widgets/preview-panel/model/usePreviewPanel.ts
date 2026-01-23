import { useState } from 'react'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { transformStoreToConfig } from '@/entities/profile/lib/mappers'
import { generateMarkdown } from '@/entities/profile/lib/markdown/generator'

export function usePreviewPanel() {
    const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
    const store = useProfileStore()

    const generateConfig = () => {
        return transformStoreToConfig(store)
    }

    const getGeneratedMarkdown = () => {
        const config = generateConfig()
        return generateMarkdown(config)
    }

    return {
        activeTab,
        setActiveTab,
        generateConfig,
        getGeneratedMarkdown
    }
}
