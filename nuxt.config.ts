// https://nuxt.com/docs/api/configuration/nuxt-config
import routeRules from './config/nuxtConfig/routeRules'
import modules from './config/nuxtConfig/modules'
import styles from './config/nuxtConfig/styles'
import build from './config/nuxtConfig/build'
import vite from './config/nuxtConfig/build'

export default defineNuxtConfig({
    vite,
    devtools: { enabled: true },
    build,
    modules,
    routeRules,
    ...styles,
    dayjs: {
        locales: ['en', 'uk'],
        defaultLocale: 'en'
    }
})
