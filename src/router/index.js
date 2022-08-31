import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pedidos',
    name: 'Pedidos',

    component: () => import(/* webpackChunkName: "pedidos" */ '../views/Pedidos.vue')
  },
  {
    path: '/fazerPedidos',
    name: 'fazerPedidos',

    component: () => import(/* webpackChunkName: "pedidos" */ '../views/fazerPedidos.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
