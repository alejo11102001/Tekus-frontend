import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import ProvidersList from '../views/ProvidersList.vue'
import ProviderForm from '../views/ProviderForm.vue'
import ServicesList from '../views/ServicesList.vue'
import Reports from '../views/Reports.vue'
import { getToken } from '../services/api'

const routes = [
    { path: '/', redirect: '/providers' },
    { path: '/login', component: LoginView },
    { path: '/providers', component: ProvidersList, meta: { requiresAuth: true } },
    { path: '/providers/new', component: ProviderForm, meta: { requiresAuth: true } },
    { path: '/providers/:id/edit', component: ProviderForm, meta: { requiresAuth: true }, props: true },
    { path: '/services', component: ServicesList, meta: { requiresAuth: true } },
    { path: '/reports', component: Reports, meta: { requiresAuth: true } },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if ((to.meta as any).requiresAuth && !getToken()) {
        return next('/login')
    }
    next()
})

export default router
