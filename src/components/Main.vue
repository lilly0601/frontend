<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-red-50 relative overflow-hidden">
    
    <!-- Снежинки -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div v-for="n in 20" :key="n" class="snowflake">❄️</div>
    </div>

    <div class="bg-white shadow-2xl rounded-2xl p-6 text-center border-4 border-red-300 relative z-10">
      <div class="text-5xl animate-bounce mb-2">🎄</div>
      <h1 class="text-4xl font-bold text-red-600 mb-2">Добро пожаловать! 🎁</h1>
      <p class="bg-red text-green-700 text-lg">
        В ваш рождественский Wishlist! Пусть ваши желания сбудутся ✨
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Greeting",
};
</script>

<style scoped>
/* Анимация падающих снежинок */
.snowflake {
  position: absolute;
  top: -10%;
  font-size: 1.2rem;
  animation: fall linear infinite;
  opacity: 0.8;
  left: calc(100% * var(--rand));
  animation-duration: calc(5s + 5s * var(--rand));
}
@keyframes fall {
  0% { transform: translateY(0); }
  100% { transform: translateY(110vh); }
}
</style>