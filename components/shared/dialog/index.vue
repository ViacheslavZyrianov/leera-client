<script setup lang="ts">
const { $listen } = useNuxtApp()
const isVisible = ref(false)
const dialogName = ref('')

const dialogs = {
  // auth: resolveComponent('shared-dialog-auth')
}

$listen('dialog:open', (name: any) => {
  dialogName.value = name
  isVisible.value = true
})

$listen('dialog:close', (name: any) => {
  dialogName.value = name
  isVisible.value = false
})
</script>

<template>
  <component
    :is="dialogs[dialogName]"
    :is-visible="isVisible"
  />
</template>
