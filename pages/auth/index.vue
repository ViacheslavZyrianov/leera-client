<script setup lang="ts">
const tab = ref('')
</script>

<template>
    <v-card
      width="300"
    >
      <v-tabs
        v-model="tab"
        :grow="true"
        bg-color="secondary"
      >
        <v-tab value="login">{{ $t('auth.login.label') }}</v-tab>
        <v-tab value="registration">{{ $t('auth.registration.label') }}</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="login">
          <auth-login />
        </v-window-item>
        <v-window-item value="registration">
          <auth-registration />
        </v-window-item>
      </v-window>
    </v-card>
</template>

<style scoped>

</style>
