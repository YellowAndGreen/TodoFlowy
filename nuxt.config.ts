// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt'],
  elementPlus: {
    // 配置选项
  },
  css: [
    '~/assets/global.css'
  ],
});
