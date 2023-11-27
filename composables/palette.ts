import { type ThemeInstance } from 'vuetify'
import type { CookieRef } from '#app'

interface PaletteInterface {
    readonly primary: string
    readonly 'primary-darken-1': string
    readonly secondary: string
    readonly 'secondary-darken-1': string
    readonly error: string
    readonly info: string
    readonly success: string
    readonly warning: string
}

export const list: Record<string, PaletteInterface> = {
    default: {
        primary: '#2196F3',
        'primary-darken-1': '#277CC1',
        secondary: '#54B6B2',
        'secondary-darken-1': '#48A9A6',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
    },
    witch: {
        primary: '#5E3D6A',
        'primary-darken-1': '#5E3D6A',
        secondary: '#8D4560',
        'secondary-darken-1': '#8D4560',
        error: '#8D4545',
        info: '#45778D',
        success: '#458D55',
        warning: '#EE6C00',
    },
    wildParrot: {
        primary: '#c688eb',
        'primary-darken-1': '#a673c5',
        secondary: '#92b9e3',
        'secondary-darken-1': '#81a3c7',
        error: '#E96767',
        info: '#6c7ee1',
        success: '#67E9A3',
        warning: '#FFC19F',
    },
    cyber: {
        primary: '#21244D',
        'primary-darken-1': '#1c1e41',
        secondary: '#4A26AB',
        'secondary-darken-1': '#44239f',
        error: '#FF5050',
        info: '#2D8EB4',
        success: '#5BC236',
        warning: '#FFA500',
    },
    flowers: {
        primary: '#034c5f',
        'primary-darken-1': '#024050',
        secondary: '#97bec6',
        'secondary-darken-1': '#86a8af',
        error: '#FF4D4D',
        info: '#6FA8DC',
        success: '#68C39F',
        warning: '#FFAA33',
    }
}

export function setPalette(theme: ThemeInstance):void {
    const cookie_palette: CookieRef<string | null | undefined> | string = useCookie('palette')

    if (!cookie_palette.value) cookie_palette.value = 'default'

    const vuetifyPalette = theme.themes.value[theme.global.name.value].colors
    theme.themes.value[theme.global.name.value].colors = {
        ...vuetifyPalette,
        ...list[cookie_palette.value]
    }
}
