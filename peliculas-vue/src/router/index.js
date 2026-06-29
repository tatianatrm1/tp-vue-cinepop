import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    components: {
      default: () => import('@/views/HomeView.vue'),
      navbar: () => import('@/components/Navbar.vue'),
    },
  },
  {
    path: '/detalle/:id',
    components: {
      default: () => import('@/views/DetalleView.vue'),
      navbar: () => import('@/components/Navbar.vue'),
    },
  },
  {
    path: '/favorito',
    components: {
      default: () => import('@/views/FavoritoView.vue'),
      navbar: () => import('@/components/Navbar.vue'),
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router