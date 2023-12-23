

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt','@vite-pwa/nuxt'
  ],
  elementPlus: {
    // 配置选项
  },
  app: {
    head: {
      title: 'TodoFlowy'
    }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'TodoFlowyPWA',
      short_name: 'TodoFlowy',
      description: 'This is an awesome app', // 应用描述
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: 'localhost:3000/.*',
          handler: 'NetworkFirst',
          method: 'GET'
        }
      ],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
  },
  css: [
    '~/assets/global.css'
  ],
});
