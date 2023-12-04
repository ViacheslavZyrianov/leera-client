<script setup lang="ts">
const route = useRoute()
import { useStoriesStore } from '~/stores/stories'
const storiesStore = useStoriesStore()

const story = await storiesStore.getStoryById(route.params.id)
</script>

<template>
</template>

<style scoped>

</style>
