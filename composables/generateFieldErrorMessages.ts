export default ($v: any, field: string) => {
    const nuxtApp = useNuxtApp()

    const { t } = nuxtApp.$i18n

    return $v[field].$errors.map((error: any) => {
        const { $validator, $params } = error

        const paramsKey = Object.keys($params).filter((key:string) => key !== 'type')[0]

        return t(`errors.${$validator}`, { field, [paramsKey]: $params[paramsKey] })
    })
}
