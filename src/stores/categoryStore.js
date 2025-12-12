import { defineStore } from "pinia";
import axios from "axios";
import { useUserStore } from "./userStore.js";

export const useCategoryStore = defineStore("category", {
  id: "category",
  state: () => ({
    categories: [],
    wishlist: [],
    loadingCategories: false,
    loadingWishlist: false,
    error: null
  }),
  actions: {
    async loadCategories() {
      const userStore = useUserStore();
      this.loadingCategories = true;
      this.error = null;

      try {
        const res = await axios.get("http://localhost:3000/api/categories/all", {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        });
        this.categories = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || "Ошибка при загрузке категорий";
      } finally {
        this.loadingCategories = false;
      }
    },

    async loadWishlist() {
      const userStore = useUserStore();
      this.loadingWishlist = true;
      this.error = null;

      try {
        const res = await axios.get("http://localhost:3000/api/wishlist/all", {
          headers: {
            Authorization: `Bearer ${userStore.token}`
          }
        });
        this.wishlist = res.data;
      } catch (err) {
        this.error = err.response?.data?.message || "Ошибка при загрузке wishlist";
      } finally {
        this.loadingWishlist = false;
      }
    },

    clear() {
      this.categories = [];
      this.wishlist = [];
      this.error = null;
    }
  }
});