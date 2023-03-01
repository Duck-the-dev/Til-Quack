<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: 'Duck-the-dev vue + vite Template',
  link: [
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#00aba9',
    },
    {
      rel: 'icon',
      href: '/favicon.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'apple-touch-icon',
      href: '/pwa-192x192.png',
    },
    {
      rel: 'canonical',
      href: 'https://coral-app-29wb9.ondigitalocean.app',
    },
  ],
  meta: [
    {
      charset: 'UTF-8',
    },
    {
      name: 'msapplication-TileColor',
      content: '#00aba9',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
    {
      name: 'description',
      content: 'Vue learning journey',
    },
  ],
})
</script>

<template>
  <div class="flex items-center justify-center">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo h-44 w-44" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue h-44 w-44" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="LonesomeT0wn start" />
</template>

<style scoped>
.logo {
  height: 8em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
