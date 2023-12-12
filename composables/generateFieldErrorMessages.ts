export default ($v: any, field: string) => {
    const [moduleName, fieldName] = field.split('-')

    const nuxtApp = useNuxtApp()

    const { t } = nuxtApp.$i18n

    return $v[fieldName].$errors.map((error: any) => {
        const { $validator, $params } = error
        let validator = $validator

        const paramsKey = Object.keys($params).filter((key:string) => key !== 'type')[0]

        const errorText = t(`${moduleName}.${fieldName}.label`)

        const interpolatedObj = {
            field: errorText,
            [paramsKey]: $params[paramsKey]
        }

        if ($validator.includes('sameAs')) {
            validator = $validator.split('__')[0]
            const sameAs = $validator.split('__')[1]
            interpolatedObj.fieldConfirm = t(`${moduleName}.${sameAs}.label`)
        }

        return t(`errors.${validator}`, interpolatedObj)
    })
}
