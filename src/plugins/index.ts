/******
 * plugins/index.ts
 * automatically included in `./src/main.ts`
 * router, vuetify, vue3-lottie 등 설정
 */


// plugins
import  router from '@/router'
// import pinia from '@/store'
// import vuetify from './vuetify.ts'
// import Vue3lottie from 'vue3-lottie'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
    app
        // .use(Vue3lottie)
        .use(router)
        // .use(vuetify)
}