import { RefObject, useCallback } from 'react'
import { ALERT_TYPES, ALERT_TEMPLATES } from '../config/constants'

interface UseTextEditorProps {
    onContentChange: (content: string) => void
    textareaRef: RefObject<HTMLTextAreaElement | null>
}

export function useTextEditor({ onContentChange, textareaRef }: UseTextEditorProps) {

    const insertText = useCallback((before: string, after: string = '') => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value

        // Defensive check for potential null value
        const safeText = text || ''

        const selectedText = safeText.substring(start, end)
        const newText = safeText.substring(0, start) + before + selectedText + after + safeText.substring(end)

        onContentChange(newText)

        // Restore focus and cursor position
        requestAnimationFrame(() => {
            if (textarea) {
                textarea.focus()
                const newCursorPos = end + before.length
                textarea.setSelectionRange(newCursorPos, newCursorPos)
            }
        })
    }, [onContentChange, textareaRef])

    const applyAlert = useCallback((type: keyof typeof ALERT_TYPES) => {
        const template = ALERT_TEMPLATES[type]
        if (template) {
            insertText(template, '')
        }
    }, [insertText])

    return {
        insertText,
        applyAlert
    }
}
