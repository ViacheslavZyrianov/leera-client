import { transformAssetUrls } from 'vite-plugin-vuetify'

export default {
    vue: {
        template: {
            transformAssetUrls
        },
    },
}
