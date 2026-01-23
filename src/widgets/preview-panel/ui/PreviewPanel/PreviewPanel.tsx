'use client'

import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { useProfileExport } from '@/features/profile-export'
import { MarkdownViewer } from '@/entities/profile/ui'
import { APP_CONFIG } from '@/shared/config/constants'
import styles from './PreviewPanel.module.css'
import { usePreviewPanel } from '../../model/usePreviewPanel'

export function PreviewPanel() {
    // We only need specific selectors for rendering if needed, or let children handle it.
    // However, PreviewPanel main job is layout switching.
    const { handleCopy, handleDownload } = useProfileExport()
    const { activeTab, setActiveTab, getGeneratedMarkdown } = usePreviewPanel()

    return (
        <div className={styles.rightPanel}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'preview' ? styles.active : ''}`}
                    onClick={() => setActiveTab('preview')}
                >
                    {APP_CONFIG.BUTTONS.PREVIEW}
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'code' ? styles.active : ''}`}
                    onClick={() => setActiveTab('code')}
                >
                    {APP_CONFIG.BUTTONS.CODE}
                </button>
            </div>

            <div className={styles.previewContainer}>
                <div className={styles.previewBorder}>
                    <div className={styles.previewWindow}>
                        <div className={styles.windowHeader}>
                            <div className={styles.windowDots}>
                                <span></span><span></span><span></span>
                            </div>
                            <div className={styles.windowTitle}>
                                {activeTab === 'preview' ? APP_CONFIG.TITLES.PREVIEW_WINDOW : APP_CONFIG.TITLES.CODE_WINDOW}
                            </div>
                        </div>
                        <div className={styles.windowContent}>
                            {activeTab === 'preview' && <MarkdownViewer />}
                            {activeTab === 'code' && (
                                <pre className={styles.codeBlock}>
                                    {getGeneratedMarkdown()}
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button className={styles.copyButton} onClick={handleCopy}>{APP_CONFIG.BUTTONS.COPY}</button>
                <button className={styles.downloadButton} onClick={handleDownload}>{APP_CONFIG.BUTTONS.DOWNLOAD}</button>
            </div>
        </div>
    )
}
