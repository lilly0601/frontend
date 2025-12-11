// 


import { defineStore } from "pinia";
import axios from "axios";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    products: {},          // { category: [ {title, url, ...} ] }
    categories: []
  }),

  actions: {
    // 📌 Загружаем весь wishlist с сервера (сгруппированный по категории)
    async loadFromServer() {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) return;

        const res = await axios.get("http://localhost:3000/api/wishlist/all", {
          headers: { Authorization: `Bearer ${token}` }
        });

        this.products = res.data;
        this.categories = Object.keys(res.data);

      } catch (err) {
        console.error("Ошибка загрузки wishlist:", err);
      }
    },

    // 📌 Добавление товара — отправляем на backend
    async addToWishlist(product) {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) throw new Error("Нет токена!");

        const res = await axios.post(
          "http://localhost:3000/api/wishlist/add",
          product,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        // Обновляем локально
        if (!this.products[product.category]) {
          this.products[product.category] = [];
        }

        const exists = this.products[product.category].some(
          (p) => p.url === product.url
        );

        if (!exists) {
          this.products[product.category].push(product);
        }

      } catch (err) {
        console.error("Ошибка добавления:", err);
      }
    }
  }
});