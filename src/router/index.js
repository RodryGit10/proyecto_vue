import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/area',
    name: 'area',
    component: () => import(/* webpackChunkName: "AreasView" */ '../views/AreasView.vue')
  },
  {
    path: '/area/:id',
    name: 'areaUpdate',
    component: () => import(/* webpackChunkName: "AreasUpdateView" */ '../views/AreasUpdateView.vue')
  },
  {
    path: '/activo',
    name: 'activo',
    component: () => import(/* webpackChunkName: "ActivosView" */ '../views/ActivosView.vue')
  },
  {
    path: '/activo/:id',
    name: 'activoUpdate',
    component: () => import(/* webpackChunkName: "ActivosViewUpdete" */ '../views/ActivosViewUpdete.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
