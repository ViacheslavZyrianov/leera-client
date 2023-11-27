export interface StoryInterface {
    id: number
    title: string
    description: string
    text: string
    imageUrl: string
    tags: string
    price: number
    createdAt: string
    updatedAt: string
    userId: number
    genreId: number
}

export interface StoriesInterface {
    [index: number]: StoryInterface
}
