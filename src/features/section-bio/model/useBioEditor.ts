import { useRef, useEffect } from 'react'
import { useBioList } from './useBioList'
import { useSortableSensors } from './useSortableSensors'
import { autoResizeTextarea } from '@/shared/lib/utils/styleUtils'

/**
 * Headless Hook for Bio Editor Logic
 * separates "how it works" (refs, effects, sensors) from "how it looks" (JSX)
 */
export function useBioEditor() {
    // 1. Data Logic
    const bioList = useBioList()
    const { bio } = bioList

    // 2. UI Refs & Sensors
    const headingRef = useRef<HTMLTextAreaElement>(null)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const sensors = useSortableSensors()

    // 3. Side Effects (Auto-resize)
    useEffect(() => {
        autoResizeTextarea(headingRef.current)
    }, [bio?.heading])

    useEffect(() => {
        autoResizeTextarea(descriptionRef.current)
    }, [bio?.description])

    return {
        ...bioList,
        refs: {
            heading: headingRef,
            description: descriptionRef
        },
        sensors
    }
}
