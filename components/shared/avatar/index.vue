<script setup lang="ts">
defineProps({
  avatarUrl: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 24
  }
})
</script>

<template>
  <v-avatar
    :image="avatarUrl"
    :size="size"
    color="primary"
    class="mr-2"
  >
    {{ placeholder }}
  </v-avatar>
</template>

<style scoped>

</style>
