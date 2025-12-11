import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  id: "user",
  state: () => ({
    token: localStorage.getItem("jwt") || null,
    user: null,
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await axios.post("http://localhost:3000/api/account/login/", {
          username,
          password
        });

        // Если сервер возвращает токен и пользователя
        if (res.data?.token) {
          this.token = res.data.token;
          this.user = res.data.user;

          // Сохраняем токен
          localStorage.setItem("jwt", this.token);
        }

        return { success: true, message: res.data.message || "Успешно" };
      } catch (err) {
        // Сообщение ошибки от сервера
        return {
          success: false,
          message: err.response?.data?.message || "Ошибка при входе"
        };
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("jwt");
    }
  }
});