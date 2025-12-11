<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-100 via-white to-red-50 relative overflow-hidden">

    <!-- Снежинки -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div v-for="n in 50" :key="n" class="snowflake" :style="randomSnowflakeStyle()">❄️</div>
    </div>

    <!-- Контент -->
    <div class="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border-4 border-red-300 relative z-10">
      <h1 class="text-3xl font-extrabold text-red-600 text-center mb-6 drop-shadow-md">
        🎄 Ваш Wishlist 🎁
      </h1>

      <!-- Категории -->
      <div class="mb-6">
        <h2 class="text-green-700 font-bold mb-2">Категории</h2>
        <ul>
          <li v-for="cat in categories" :key="cat.id" class="category-item">
            🎅 {{ cat.name }}
          </li>
        </ul>
      </div>

      <!-- Wishlist -->
      <div>
        <h2 class="text-green-700 font-bold mb-2">Сохранённые товары</h2>
        <ul>
          <li v-for="item in wishlist" :key="item.id" class="wishlist-item">
            🎁 {{ item.product.name }}
          </li>
        </ul>
      </div>

      <div v-if="errorMessage" class="text-red-500 mt-4 text-center">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/userStore.js";
import { storeToRefs } from "pinia";

export default {
  name: "WishlistCategories",
  setup() {
    const userStore = useUserStore();
    const { token, user } = storeToRefs(userStore);
    return { token, user, userStore };
  },
  data() {
    return {
      categories: [],
      wishlist: [],
      errorMessage: ""
    };
  },
  async mounted() {
    if (!this.token) {
      this.errorMessage = "Пожалуйста, войдите в систему";
      return;
    }
    await this.loadCategories();
    await this.loadWishlist();
  },
  methods: {
    async loadCategories() {
      try {
        const res = await fetch("http://localhost:3000/api/category/all", {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        this.categories = await res.json();
      } catch (e) {
        console.error(e);
        this.errorMessage = "Ошибка загрузки категорий";
      }
    },
    async loadWishlist() {
      try {
        const res = await fetch("http://localhost:3000/api/wishlist/me", {
          headers: { Authorization: `Bearer ${this.token}` }
        });
        this.wishlist = await res.json();
      } catch (e) {
        console.error(e);
        this.errorMessage = "Ошибка загрузки wishlist";
      }
    },
    randomSnowflakeStyle() {
      const size = Math.random() * 1.5 + 0.8;
      const left = Math.random() * 100;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 5;
      return {
        left: `${left}%`,
        fontSize: `${size}rem`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      };
    }
  }
};
</script>

<style scoped>
.snowflake {
  position: absolute;
  top: -10%;
  opacity: 0.8;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes fall {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(50vh) rotate(180deg); }
  100% { transform: translateY(110vh) rotate(360deg); }
}

.category-item, .wishlist-item {
  margin: 4px 0;
  padding: 5px 10px;
  border-radius: 10px;
  background: #fff0f5;
  border: 1px solid #ffcccc;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.1);
  transition: 0.3s;
}

.category-item:hover, .wishlist-item:hover {
  background: #ffe6e6;
  transform: translateX(5px);
}
</style>