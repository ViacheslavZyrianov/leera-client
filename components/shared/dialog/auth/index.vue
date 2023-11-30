<script setup lang="ts">
const { $event } = useNuxtApp()

const tab = ref('')

defineProps({
  isVisible: {
    type: Boolean,
    default: false
  }
})

function close() {
  $event('dialog:close', 'auth')
}

function onUpdateModelValue(val: boolean) {
  if (!val) close()
}

function onSuccessfulLogin() {
  close()
}
</script>

<template>
  <v-dialog
    :model-value="isVisible"
    width="300"
    @update:modelValue="onUpdateModelValue"
  >
    <v-card>
      <v-tabs
        v-model="tab"
        grow
      >
        <v-tab value="login">{{ $t('auth.login.label') }}</v-tab>
        <v-tab value="registration">{{ $t('auth.registration.label') }}</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item value="login">
          <shared-dialog-auth-login
            @onSuccessfulLogin="onSuccessfulLogin"
          />
        </v-window-item>
        <v-window-item value="registration">
          <shared-dialog-auth-registration />
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
