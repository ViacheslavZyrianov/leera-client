<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
const authStore = useAuthStore()
const userStore = useUserStore()

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const isDisabled = ref(false)
const isPasswordFieldValueVisible = ref(false)

const emit = defineEmits(['onSuccessfulLogin'])

const passwordFieldAppendedInnerIcon = computed(() => {
  return isPasswordFieldValueVisible.value ? 'mdi-eye-off' : 'mdi-eye'
})

const passwordFieldType = computed(() => {
  return isPasswordFieldValueVisible.value ? 'text' : 'password'
})

function onPasswordFieldAppendedInnerIconClick() {
  isPasswordFieldValueVisible.value = !isPasswordFieldValueVisible.value
}

async function postLoginUser() {
  try {
    await authStore.postLogin(username.value, password.value)
  } catch (err: any) {
    console.log('onSubmit login error', err.message);
  }
}

async function getUserMe() {
  try {
    await userStore.getUserMe()
  } catch (err: any) {
    console.log('onSubmit login error', err.message);
  }
}

async function onSubmit() {
  isLoading.value = true
  isDisabled.value = true
  await postLoginUser()
  await getUserMe()
  emit('onSuccessfulLogin')
  isLoading.value = false
  isDisabled.value = false
}
</script>

<template>
  <v-form
    class="pa-4"
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="username"
      :label="$t('auth.login.username.label')"
      :placeholder="$t('auth.login.username.placeholder')"
      variant="solo-filled"
      density="compact"
      prepend-inner-icon="mdi-account"
    />
    <v-text-field
      v-model="password"
      :label="$t('auth.login.password.label')"
      :placeholder="$t('auth.login.password.placeholder')"
      variant="solo-filled"
      density="compact"
      prepend-inner-icon="mdi-key"
      :append-inner-icon="passwordFieldAppendedInnerIcon"
      :type="passwordFieldType"
      @click:append-inner="onPasswordFieldAppendedInnerIconClick"
    />
    <v-btn
      type="submit"
      :loading="isLoading"
      :disabled="isDisabled"
      block
      color="primary"
    >
      {{ $t('auth.login.label') }}
    </v-btn>
  </v-form>
</template>

<style scoped>

</style>
