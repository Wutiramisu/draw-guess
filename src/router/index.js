import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import store from '@/store/index.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    store.getters.isLogin ? next() : router.push('/login');
    return;
  }

  next();
});

export default router;
