export interface ActivityGraphTheme {
    id: string; // The value used in the API (e.g., 'tokyo-night')
    name: string; // Display name (optional, currently using id as value)
    bg: string; // Background color for the preview chip
    line: string; // Line/Text color for the preview chip
}

export const ACTIVITY_GRAPH_THEMES: ActivityGraphTheme[] = [
    { id: 'default', name: 'Default', bg: '#ffcfe9', line: '#9e4c98' },
    { id: 'github', name: 'GitHub', bg: '#293036', line: '#9ecbff' },
    { id: 'github-light', name: 'GitHub Light', bg: '#ffffff', line: '#9be9a8' },
    { id: 'github-compact', name: 'GitHub Compact', bg: '#00000000', line: '#26a641' },
    { id: 'github-dark', name: 'GitHub Dark', bg: '#0d1117', line: '#1f6feb' },
    { id: 'github-dark-dimmed', name: 'GitHub Dark Dimmed', bg: '#24292f', line: '#adbac7' },
    { id: 'dracula', name: 'Dracula', bg: '#44475a', line: '#ff79c6' },
    { id: 'gruvbox', name: 'Gruvbox', bg: '#504945', line: '#d8a657' },
    { id: 'gotham', name: 'Gotham', bg: '#0c1014', line: '#599cab' },
    { id: 'rogue', name: 'Rogue', bg: '#172030', line: '#b18bb1' },
    { id: 'xcode', name: 'Xcode', bg: '#202124', line: '#c4e3ff' },
    { id: 'redical', name: 'Redical', bg: '#141321', line: '#fe428e' },
    { id: 'coral', name: 'Coral', bg: '#9a3838', line: '#f4e23d' },
    { id: 'react', name: 'React', bg: '#282c34', line: '#61dafb' },
    { id: 'react-dark', name: 'React Dark', bg: '#0d1117', line: '#5bcdec' },
    { id: 'nord', name: 'Nord', bg: '#2e3440', line: '#88c0d0' },
    { id: 'lucent', name: 'Lucent', bg: '#cccccc', line: '#ffd369' },
    { id: 'chartreuse-dark', name: 'Chartreuse Dark', bg: '#000000', line: '#00adfe' },
    { id: 'minimal', name: 'Minimal', bg: '#ffffff', line: '#d3e6fa' },
    { id: 'material-palenight', name: 'Material Palenight', bg: '#292d3e', line: '#c792ea' },
    { id: 'green', name: 'Green', bg: '#dad7cd', line: '#588157' },
    { id: 'noctis-minimus', name: 'Noctis Minimus', bg: '#1b2932', line: '#72b7c0' },
    { id: 'one-dark', name: 'One Dark', bg: '#282c34', line: '#e5c17c' },
    { id: 'monokai', name: 'Monokai', bg: '#2d2a2e', line: '#ff6188' },
    { id: 'elegant', name: 'Elegant', bg: '#161e2d', line: '#fb8500' },
    { id: 'aqua', name: 'Aqua', bg: '#52b69a', line: '#226d64' },
    { id: 'synthwave-84', name: 'Synthwave \'84', bg: '#2c223b', line: '#f7f645' },
    { id: 'merko', name: 'Merko', bg: '#0a0f0b', line: '#abd200' },
    { id: 'vue', name: 'Vue', bg: '#2c3e50', line: '#41b883' },
    { id: 'tokyo-day', name: 'Tokyo Day', bg: '#e5e8d8', line: '#8f5a02' },
    { id: 'tokyo-night', name: 'Tokyo Night', bg: '#1a1b27', line: '#70a5fd' },
    { id: 'high-contrast', name: 'High Contrast', bg: '#000000', line: '#e7e7e7' },
    { id: 'cobalt', name: 'Cobalt', bg: '#193549', line: '#d19a66' },
    { id: 'material', name: 'Material', bg: '#263238', line: '#80cbc4' },
    { id: 'nightowl', name: 'Night Owl', bg: '#011627', line: '#c792ea' },
    { id: 'modern-lilac', name: 'Modern Lilac', bg: '#0a0e12', line: '#5d417a' },
    { id: 'arctic', name: 'Arctic', bg: '#03203c', line: '#5da3fa' },
]
