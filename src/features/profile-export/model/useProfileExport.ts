import { useState, useCallback } from 'react'
import { generateMarkdown } from '@/entities/profile/lib/markdown/generator'
import { transformStoreToConfig } from '@/entities/profile/lib/mappers'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'

const EXPORT_CONFIG = {
    FILENAME: 'README.md',
    MIME_TYPE: 'text/markdown'
} as const

export function useProfileExport() {

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = useCallback(async () => {
        const store = useProfileStore.getState()
        const config = transformStoreToConfig(store)
        const markdown = generateMarkdown(config)

        try {
            await navigator.clipboard.writeText(markdown)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy to clipboard:', err)
            // Optional: Add toast notification logic here
        }
    }, [])

    const handleDownload = useCallback(() => {
        const store = useProfileStore.getState()
        const config = transformStoreToConfig(store)
        const markdown = generateMarkdown(config)

        try {
            const blob = new Blob([markdown], { type: EXPORT_CONFIG.MIME_TYPE })
            const url = URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.download = EXPORT_CONFIG.FILENAME
            document.body.appendChild(link)
            link.click()

            // Cleanup
            setTimeout(() => {
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
            }, 100)
        } catch (err) {
            console.error('Failed to download file:', err)
        }
    }, [])

    return { handleCopy, handleDownload, isCopied }
}
