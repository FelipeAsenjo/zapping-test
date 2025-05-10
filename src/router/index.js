import { createRouter, createWebHistory } from 'vue-router'
import MoviePlayer from '@/views/MoviePlayer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'moviePlayer',
      component: MoviePlayer,
    },
    {
      path: '/details',
      name: 'movieDetails',
      component: () => import('@/views/MovieDetails.vue'),
    },
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    }
  ],
})

export default router
