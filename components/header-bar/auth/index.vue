<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const localePath = useLocalePath()

const { username } = userStore.me

const avatarInitials = username[0]
</script>

<template>
  <v-btn
    v-if="checkIsLoggedIn()"
    :to="localePath('/profile')"
    icon
    variant="outlined"
    size="small"
    class="text-uppercase avatar-initial"
    :text="avatarInitials"
  />
  <v-btn
    v-else
    :to="localePath('/auth')"
    icon="mdi-account"
    variant="outlined"
    size="small"
  />
</template>

<style scoped>
.avatar-initial {
  font-family: 'Yeseva One', sans-serif;
  font-size: 20px;
}
</style>
