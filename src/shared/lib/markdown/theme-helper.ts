/**
 * Theme Helper Utilities
 * 
 * @description
 * Centralized theme selection logic following DRY principle.
 * Maps template names to their corresponding theme configurations.
 */

import { THEME_MAPPING, COLOR_SCHEMES } from '@/shared/config/markdown-constants'

/**
 * Get theme name for a given template
 * 
 * @param template - Template name (e.g., 'space-ghibli', 'default')
 * @returns Theme name (e.g., 'tokyonight', 'default')
 */
export function getThemeForTemplate(template: string): string {
    return THEME_MAPPING[template] || THEME_MAPPING.default
}

/**
 * Get color scheme for a given template
 * 
 * @param template - Template name
 * @returns Color value (e.g., 'blueviolet', 'blue')
 */
export function getColorForTemplate(template: string): string {
    return COLOR_SCHEMES[template] || COLOR_SCHEMES.default
}
