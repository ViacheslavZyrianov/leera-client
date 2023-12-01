<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const localePath = useLocalePath()
const { $event } = useNuxtApp()

const avatar = computed(() => userStore.me?.avatar)
const avatarInitials = computed(() => userStore.me?.username[0])

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
    <div class="username">{{ userStore.me.username }}</div>
  </v-btn>
  <v-btn
    v-else
    color="primary"
    variant="elevated"
    @click="openAuthDialog"
  >
    {{ $t('auth.label') }}
  </v-btn>
</template>

<style scoped>

</style>
