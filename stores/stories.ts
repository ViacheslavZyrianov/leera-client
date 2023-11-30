import { defineStore } from 'pinia'
import requestor from '@/composables/requestor'

export const useStoriesStore = defineStore('stories', () => {
    async function getAllStories() {
        const { data } =  await requestor('/stories')
        return data
    }

    async function getStoryById(id: string | string[]) {
        const { data } = await requestor(`stories/${id}`)
        return data
    }

    return { getAllStories, getStoryById }
})
