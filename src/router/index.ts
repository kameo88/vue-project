// router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

import guide from './guide.ts'
import path from 'path';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ... guide,
        // 
        { path: `/`, redirect: `/guide` },
        // {path: `/kameo`, redirect: `/kameo/index.vue`}

        // 마이페이지
        {
            path: `/my/`,
            component: () => import(`@/layouts/MainLayout.vue`),
            children:[
                { path: `mypage`, name: `mypage`, component: () => import(`@/view/my/mypage.vue`)}
            ]
        }
    ]
});

export default router;