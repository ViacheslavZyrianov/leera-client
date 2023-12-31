import vuetify from 'vite-plugin-vuetify'
import i18n from './i18n/index'

export default [
    '@pinia/nuxt',
    'dayjs-nuxt',
    [
        '@nuxtjs/i18n',
        i18n
    ],
    ['@nuxtjs/google-fonts', {
        families: {
            'Yeseva+One': true,
            Montserrat: true
        }
    }],
    (_options: any, nuxt: { hooks: { hook: (arg0: string, arg1: (config: any) => void) => void } }) => {
        nuxt.hooks.hook('vite:extendConfig', (config) => {
            config.plugins.push(vuetify({ autoImport: true }))
        })
    },
    '@vee-validate/nuxt'
]
