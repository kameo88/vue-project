// router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

import guide from './guide.ts'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ... guide,
        // 
        // { path: `/`, redirect: `/guide` },
        { path: `/`, redirect: `/kameo`},

        // 마이페이지
        {
            path: `/my/`,
            component: () => import(`@/layouts/MainLayout.vue`),
            children:[
                { path: `mypage`, name: `mypage`, component: () => import(`@/views/my/mypage.vue`)}
            ]
        }
    ]
});

export default router;
