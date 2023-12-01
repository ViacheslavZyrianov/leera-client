<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const localePath = useLocalePath()
const { $event } = useNuxtApp()

const { avatar, username } = userStore.me

const avatarInitials = `${username[0]}${username[1]}`

function openAuthDialog() {
  $event('dialog:open', 'auth')
}
</script>

<template>
  <v-btn
    v-if="checkIsLoggedIn()"
    elevation="0"
    variant="text"
    class="text-body-2"
    :to="localePath('/profile')"
  >
    <shared-avatar
      :avatar-url="avatar"
      :placeholder="avatarInitials"
    />
    <div class="username">{{ username }}</div>
  </v-btn>
  <v-btn
    v-else
    variant="outlined"
    color="primary"
    @click="openAuthDialog"
  >
    {{ $t('auth.label') }}
  </v-btn>
</template>

<style scoped>

</style>
