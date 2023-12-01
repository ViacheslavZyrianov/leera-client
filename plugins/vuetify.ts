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
            },
            VDialog: {
                VCard: {
                    variant: 'elevated'
                }
            }
        }
    })
    app.vueApp.use(vuetify)
})
