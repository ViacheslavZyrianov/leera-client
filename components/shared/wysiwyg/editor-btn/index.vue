<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <v-btn
    variant="tonal"
    size="x-small"
  >
    <v-icon
      :icon="icon"
      size="x-large"
    />
  </v-btn>
</template>
