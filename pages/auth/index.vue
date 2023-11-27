<script setup lang="ts">
import { useUserMeStore } from '@/stores/user'
const userMeStore = useUserMeStore()

const usernameInput = ref('')
const passwordInput = ref('')

async function onLogin() {
  await userMeStore.postLogin(usernameInput.value, passwordInput.value)
}
</script>

<template>
  <form
    @submit.prevent="onLogin"
    class="form"
  >
    <input
        v-model="usernameInput"
        type="text"
    >
    <input
        v-model="passwordInput"
        type="password"
    >
    <button
      type="submit"
    >
      Login
    </button>
  </form>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 300px;
}
</style>
