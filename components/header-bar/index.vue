<script setup lang="ts">
import links from './links'

const localePath = useLocalePath()
</script>

<template>
  <v-app-bar>
    <v-container class="d-flex align-center justify-center">
      <v-btn
          v-for="{ to, label, icon } in links"
          nuxt
          :to="localePath(to)"
          class="mr-4"
          variant="text"
          color="primary"
          :prepend-icon="icon"
      >
        {{ $t(`headerBar.${label}`) }}
      </v-btn>
      <v-spacer />
      <theme-switcher />
      <language-switcher class="mr-4" />
      <header-bar-auth />
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>
