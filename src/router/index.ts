import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: TabsPage,
        children: [
            {
                path: '',
                redirect: '/people',
            },
            {
                path: 'people',
                component: () => import('@/views/PeopleTab.vue'),
            },
            {
                path: 'planets',
                component: () => import('@/views/PlanetsTab.vue'),
            },

            {
                path: '/people/:url',
                component: () => import('@/views/PersonDetail.vue'),
            },
            {
                path: '/planets/:url',
                component: () => import('@/views/PlanetDetail.vue'),
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
