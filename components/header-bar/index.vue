<script setup lang="ts">
import links from './links'

const localePath = useLocalePath()
</script>

<template>
  <v-app-bar
    elevation="0"
  >
    <v-container class="d-flex align-center justify-center">
      <v-btn
          v-for="{ to, label } in links"
          nuxt
          :to="localePath(to)"
          class="mr-4 text-lowercase"
          variant="text"
      >
        {{ $t(`headerBar.${label}`) }}
      </v-btn>
      <v-spacer />
      <theme-switcher class="mr-4" />
      <language-switcher />
      <header-bar-auth class="ml-4" />
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>
