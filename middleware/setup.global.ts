export default defineNuxtRouteMiddleware((to) => {
    const jwt = useCookie('jwt')
    const uuid = useCookie('uuid')
    const nuxtApp = useNuxtApp()

    const isGuest = jwt?.value && uuid?.value

    const allowedGuestRoutes = [
        '/stories'
    ]

    const { locale: { value: locale }, defaultLocale } = nuxtApp.$i18n

    const routeWithLocalePrefix = locale === defaultLocale ?  '' : `/${locale}`

    const isOnHomepageRoute = to.name === `index___${locale}`

    const isGuestOnAllowedRoute = allowedGuestRoutes.find((allowedRoute: string) => `${routeWithLocalePrefix}${allowedRoute}` === to.path)

    if (!isOnHomepageRoute && !isGuest && !isGuestOnAllowedRoute) {
        return navigateTo(routeWithLocalePrefix)
    }
})
