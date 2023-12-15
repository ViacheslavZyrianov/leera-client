import { defineStore } from 'pinia'
import { type PaletteInterface } from '@/interfaces/settings'

export const useSettingsStore = defineStore('settings', {
    state: () => {
        const palette = 'default'
        const palettes: Record<string, PaletteInterface> = {
            default: {
                primary: '#2196F3',
                'primary-darken-1': '#277CC1',
                secondary: '#54B6B2',
                'secondary-darken-1': '#48A9A6'
            },
            witch: {
                primary: '#5E3D6A',
                'primary-darken-1': '#5E3D6A',
                secondary: '#8D4560',
                'secondary-darken-1': '#8D4560'
            },
            wildParrot: {
                primary: '#c688eb',
                'primary-darken-1': '#a673c5',
                secondary: '#92b9e3',
                'secondary-darken-1': '#81a3c7'
            },
            cyber: {
                primary: '#21244D',
                'primary-darken-1': '#1c1e41',
                secondary: '#4A26AB',
                'secondary-darken-1': '#44239f'
            },
            flowers: {
                primary: '#034c5f',
                'primary-darken-1': '#024050',
                secondary: '#97bec6',
                'secondary-darken-1': '#86a8af'
            }
        }

        return {
            palette,
            palettes
        }
    },
    actions: {
        setPalette(palette: string) {
            this.palette = palette || 'default'
            localStorage.setItem('palette', palette)
        },
        setInitialPalette() {
            const paletteFromLS = localStorage.getItem('palette')
            const palette = paletteFromLS || this.palette
            console.log('palette', palette);
            this.setPalette(palette)
        }
    }
})
