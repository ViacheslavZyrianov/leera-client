<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()
const cookie_theme = useCookie('theme')

function onThemeChange() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  cookie_theme.value = theme.global.name.value
}

</script>

<template>
<v-checkbox-btn
  v-model="cookie_theme"
  inline
  true-value="light"
  false-value="dark"
  true-icon="mdi-weather-night"
  false-icon="mdi-weather-sunny"
  @input="onThemeChange"
/>
</template>

<style scoped>

</style>
