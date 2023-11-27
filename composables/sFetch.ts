import type { AsyncData, AsyncDataOptions } from '#app'

export default <D, E>(key: string, path: string, options?: AsyncDataOptions<any>): AsyncData<D, E | null> =>
    useAsyncData(key, () => $fetch(`http://localhost:3000/api/${path}`), options)
