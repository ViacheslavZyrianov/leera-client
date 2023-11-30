<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const localePath = useLocalePath()
const userStore = useUserStore()

const tab = ref('')

function onClickLogout() {
  userStore.logout()
}
</script>

<template>
  <v-row>
    <v-col cols="3">
      <v-card
        class="pa-0"
        elevation="0"
        variant="text"
      >
        <v-tabs
          v-model="tab"
          direction="vertical"
          density="compact"
        >
          <v-tab
            :to="localePath('/profile')"
            class="text-button"
          >
            {{ $t('profile.label') }}
          </v-tab>
          <v-tab
            :to="localePath('/profile/settings')"
            class="text-button"
          >
            {{ $t('profile.settings.label') }}
          </v-tab>
        </v-tabs>
      </v-card>
      <v-btn
        :block="true"
        variant="outlined"
        color="error"
        size="large"
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
