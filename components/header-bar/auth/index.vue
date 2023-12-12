<script setup lang="ts">
const localePath = useLocalePath()
</script>

<template>
  <v-btn
    v-if="checkIsLoggedIn()"
    variant="outlined"
    class="ml-4"
    :to="localePath('/profile')"
  >
    {{ $t('profile.label') }}
  </v-btn>
  <template v-else>
    <v-btn
      variant="outlined"
      class="ml-4"
      :to="localePath('/login')"
    >
      {{ $t('login.label') }}
    </v-btn>
    <v-btn
      dark
      variant="flat"
      class="ml-4"
      color="secondary"
      :to="localePath('/registration')"
    >
      {{ $t('registration.label') }}
    </v-btn>
  </template>
</template>
