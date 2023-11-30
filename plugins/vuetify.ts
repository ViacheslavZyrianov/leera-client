import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        defaults: {
            VApp: {
                class: 'text-lowercase'
            },
            VBtn: {
                variant: 'outlined',
                class: 'text-lowercase'
            },
            VCard: {
                variant: 'outlined'
            }
        },
    })
    app.vueApp.use(vuetify)
})
