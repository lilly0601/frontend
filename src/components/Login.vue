<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-100 via-white to-red-50 relative overflow-hidden">

    <!-- Снежинки -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div v-for="n in 50" :key="n" class="snowflake" :style="randomSnowflakeStyle()">
        ❄️
      </div>
    </div>

    <!-- Форма -->
    <div class="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-sm border-4 border-red-300 relative z-10">
      
      <!-- Header -->
      <div class="flex flex-col items-center mb-6">
        <div class="text-6xl animate-bounce">🎄</div>
        <h1 class="text-3xl font-extrabold text-red-600 mt-2 text-center drop-shadow-md">
          Merry Christmas Login
        </h1>
      </div>

      <p class="text-center text-green-600 mb-6 animate-pulse">
        Добро пожаловать в ваш Wishlist! Пусть ваше Рождество будет волшебным! ✨
      </p>

      <!-- Username -->
      <input
        v-model="username"
        type="text"
        placeholder="Ваш Username 🎁"
        class="border-2 border-green-300 focus:border-green-500 transition-all duration-200 rounded-lg w-full p-3 mb-3 bg-green-50 placeholder-green-300 text-green-700 outline-none shadow-inner"
      />

      <!-- Password -->
      <input
        v-model="password"
        type="password"
        placeholder="Ваш пароль ❄️"
        class="border-2 border-green-300 focus:border-green-500 transition-all duration-200 rounded-lg w-full p-3 mb-4 bg-green-50 placeholder-green-300 text-green-700 outline-none shadow-inner"
      />

      <!-- Button -->
      <button
        @click="handleLogin"
        class="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-3 rounded-lg transition-all duration-300 shadow-lg text-lg flex items-center justify-center gap-2 animate-pulse hover:scale-105"
      >
        🎁 Войти 🎁
      </button>

      <!-- Ошибка -->
      <div v-if="errorMessage" class="text-red-500 text-sm mt-3 text-center">
        {{ errorMessage }}
      </div>

      <div class="text-center text-green-400 text-sm mt-4">
        * Пусть ваш Вишлист принесёт радость в это Рождество! *
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "../stores/userStore.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

export default {
  name: "Login",
  setup() {
    const userStore = useUserStore();
    const { token, user } = storeToRefs(userStore);
    const router = useRouter();
    return { userStore, token, user, router };
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      if (!this.username || !this.password) {
        this.errorMessage = "Введите username и пароль";
        return;
      }

      const result = await this.userStore.login(this.username, this.password);

      if (result.success) {
        this.errorMessage = "";
        this.router.replace({ name: "Wishlist" });
      } else {
        this.errorMessage = result.message;
      }
    },
    randomSnowflakeStyle() {
      const size = Math.random() * 1.5 + 0.8; // размер
      const left = Math.random() * 100; // позиция слева
      const duration = Math.random() * 5 + 5; // скорость
      const delay = Math.random() * 5; // задержка
      return {
        left: `${left}%`,
        fontSize: `${size}rem`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      };
    }
  },
};
</script>

<style scoped>
/* Снежинки */
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
</style>