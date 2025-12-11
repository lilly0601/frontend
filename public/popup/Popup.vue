<template>
  <div class="popup">
    <h1>🎄 Ваш Wishlist 🎁</h1>

    <div v-if="!token">
      <p>Пожалуйста, войдите на сайте, чтобы увидеть ваш Wishlist</p>
    </div>

    <div v-else>
      <div v-for="(items, cat) in groupedWishlist" :key="cat" class="category">
        <h2>🎅 {{ cat }}</h2>
        <ul>
          <li v-for="item in items" :key="item.id">
            {{ item.name }} — {{ item.price }}
          </li>
        </ul>
      </div>
      <div v-if="Object.keys(groupedWishlist).length === 0">
        <p>Ваш wishlist пуст 🛍️</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

const token = localStorage.getItem('jwt');
const wishlist = ref([]);

async function loadWishlist() {
  if (!token) return;

  try {
    const res = await fetch('http://localhost:3000/api/wishlist/all', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    wishlist.value = data || [];
  } catch (err) {
    console.error("Ошибка загрузки wishlist:", err);
  }
}

onMounted(() => loadWishlist());

// Группировка товаров по категориям
const groupedWishlist = computed(() => {
  const grouped = {};
  wishlist.value.forEach(item => {
    const cat = item.Product.Category?.name || "Без категории";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item.Product);
  });
  return grouped;
});
</script>

<style scoped>
.popup {
  font-family: "Comic Sans MS", sans-serif;
  padding: 10px;
  background: linear-gradient(to bottom, #ffe6e6, #fff5f0);
  border-radius: 15px;
  width: 360px;
}
h1 { color: #c40000; text-align: center; }
h2 { color: #006600; margin-top: 10px; }
li {
  list-style: none;
  padding: 3px 6px;
  margin: 2px 0;
  border-radius: 8px;
  background: #fff0f5;
}
</style>