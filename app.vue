<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useSettingsStore } from '@/stores/settings'
import checkIsLoggedIn from '@/composables/checkIsLoggedIn'
import usePalette from '@/composables/usePalette'

const userStore = useUserStore()
const settingsStore = useSettingsStore()
const route = useRoute()

const cookie_theme = useCookie('theme')

if (!cookie_theme.value) cookie_theme.value = 'light'

if (process.client) {
  const changeVuetifyPalette = usePalette()
  settingsStore.setInitialPalette()
  changeVuetifyPalette()
}

const dayjs = useDayjs()
const cookie_locale = useCookie('i18n_redirected')
const { defaultLocale } = useI18n()
dayjs.locale(cookie_locale.value || defaultLocale)

const centeredPages = [
  '/login',
  '/registration'
]

const classes = computed(() => centeredPages.includes(route.path) ? 'fill-height justify-center' : null)

if (checkIsLoggedIn()) {
  await userStore.getUserMe()
}
</script>

<template>
  <v-app>
    <header-bar />
    <v-main>
      <v-container :class="classes">
        <NuxtPage />
      </v-container>
    </v-main>
    <shared-dialog />
  </v-app>
</template>
