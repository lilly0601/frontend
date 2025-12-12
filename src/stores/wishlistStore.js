// import { defineStore } from "pinia";
// import axios from "axios";
// // import { useUserStore } from "./userStore.js";


// export const useWishlistStore = defineStore("wishlist", {
//   state: () => ({
//     products: {},          // { category: [ {title, url, ...} ] }
//     categories: []
//   }),

//   actions: {
//     // 📌 Загружаем весь wishlist с сервера (сгруппированный по категории)
//     async loadFromServer() {
//       try {
//         const token = localStorage.getItem("jwt");
//         if (!token) return;

//         const res = await axios.get("http://localhost:3000/api/wishlist/all", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         this.products = res.data;
//         this.categories = Object.keys(res.data);

//       } catch (err) {
//         console.error("Ошибка загрузки wishlist:", err);
//       }
//     },

//     // 📌 Добавление товара — отправляем на backend
//     async addToWishlist(product) {
//       try {
//         const token = localStorage.getItem("jwt");
//         if (!token) throw new Error("Нет токена!");

//         const res = await axios.post(
//           "http://localhost:3000/api/wishlist/add",
//           product,
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );

//         // Обновляем локально
//         if (!this.products[product.category]) {
//           this.products[product.category] = [];
//         }

//         const exists = this.products[product.category].some(
//           (p) => p.url === product.url
//         );

//         if (!exists) {
//           this.products[product.category].push(product);
//         }

//       } catch (err) {
//         console.error("Ошибка добавления:", err);
//       }
//     }
//   }
  
// });
import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useWishlistStore = defineStore("wishlist", () => {
  const products = ref([]);       // массив товаров
  const categories = ref([]);     // массив категорий
  const filteredProducts = ref([]); // для отображения товаров по категориям

  const setWishlist = (data) => {
    products.value = data;
    categories.value = Object.keys(data);
    filteredProducts.value = Object.values(data).flat();
  };

  const loadFromServer = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) return;

      const res = await axios.get("http://localhost:3000/api/wishlist/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setWishlist(res.data);
    } catch (err) {
      console.error("Ошибка загрузки wishlist:", err);
    }
  };

  const addToWishlist = async (product) => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) throw new Error("Нет токена!");

      await axios.post(
        "http://localhost:3000/api/wishlist/add",
        product,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      // Обновляем локально
      const categoryIndex = products.value.findIndex(p => p.category === product.category);
      if (categoryIndex === -1) {
        products.value.push({ category: product.category, items: [product] });
      } else {
        const exists = products.value[categoryIndex].items.some(p => p.url === product.url);
        if (!exists) products.value[categoryIndex].items.push(product);
      }

      if (!categories.value.includes(product.category)) {
        categories.value.push(product.category);
      }

      // После добавления обновляем отображаемые товары
      showAllCategories();

    } catch (err) {
      console.error("Ошибка добавления:", err);
    }
  };

  const showAllCategories = () => {
    filteredProducts.value = products.value.flatMap(c => c.items || []);
  };

  return { products, categories, filteredProducts, setWishlist, loadFromServer, addToWishlist, showAllCategories };
});