<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()

const user = ref({})

userStore
  .getUser(route.params.uuid.toString())
  .then((res: any) => {
    user.value = res
  })
</script>

<template>
<pre>
  {{user}}
</pre>
</template>

<style scoped>

</style>
