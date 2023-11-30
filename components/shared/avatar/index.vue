<script setup lang="ts">
defineProps({
  avatarUrl: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <v-avatar
    :image="avatarUrl"
    color="primary"
    size="24"
    class="mr-2"
  >
    {{ placeholder }}
  </v-avatar>
</template>

<style scoped>

</style>
