import { useState } from 'react'
import { generateMarkdown } from '@/entities/profile/lib/markdown/generator'
import { transformStoreToConfig } from '@/entities/profile/lib/mappers'
import { APP_CONFIG } from '@/shared/config/constants'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'

export function useProfileExport() {

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async () => {
        const store = useProfileStore.getState()

        // Adapter: Transform store state to generator config using central mapper
        const config = transformStoreToConfig(store)

        const markdown = generateMarkdown(config)

        try {
            await navigator.clipboard.writeText(markdown)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleDownload = () => {
        const store = useProfileStore.getState()

        // Adapter: Transform store state to generator config using central mapper
        const config = transformStoreToConfig(store)

        const markdown = generateMarkdown(config)
        const blob = new Blob([markdown], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'README.md'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    return { handleCopy, handleDownload, isCopied }
}
