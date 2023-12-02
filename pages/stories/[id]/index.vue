<script setup lang="ts">
const route = useRoute()
import { useStoriesStore } from '~/stores/stories'
const storiesStore = useStoriesStore()

const story = await storiesStore.getStoryById(route.params.id)

useHead({
  title: story.title
})
</script>

<template>
  <v-card>
    <v-card-title>{{ story.title }}</v-card-title>
    <v-card-text>{{ story.text }}</v-card-text>
  </v-card>
</template>

<style scoped>

</style>
