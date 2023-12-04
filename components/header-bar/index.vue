<script setup lang="ts">
import links from './links'

const localePath = useLocalePath()
</script>

<template>
  <v-app-bar
    elevation="0"
  >
    <v-container class="d-flex align-center justify-center">
      <nuxt-link
        :to="localePath('/')"
        class="logo mr-4"
      >
        Leera
      </nuxt-link>
      <v-btn
          v-for="{ to, label } in links"
          nuxt
          :to="localePath(to)"
          class="mr-4"
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

<style scoped lang="scss">
.logo {
  font-family: 'Yeseva One', sans-serif;
  color: $c--primary;
  text-decoration: none;
  font-size: 24px;
  transition: color .3s;
  will-change: color;

  &:hover {
    color: lighten($c--primary, 10%);
  }
}
</style>
