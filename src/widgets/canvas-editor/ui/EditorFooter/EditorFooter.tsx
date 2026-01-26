import { FOOTER_LABELS } from '@/entities/block/config/constants'
import styles from './EditorFooter.module.css'

interface EditorFooterProps {
    onTogglePreview: () => void
    onExportMarkdown: () => void
    onDownload: () => void
}

export function EditorFooter({
    onTogglePreview,
    onExportMarkdown,
    onDownload,
}: EditorFooterProps) {
    return (
        <div className={styles.footer}>
            <button className={styles.previewButton} onClick={onTogglePreview}>
                {FOOTER_LABELS.PREVIEW_MODE}
            </button>
            <button className={styles.exportButton} onClick={onExportMarkdown}>
                {FOOTER_LABELS.EXPORT_MD}
            </button>
            <button className={styles.downloadButton} onClick={onDownload}>
                {FOOTER_LABELS.DOWNLOAD}
            </button>
        </div>
    )
}
