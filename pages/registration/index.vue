<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, email, sameAs } from '@vuelidate/validators'
import generateFieldErrorMessages from '@/composables/generateFieldErrorMessages'
const localePath = useLocalePath()

const { $event } = useNuxtApp()
const authStore = useAuthStore()
const userStore = useUserStore()

const form = reactive({
  email: '',
  username: '',
  password: '',
  passwordConfirm: ''
})

const { password, passwordConfirm } = toRefs(form)

async function postRegisterUser() {
  try {
    await authStore.postRegister(form)
  } catch (err: any) {
    console.log('onSubmit register error', err.message);
  }
}

async function postLoginUser() {
  try {
    await authStore.postLogin(form.username, form.password)
  } catch (err: any) {
    console.log('onSubmit register -> login error', err.message);
  }
}

async function getUserMe() {
  try {
    await userStore.getUserMe()
  } catch (err: any) {
    console.log('onSubmit register -> login error', err.message);
  }
}

const isDisabled = ref(true)
const isLoading = ref(false)
const isPasswordFieldValueVisible = ref(false)
const isPasswordConfirmFieldValueVisible = ref(false)

const rules = {
  email: {
    required,
    email,
    maxLength: maxLength(30)
  },
  username: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(30)
  },
  password: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(30),
    sameAs__passwordConfirm: sameAs(passwordConfirm)
  },
  passwordConfirm: {
    required,
    minLength: minLength(6),
    maxLength: maxLength(30),
    sameAs__password: sameAs(password)
  }
}

const submitButtonColor = computed(() => {
  if (!isDisabled.value) return 'primary'
})

const passwordFieldAppendedInnerIcon = computed(() => {
  return isPasswordFieldValueVisible.value ? 'mdi-eye-off' : 'mdi-eye'
})

const passwordFieldType = computed(() => {
  return isPasswordFieldValueVisible.value ? 'text' : 'password'
})

const passwordConfirmFieldAppendedInnerIcon = computed(() => {
  return isPasswordConfirmFieldValueVisible.value ? 'mdi-eye-off' : 'mdi-eye'
})

const passwordConfirmFieldType = computed(() => {
  return isPasswordConfirmFieldValueVisible.value ? 'text' : 'password'
})

const $v = useVuelidate(rules, form)

watch(() => $v.value.$invalid, value => {
  isDisabled.value = value
})

function onPasswordFieldAppendedInnerIconClick() {
  isPasswordFieldValueVisible.value = !isPasswordFieldValueVisible.value
}

function onPasswordConfirmFieldAppendedInnerIconClick() {
  isPasswordConfirmFieldValueVisible.value = !isPasswordConfirmFieldValueVisible.value
}

function onBlurValidateField(field: string) {
  $v.value[field].$touch()
}

async function onSubmit() {
  await $v.value.$validate()
  if ($v.value.$error) return
  isLoading.value = true
  isDisabled.value = true
  await postRegisterUser()
  await postLoginUser()
  await getUserMe()
  isLoading.value = false
  isDisabled.value = false
}
</script>

<template>
  <NuxtLayout name="auth">
    <template #illustration>
      <img
        src="@/assets/img/registration.svg"
        alt="Registration"
      >
      <v-btn
        :to="localePath('/login')"
        variant="tonal"
        color="primary"
        class="mx-auto w-50"
      >
        {{ $t('login.label') }}
      </v-btn>
    </template>
    <template #form>
      <h1 class="mt-n8 mb-4">{{ $t('registration.label') }}</h1>
      <v-form
        @submit.prevent="onSubmit"
      >
        <v-text-field
            v-model="form.email"
            :error-messages="generateFieldErrorMessages($v, 'registration-email')"
            variant="solo-filled"
            density="compact"
            :flat="true"
            :placeholder="$t('registration.email.placeholder')"
            prepend-inner-icon="mdi-email-outline"
            class="mb-2"
            @blur="onBlurValidateField('email')"
        />
        <v-text-field
            v-model="form.username"
            :error-messages="generateFieldErrorMessages($v, 'registration-username')"
            variant="solo-filled"
            density="compact"
            :flat="true"
            :placeholder="$t('registration.username.placeholder')"
            prepend-inner-icon="mdi-account"
            class="mb-2"
            @blur="onBlurValidateField('username')"
        />
        <v-text-field
            v-model="form.password"
            variant="solo-filled"
            density="compact"
            :flat="true"
            :error-messages="generateFieldErrorMessages($v, 'registration-password')"
            :placeholder="$t('registration.password.placeholder')"
            prepend-inner-icon="mdi-key"
            :append-inner-icon="passwordFieldAppendedInnerIcon"
            :type="passwordFieldType"
            class="mb-2"
            @click:append-inner="onPasswordFieldAppendedInnerIconClick"
        />
        <v-text-field
            v-model="form.passwordConfirm"
            variant="solo-filled"
            density="compact"
            :flat="true"
            :error-messages="generateFieldErrorMessages($v, 'registration-passwordConfirm')"
            :placeholder="$t('registration.passwordConfirm.placeholder')"
            prepend-inner-icon="mdi-key"
            :append-inner-icon="passwordConfirmFieldAppendedInnerIcon"
            :type="passwordConfirmFieldType"
            class="mb-2"
            @blur="onBlurValidateField('passwordConfirm')"
            @click:append-inner="onPasswordConfirmFieldAppendedInnerIconClick"
        />
        <v-btn
            type="submit"
            :loading="isLoading"
            :disabled="isDisabled"
            :block="true"
            :color="submitButtonColor"
        >
          {{ $t('registration.label') }}
        </v-btn>
      </v-form>
    </template>
  </NuxtLayout>
</template>

<style scoped>

</style>
