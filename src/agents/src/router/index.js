import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../views/Home.vue'),
        meta: { title: '首页' }
    },
    {
        path: '/worlds',
        component: () => import('../views/WorldDisplay/index.vue'),
        meta: { title: '世界观档案室' }
    },
    {
        path: '/world-setting',
        component: () => import('../views/WorldSetting/index.vue'),
        meta: { title: '世界观设定' }
    },
    {
        path: '/character-setting',
        component: () => import('../views/CharacterSetting/index.vue'),
        meta: { title: '角色设定' }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 