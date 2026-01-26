import { useState } from 'react'
import { getUserProductiveTime } from '@/entities/profile/api/profile-api'
import { useProfileStore } from '@/entities/profile/model/useProfileStore'
import { hexToRgba } from '@/shared/lib/utils/styleUtils'

export function useProductiveTimeSettings() {
    const {
        accentColor,
        productiveTime,
        setProductiveTimeStyle,
        setProductiveTimeStats,
        username
    } = useProfileStore()

    const [isAnalyzing, setIsAnalyzing] = useState(false)

    // Style helper
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
        setProductiveTimeStats({
            morning: 0, daytime: 0, evening: 0, night: 0,
            commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
        })

        try {
            const stats = await getUserProductiveTime(username)
            await new Promise(resolve => setTimeout(resolve, 800))
            setProductiveTimeStats(stats)
        } catch (error) {
            console.error('Analysis failed:', error)
            setProductiveTimeStats({
                morning: 0, daytime: 0, evening: 0, night: 0,
                commits: { morning: 0, daytime: 0, evening: 0, night: 0 }
            })
        } finally {
            setIsAnalyzing(false)
        }
    }

    return {
        accentColor,
        productiveTime,
        setProductiveTimeStyle,
        isAnalyzing,
        handleAnalyze,
        getSelectedStyle,
        username
    }
}
