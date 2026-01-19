'use client'

import { useState } from 'react'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { getUserProductiveTime } from '@/entities/profile/api/profile-api'
import { getHabitLabel } from '@/entities/profile/lib/markdown/ascii-art'
import { hexToRgba } from '@/shared/lib/utils/styleUtils'
import styles from './SectionBuilder.module.css'

import { PRODUCTIVE_TIME_STYLES } from '@/entities/profile/config/productive-time'

export function ProductiveTimeSettings() {
    const {
        accentColor,
        productiveTime,
        setProductiveTimeStyle,
        setProductiveTimeStats,
        username
    } = useProfileStore()

    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // 선택된 테마 스타일
    const getSelectedStyle = (color: string) => ({
        background: hexToRgba(color, 0.1),
        borderColor: hexToRgba(color, 0.5),
        color: color,
        boxShadow: `0 0 15px ${hexToRgba(color, 0.2)}`,
        textShadow: `0 0 8px ${hexToRgba(color, 0.5)}`,
    })

    const handleAnalyze = async () => {
        if (!username) return

        setIsAnalyzing(true)
        // Reset previous stats to trigger animation/refresh
        setProductiveTimeStats({
            morning: 0, daytime: 0, evening: 0, night: 0,
            commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
        })

        try {
            // Real API Call
            // Note: In PROD, we might want to cache this or use React Query.
            // For now, direct call is fine for this specific interaction.
            const stats = await getUserProductiveTime(username)

            // Artificial delay for UX (so user sees the spinner and feels the "processing")
            // 800ms is a sweet spot for "doing work" feeling without annoyance.
            await new Promise(resolve => setTimeout(resolve, 800))

            setProductiveTimeStats(stats)
        } catch (error) {
            console.error('Analysis failed:', error)
            // Fallback to zero stats on error
            setProductiveTimeStats({
                morning: 0, daytime: 0, evening: 0, night: 0,
                commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <div className={styles.popOverContent}>
            {/* 1. Style Selector */}
            <div className={styles.settingsSection}>
                <div className={styles.sectionTitle}>Visual Style</div>
                <div className={styles.styleGrid}>
                    {PRODUCTIVE_TIME_STYLES.map((style) => {
                        const isSelected = productiveTime.style === style.id
                        return (
                            <button
                                key={style.id}
                                onClick={() => setProductiveTimeStyle(style.id)}
                                className={styles.styleCard}
                                style={isSelected ? getSelectedStyle(accentColor) : {}}
                            >
                                <span className={styles.styleIcon}>{style.icon}</span>
                                <span className={styles.styleLabel}>{style.label}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* 2. Analysis Trigger */}
            <div className={styles.settingsSection}>
                <div className={styles.sectionTitle}>Data Analysis</div>
                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className={styles.analyzeButton}
                    style={{ borderColor: accentColor, color: accentColor }}
                >
                    {isAnalyzing ? (
                        <>
                            <span className={styles.spinner}></span>
                            Analyzing {username}'s commits...
                        </>
                    ) : (
                        <>
                            <span>🔍</span> Analyze Recent Activity
                        </>
                    )}
                </button>
                <p className={styles.dataNote}>
                    Analyzes up to 300 recent public commits to determine your current habit.
                </p>
                {productiveTime.isAnalyzed && (
                    <div className={styles.analysisResult}>
                        <span style={{ color: '#8b5cf6' }}>{getHabitLabel(productiveTime.stats)} detected! 🦉</span>
                    </div>
                )}
            </div>
        </div>
    )
}
