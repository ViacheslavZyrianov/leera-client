import type { OptionsInterface } from '@/interfaces/requestor'
import { type FetchContext, type FetchResponse } from 'ofetch'
import { type R } from 'vite-node/types-516036fa'
import type {AsyncDataOptions} from "#app";
import {FetchError} from "ofetch/dist/node";

const headers = (defaultHeaders: object | undefined): HeadersInit | undefined => {
    const headers = {}

    if (defaultHeaders) Object.assign(headers, defaultHeaders)

    const Authorization = useCookie('jwt')?.value
    const UUID = useCookie('uuid')?.value
    if (Authorization && UUID) Object.assign(headers, { Authorization, UUID })

    return headers
}

export default async <T>(path: string, options?: OptionsInterface) => {
    const useFetchResponse = await useFetch(
        path,
        {
            baseURL: 'http://localhost:3000/api',
            method: options?.method || 'GET',
            credentials: 'include',
            body: options?.body,
            query: options?.query,
            headers: headers(options?.headers),
            onResponseError(context: FetchContext & { response: FetchResponse<R> }): Promise<void> | void {
                if (context?.response?.status === 401) {
                    console.log('ERROR 401!!!');
                }
            }
        }
    )

    return {
        data: useFetchResponse?.data?.value,
        error: useFetchResponse.error
    } as {
        data: T,
        error: any
    }
}
