<script setup lang="ts">
import { useTheme } from 'vuetify'
import { setPalette } from '@/composables/palette'
import { useUserStore } from '@/stores/user'
import checkIsLoggedIn from '@/composables/checkIsLoggedIn';

const userStore = useUserStore()

const cookie_theme = useCookie('theme')
const theme = useTheme()

if (!cookie_theme.value) cookie_theme.value = 'light'
setPalette(theme)

if (checkIsLoggedIn()) {
  await userStore.getUserMe()
}
</script>

<template>
  <v-app>
    <header-bar />
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
    <shared-dialog />
  </v-app>
</template>
