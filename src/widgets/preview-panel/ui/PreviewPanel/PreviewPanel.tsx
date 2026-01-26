'use client'

import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { useProfileExport } from '@/features/profile-export'
import { MarkdownViewer } from '@/entities/profile/ui'
import { APP_CONFIG } from '@/shared/config/constants'
import styles from './PreviewPanel.module.css'
import { usePreviewPanel, PREVIEW_TABS } from '../../model/usePreviewPanel'

export function PreviewPanel() {
    // We only need specific selectors for rendering if needed, or let children handle it.
    // However, PreviewPanel main job is layout switching.
    const { handleCopy, handleDownload } = useProfileExport()
    const { activeTab, setActiveTab, getGeneratedMarkdown } = usePreviewPanel()

    return (
        <div className={styles.rightPanel}>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === PREVIEW_TABS.PREVIEW ? styles.active : ''}`}
                    onClick={() => setActiveTab(PREVIEW_TABS.PREVIEW)}
                >
                    {APP_CONFIG.BUTTONS.PREVIEW}
                </button>
                <button
                    className={`${styles.tab} ${activeTab === PREVIEW_TABS.CODE ? styles.active : ''}`}
                    onClick={() => setActiveTab(PREVIEW_TABS.CODE)}
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
                                {activeTab === PREVIEW_TABS.PREVIEW ? APP_CONFIG.TITLES.PREVIEW_WINDOW : APP_CONFIG.TITLES.CODE_WINDOW}
                            </div>
                        </div>
                        <div className={styles.windowContent}>
                            {activeTab === PREVIEW_TABS.PREVIEW && <MarkdownViewer />}
                            {activeTab === PREVIEW_TABS.CODE && (
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
