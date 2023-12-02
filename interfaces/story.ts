interface GenreInterface {
    title: string
}

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
    genre: GenreInterface
}

export interface StoriesInterface {
    [index: number]: StoryInterface
}
