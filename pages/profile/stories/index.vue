<script setup lang="ts">
const userStore = useUserStore()
const { t } = useI18n()
const localePath = useLocalePath()

const stories = await userStore.getUserMeStories()

function storyPrice(price: number) {
  return price ? `${price}$` : t('stories.free')
}
</script>

<template>
<NuxtLayout name="profile">
  <v-card
    v-for="story in stories"
    :key="story.id"
    variant="outlined"
    class="pa-4 mb-8"
  >
    <div class="d-flex mb-4">
      <h6 class="w-100 d-inline-block text-h6 font-weight-bold text-truncate">
        {{ story.title }}
      </h6>
      <div class="text-right text-h6 font-weight-bold text-green-darken-1">
        {{ storyPrice(story.price) }}
      </div>
    </div>
    <div class="text-subtitle-2">
      {{ $dayjs(story.createdAt).format('DD MMMM YYYY') }}
    </div>
    <div class="d-flex">
      <v-img
          :width="300"
          aspect-ratio="9/16"
          class="w-25 h-100 mr-4"
          cover
          :src="story.imageUrl"
      />
      <div class="w-75">
        <div class="text-subtitle">
          {{ story.genre.title }}
        </div>
        <v-chip-group>
          <v-chip
            v-for="tag in story.tags.split(',')"
            :key="tag"
            size="small"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>

        <div class="text-subtitle-2 text-medium-emphasis">
          {{ story.description }}
        </div>
      </div>
    </div>
    <div class="d-flex justify-end mt-4">
      <v-btn
          nuxt
          :to="localePath(`/stories/${story.id}/edit`)"
      >
        {{ $t('stories.edit') }}
      </v-btn>
      <v-btn
          color="primary"
          nuxt
          class="ml-2"
          :to="localePath(`/stories/${story.id}`)"
      >
        {{ $t('stories.read') }}
      </v-btn>
    </div>
  </v-card>
</NuxtLayout>
</template>
