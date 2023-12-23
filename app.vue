<template>
  <div>
    <NuxtPwaManifest />
    <!-- 加载指示器 -->
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <!-- 会自动使用pages中的index.vue -->
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
// onMounted(() => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('.nuxt/dev-sw-dist/sw.js')
//   }
// })
</script>
<style>

</style>