import { defineStore } from 'pinia'
import requestor from '@/composables/requestor'
import { type GenreInterface } from '@/interfaces/genre'

export const useGenresStore = defineStore('genres', () => {
    async function getAllGenres(): Promise<GenreInterface[]> {
        const { data }: { data: GenreInterface[] } =  await requestor('/genres/all')
        return data
    }

    return { getAllGenres }
})
