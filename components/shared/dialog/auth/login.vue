<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import generateFieldErrorMessages from '@/composables/generateFieldErrorMessages'

const { $event } = useNuxtApp()
const authStore = useAuthStore()
const userStore = useUserStore()

const emit = defineEmits(['onSuccessfulLogin'])

const isDisabled = ref(true)
const isLoading = ref(false)
const isPasswordFieldValueVisible = ref(false)

const form = reactive({
  username: '',
  password: ''
})

const rules = {
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(30)
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(30)
  }
}

const $v = useVuelidate(rules, form)

watch(() => $v.value.$invalid, value => {
  isDisabled.value = value
})

const passwordFieldAppendedInnerIcon = computed(() => {
  return isPasswordFieldValueVisible.value ? 'mdi-eye-off' : 'mdi-eye'
})

const passwordFieldType = computed(() => {
  return isPasswordFieldValueVisible.value ? 'text' : 'password'
})

const submitButtonColor = computed(() => {
  if (!isDisabled.value) return 'primary'
})

function onPasswordFieldAppendedInnerIconClick() {
  isPasswordFieldValueVisible.value = !isPasswordFieldValueVisible.value
}

async function postLoginUser() {
  try {
    await authStore.postLogin(form.username, form.password)
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
  await $v.value.$validate()
  if ($v.value.$error) return
  isLoading.value = true
  isDisabled.value = true
  await postLoginUser()
  await getUserMe()
  $event('dialog:close', 'auth')
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
      v-model="form.username"
      :error-messages="generateFieldErrorMessages($v, 'login-username')"
      variant="outlined"
      :placeholder="$t('auth.login.username.placeholder')"
      prepend-inner-icon="mdi-account"
      class="mb-2"
    />
    <v-text-field
      v-model="form.password"
      variant="outlined"
      :error-messages="generateFieldErrorMessages($v, 'login-password')"
      :placeholder="$t('auth.login.password.placeholder')"
      prepend-inner-icon="mdi-key"
      :append-inner-icon="passwordFieldAppendedInnerIcon"
      :type="passwordFieldType"
      class="mb-2"
      @click:append-inner="onPasswordFieldAppendedInnerIconClick"
    />
    <v-btn
      type="submit"
      :loading="isLoading"
      :disabled="isDisabled"
      :block="true"
      :color="submitButtonColor"
    >
      {{ $t('auth.login.label') }}
    </v-btn>
  </v-form>
</template>

<style scoped>

</style>
