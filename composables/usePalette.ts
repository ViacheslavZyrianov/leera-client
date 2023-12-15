import { useTheme } from 'vuetify'
import { useSettingsStore } from '@/stores/settings'

export default () => {
    const theme = useTheme()
    const settingsStore = useSettingsStore()
    const vuetifyPalette = theme.themes.value[theme.global.name.value].colors

    return () => {
        theme.themes.value[theme.global.name.value].colors = {
            ...vuetifyPalette,
            ...settingsStore.palettes[settingsStore.palette]
        }
    }
}
