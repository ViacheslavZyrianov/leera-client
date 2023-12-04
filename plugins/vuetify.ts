import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
    const vuetify = createVuetify({
        ssr: true,
        defaults: {
            VBtn: {
                // variant: 'outlined',
                class: 'text-lowercase'
            },
            VCard: {
                elevation: "8"
            }
        }
    })
    app.vueApp.use(vuetify)
})
