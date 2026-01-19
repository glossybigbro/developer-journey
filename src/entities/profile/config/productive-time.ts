/**
 * Productive Time Feature Configuration
 * 
 * @description
 * constants and configuration for the Productive Time (Peak Activity) feature.
 * Separated from UI and Logic to verify Single Source of Truth.
 */

export const PRODUCTIVE_TIME_STYLES = [
    { id: 'cyber', label: 'Git Graph', icon: '📊' },
    { id: 'modern', label: 'Modern Square', icon: '🏙️' },
    { id: 'minimal', label: 'Minimal Dot', icon: '🕛' },
    { id: 'terminal', label: 'Terminal', icon: '⌨️' },
    { id: 'slider', label: 'Control Panel', icon: '🎛️' },
] as const

export type ProductiveTimeStyleId = typeof PRODUCTIVE_TIME_STYLES[number]['id']

export const PRODUCTIVE_TIME_TITLES = {
    morning: "I'm an Early Bird 🌞",
    daytime: "I'm a Daytime Coder ☀️",
    evening: "I'm an Evening Developer 🌆",
    night: "I'm a Night Owl 🦉",
    flexible: "I'm a Flexible Developer 🌈"
} as const

export const PRODUCTIVE_TIME_LABELS = {
    morning: "Early Bird",
    daytime: "Daytime Coder",
    evening: "Evening Developer",
    night: "Night Owl",
    flexible: "Flexible Developer"
} as const
