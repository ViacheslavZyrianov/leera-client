<script setup lang="ts">
import { useTheme } from 'vuetify'
import { setPalette } from '@/composables/palette'
const cookie_theme = useCookie('theme')
const theme = useTheme()

if (!cookie_theme.value) cookie_theme.value = 'light'
setPalette(theme)
</script>

<template>
  <v-app>
    <header-bar />
    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>
  </v-app>
</template>
