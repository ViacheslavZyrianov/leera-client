<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const localePath = useLocalePath()
const userStore = useUserStore()

const links = [
  {
    label: 'profile.label',
    to: '/profile'
  },
  {
    label: 'profile.stories.label',
    to: '/profile/stories'
  },
  {
    label: 'profile.settings.label',
    to: '/profile/settings'
  }
]

function onClickLogout() {
  userStore.logout()
}
</script>

<template>
  <v-row>
    <v-col cols="3">
      <v-btn
        :to="localePath('/profile/stories/create')"
        :block="true"
        color="success"
      >
        {{ $t('stories.create') }}
      </v-btn>
      <v-btn
        v-for="({ label, to }) in links"
        :key="`${label}-${to}`"
        :to="localePath(to)"
        :block="true"
        variant="text"
      >
        {{ $t(label) }}
      </v-btn>
      <v-btn
        :block="true"
        color="error"
        class="mt-4"
        @click="onClickLogout"
      >
        {{ $t('profile.settings.list.logout') }}
      </v-btn>
    </v-col>
    <v-col cols="9">
      <slot />
    </v-col>
  </v-row>
</template>
