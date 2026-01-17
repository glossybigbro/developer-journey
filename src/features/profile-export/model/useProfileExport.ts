import { useState } from 'react'
import { generateMarkdown } from '@/entities/profile/lib/markdown/generator'
import { APP_CONFIG } from '@/app/config/constants'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'

export function useProfileExport() {

    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = async () => {
        const markdown = generateMarkdown(useProfileStore.getState())

        try {
            await navigator.clipboard.writeText(markdown)
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleDownload = () => {
        const markdown = generateMarkdown(useProfileStore.getState())
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
