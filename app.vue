<script setup lang="ts">
import { useTheme } from 'vuetify'
import { setPalette } from '@/composables/palette'
import { useUserStore } from '@/stores/user'
import checkIsLoggedIn from '@/composables/checkIsLoggedIn'

const userStore = useUserStore()
const route = useRoute()

const cookie_theme = useCookie('theme')
const theme = useTheme()

if (!cookie_theme.value) cookie_theme.value = 'light'
setPalette(theme)

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
