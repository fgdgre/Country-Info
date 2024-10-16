import { createRouter, createWebHistory } from 'vue-router'
import CountrisesPage from '../views/CountriesPage.vue'
import CountryPage from '@/views/CountryPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CountrisesPage,
    },
    {
      path: '/country/:countryName/:countryCode',
      name: 'country',
      component: CountryPage,
    },
  ],
})

export default router
