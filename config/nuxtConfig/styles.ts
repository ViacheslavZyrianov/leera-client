export default {
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/variables.scss" as *;',
                }
            }
        }
    },
    css: [
        '@/assets/global.scss'
    ]
}
