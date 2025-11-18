import { createApp, ref, onMounted } from 'vue';

const CategoryApp = {
  template: `
    <div>
      <h2>{{ category }}</h2>
      <div v-for="product in products" :key="product.url" style="margin-bottom:10px;">
        <strong>{{ product.title }}</strong> ({{ product.brand }}) — {{ product.price }}<br>
        <img :src="product.image" width="50" style="margin-top:5px;">
      </div>
    </div>
  `,
  setup() {
    const products = ref([]);
    const category = ref('');

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      category.value = urlParams.get('category') || 'Без категории';

      chrome.runtime.sendMessage({ action: 'getWishlist' }, ({ wishlist }) => {
        products.value = wishlist[category.value] || [];
      });
    });

    return { products, category };
  }
};

createApp(CategoryApp).mount('#app');