// https://nuxt.com/docs/api/configuration/nuxt-config
import modules from './config/nuxtConfig/modules'
import styles from './config/nuxtConfig/styles'
import build from './config/nuxtConfig/build'
import vite from './config/nuxtConfig/build'

export default defineNuxtConfig({
    devtools: { enabled: true },
    build,
    modules,
    vite,
    ...styles
})
