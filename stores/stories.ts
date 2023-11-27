import { defineStore } from 'pinia'
import sFetch from '@/composables/sfetch'
import { type StoryInterface } from '@/interfaces/story'
import { type Ref } from 'vue'

export const useStoriesStore = defineStore('stories', () => {
    async function getAllStories() {
        const { data } = await sFetch('allStories', 'stories')
        return data
    }

    async function getStoryById(id: string | string[]) {
        const { data } = await sFetch<StoryInterface, Error>('storyById', `stories/${id}`)
        return data
    }

    return { getAllStories, getStoryById }
})
