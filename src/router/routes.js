import Login from '@/pages/Login.vue';

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('@/pages/Index.vue'), meta: { requireAuth: true } }],
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/Error404.vue'),
  },
];

export default routes;
