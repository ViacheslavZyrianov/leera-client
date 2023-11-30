export default {
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/styles/variables.scss" as *;',
                }
            }
        }
    },
    css: [
        '@/assets/styles/global.scss'
    ]
}
