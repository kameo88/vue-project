// style
import './assets/css/main.css'

// plugins
import { registerPlugins } from '@/plugins'


// Composables
import { createApp } from 'vue'

// import { createPinia } from 'pinia'

// Components
import App from './App.vue'

// router 는 plugins/index.ts 에서 호출
// import router from './router'

// import Vue3lottie from 'vue3-lottie'

const app = createApp(App)
registerPlugins(app)

// ??
// app.use(createPinia())

app
    // .use(Vue3lottie)
    // .use(router)
    .mount('#app')
