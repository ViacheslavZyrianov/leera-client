<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { $event } = useNuxtApp()

const menuBtnChevron = ref('mdi-chevron-down')

const avatar = computed(() => userStore.me.avatar)
const avatarInitials = computed(() => userStore.me.username[0])

function openAuthDialog() {
  $event('dialog:open', 'auth')
}

function onMenuModelValueUpdate(isOpened: boolean) {
  menuBtnChevron.value = isOpened ? 'mdi-chevron-up' : 'mdi-chevron-down'
}

function onLogout() {
  userStore.logout()
}
</script>

<template>
  <v-menu
      v-if="userStore.isLoggedIn"
      @update:modelValue="onMenuModelValueUpdate"
  >
    <template v-slot:activator="{ props }">
      <v-btn
          v-bind="props"
          class="text-body-2"
          variant="tonal"
          :append-icon="menuBtnChevron"
      >
        <v-avatar
          v-if="avatar"
          :image="avatar"
          color="primary"
          size="24"
          class="mr-2"
        />
        <v-avatar
          v-else
          color="primary"
          size="24"
          class="mr-2"
        >
          {{ avatarInitials }}
        </v-avatar>
        <div class="username">{{ userStore.me.username }}</div>
      </v-btn>
    </template>
    <v-list class="pa-0 text-right">
      <v-list-item
          density="compact"
          @click="onLogout"
      >
        Logout
      </v-list-item>
    </v-list>
  </v-menu>
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
