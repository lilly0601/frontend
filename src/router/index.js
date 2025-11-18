import { createRouter, createWebHashHistory } from 'vue-router';
import WishlistView from '../components/Wishlist.vue';
import CategoryView from '../components/CategoryItem.vue';

const routes = [
  { path: '/', component: WishlistView },
  { path: '/category/:name', component: CategoryView, props: true }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes
});