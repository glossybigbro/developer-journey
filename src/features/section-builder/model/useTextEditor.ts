import { RefObject } from 'react'

interface UseTextEditorProps {
    onContentChange: (content: string) => void
    textareaRef: RefObject<HTMLTextAreaElement | null>
}

export function useTextEditor({ onContentChange, textareaRef }: UseTextEditorProps) {

    const insertText = (before: string, after: string = '') => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        // Logic to insert text at cursor position
        const selectedText = text.substring(start, end)
        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)

        onContentChange(newText)

        // Restore focus and cursor position
        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + before.length, end + before.length)
        }, 0)
    }

    const applyAlert = (type: 'NOTE' | 'TIP' | 'WARNING' | 'CAUTION') => {
        const prefix = `> [!${type}]\n> `
        insertText(prefix, '')
    }

    return {
        textareaRef,
        insertText,
        applyAlert
    }
}
