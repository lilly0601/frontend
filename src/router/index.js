import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Wishlist from '../components/Wishlist.vue';
import Category from '../components/Category.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Wishlist', component: Wishlist },
  { path: '/categories', name: 'Category', component: Category },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const jwt = localStorage.getItem('jwt');
  if (!jwt && to.name !== 'Login') next({ name: 'Login' });
  else if (jwt && to.name === 'Login') next({ name: 'Wishlist' });
  else next();
});

export default router;