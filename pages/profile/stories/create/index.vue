<script setup lang="ts">
import generateFieldErrorMessages from '@/composables/generateFieldErrorMessages'
import { required, minLength, maxLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useGenresStore } from '@/stores/genres'
import { useStoriesStore } from '@/stores/stories'
import { type GenreInterface } from '@/interfaces/genre'

const genresStore = useGenresStore()
const storiesStore = useStoriesStore()
const { t } = useI18n()

const form = reactive({
  title: '',
  description: '',
  genre: null,
  tags: '',
  text: '',
})

const tags = ref('')

const rules = {
  title: {
    required,
    minLength: minLength(3),
    maxLength: maxLength(30)
  },
  description: {
    minLength: minLength(3),
    maxLength: maxLength(30)
  },
  genre: {
    required
  },
  tags: {
    required
  },
  text: {
    required,
    minLength: minLength(10),
    maxLength: maxLength(4000)
  }
}

const isDisabled = ref(true)
const isLoading = ref(false)

const $v = useVuelidate(rules, form)

const genres = await genresStore.getAllGenres()
const genresItemsForSelect = genres.map((genre: GenreInterface) => {
  return {
    value: genre.id,
    title: t(`genres.list.${genre.title}`)
  }
})

const tagsAsChips:string[] = reactive([])

const maxTagsLimit = 5

watch(() => tags.value, val => {
  if (val.trim() === ',') {
    tags.value = ''
    return
  }
  if (val.includes(',')) {
    const splittedTags = val.split(',')
    tagsAsChips.push(splittedTags[splittedTags.length - 2].trim())
    tags.value = ''
  }
})

const ismaxTagsLimitReached = computed(() => maxTagsLimit === tagsAsChips.length)

const submitButtonColor = computed(() => {
  if (!isDisabled.value) return 'primary'
})

const tagsFieldPlaceholder = computed(() => {
  return ismaxTagsLimitReached ?
      t('stories.tags.placeholder_maxLimitReached', { num: maxTagsLimit }) :
      t('stories.tags.placeholder')
})

function onTagDelete(tagIndex: number) {
  tagsAsChips.splice(tagIndex, 1)
}

async function postStory() {
  try {
    form.tags = tagsAsChips.join(',')
    await storiesStore.postStory(form)
  } catch(err: any) {
    throw new Error(err)
  }
}

async function onSubmit() {
  await $v.value.$validate()
  if ($v.value.$error) return
  isLoading.value = true
  isDisabled.value = true
  await postStory()
  isLoading.value = false
  isDisabled.value = false
}
</script>

<template>
<v-card
  class="pa-4"
>
  <v-form
    @submit.prevent="onSubmit"
  >
    <v-text-field
      v-model="form.title"
      :error-messages="generateFieldErrorMessages($v, 'story-title')"
      variant="solo-filled"
      density="compact"
      :flat="true"
      :placeholder="$t('stories.title.placeholder')"
      class="mb-2"
    />
    <v-select
      v-model="form.genre"
      :loading="!genres"
      :disabled="!genres"
      :label="$t('genres.labelSelect')"
      :items="genresItemsForSelect"
      density="compact"
      :flat="true"
      :single-line="true"
      variant="solo-filled"
      class="mb-2"
    />
    <v-text-field
      v-model="tags"
      :error-messages="generateFieldErrorMessages($v, 'story-tags')"
      variant="solo-filled"
      density="compact"
      :flat="true"
      :placeholder="tagsFieldPlaceholder"
      :counter="maxTagsLimit"
      :counter-value="tagsAsChips.length"
      :readonly="ismaxTagsLimitReached"
      :persistent-counter="true"
      class="mb-2"
    >
      <template v-slot:prepend-inner>
        <v-chip
          v-for="(chip, index) in tagsAsChips"
          :key="index+chip"
          class="mr-1"
          variant="tonal"
          size="small"
          :closable="true"
          @click:close.prevent="onTagDelete(index)"
        >
          {{ chip }}
        </v-chip>
      </template>
    </v-text-field>
    <v-text-field
      v-model="form.description"
      :error-messages="generateFieldErrorMessages($v, 'story-description')"
      variant="solo-filled"
      density="compact"
      :flat="true"
      :placeholder="$t('stories.description.placeholder')"
      class="mb-2"
    />
    <shared-wysiwyg />
    <v-btn
      type="submit"
      :loading="isLoading"
      :disabled="isDisabled"
      :block="true"
      :flat="true"
      :color="submitButtonColor"
    >
      {{ $t('stories.create') }}
    </v-btn>
  </v-form>
</v-card>
</template>

<style scoped>

</style>
