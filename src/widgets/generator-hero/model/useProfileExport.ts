import { generateMarkdown } from '../../../shared/lib/markdown/generator'
import { APP_CONFIG } from '../../../shared/config/constants'
import { useProfileStore } from '../../../entities/profile/model/useProfileStore'

export function useProfileExport() {

    const handleCopy = async () => {
        const markdown = generateMarkdown(useProfileStore.getState())
        const blob = new Blob([markdown], { type: 'text/markdown' })
        const item = new ClipboardItem({ "text/plain": blob })

        try {
            await navigator.clipboard.write([item])
            alert(APP_CONFIG.BUTTONS.ALERT_COPY)
        } catch (err) {
            console.error('Failed to copy:', err)
            // Fallback
            try {
                await navigator.clipboard.writeText(markdown)
                alert(APP_CONFIG.BUTTONS.ALERT_COPY)
            } catch (fallbackErr) {
                console.error('Fallback failed:', fallbackErr)
            }
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

    return { handleCopy, handleDownload }
}
