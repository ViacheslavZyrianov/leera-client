<script setup lang="ts">
import { useStoriesStore } from '~/stores/stories'
const storiesStore = useStoriesStore()
const localePath = useLocalePath()

useHead({
  title: 'sometitle'
})

const stories: any = await storiesStore.getAllStories()
</script>

<template>
<v-card
    v-for="story in stories"
    :key="story.id"
    class="mb-4"
>
  <v-card-title>{{ story.title }}</v-card-title>
  <v-card-text>{{ story.text }}</v-card-text>
  <v-card-actions>
    <v-spacer />
    <v-btn
        variant="tonal"
        color="primary"
        nuxt
        rounded
        :to="localePath(`/stories/${story.id}`)"
    >
      {{ $t('stories.read') }}
    </v-btn>
  </v-card-actions>
</v-card>
</template>

<style scoped>

</style>
