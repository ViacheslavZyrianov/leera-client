<script setup lang="ts">
defineProps({
  icon: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <v-btn
    variant="text"
    size="small"
    density="compact"
    class="rounded-0"
    :active="isActive"
  >
    <v-icon
      :icon="icon"
      size="x-large"
    />
  </v-btn>
</template>
