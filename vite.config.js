import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/est_fe13_2nd_project/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        notFound: resolve(__dirname, "404.html"),
        productList: resolve(__dirname, "productList.html"),
        detail: resolve(__dirname, "detail.html"),
        cart: resolve(__dirname, "cart.html"),
        login: resolve(__dirname, "login.html"),
        signup: resolve(__dirname, "signup.html"),
      },
    },
  },
});
