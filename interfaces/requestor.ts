interface ObjectInterface {
    string: Record<string, string | number | boolean | null>
}

export interface OptionsInterface {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
    body?: Record<string, string | number | boolean | null>
    query?: ObjectInterface,
    headers?: HeadersInit
}
