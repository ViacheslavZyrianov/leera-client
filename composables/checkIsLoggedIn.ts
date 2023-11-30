export default () => !!(useCookie('jwt')?.value && useCookie('uuid')?.value)
