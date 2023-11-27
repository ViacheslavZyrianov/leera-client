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
          rounded
          :prepend-icon="icon"
      >
        {{ $t(`headerBar.${label}`) }}
      </v-btn>
      <v-spacer></v-spacer>
      <theme-switcher />
      <language-switcher />
      <v-btn
          color="primary"
          variant="elevated"
          rounded
      >
        $t(Auth)
      </v-btn>
<!--      <v-text-field-->
<!--          density="compact"-->
<!--          flat-->
<!--          hide-details-->
<!--          label="Search"-->
<!--          rounded="lg"-->
<!--          single-line-->
<!--          variant="solo-filled"-->
<!--      ></v-text-field>-->
    </v-container>
  </v-app-bar>
</template>

<style scoped>

</style>
