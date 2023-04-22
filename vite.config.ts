import { defineConfig } from 'vite'
import { excludeDeps, includeDeps } from './optimize'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'
import AutoImport from 'unplugin-auto-import/vite'
import Sitemap from 'vite-plugin-sitemap'
import imagemin from 'unplugin-imagemin/vite'

const routes = [ 'privacy','notfound','contact']

const dynamicRoutes = routes.map((route) => `/${route}`)

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: [
    '**/*.webp',


  ],
  optimizeDeps: {
    include: includeDeps,
    exclude: excludeDeps,
  },
  build: {
    minify: true,
    chunkSizeWarningLimit: 2000,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  // @ts-ignore
  ssgOptions: {
    script: 'async',
    formatting: 'minify',

    crittersOptions: {
      // E.g., change the preload strategy
      preload: 'js-lazy',
      // Other options: https://github.com/GoogleChromeLabs/critters#usage
    },
  },

  plugins: [
    vue(),

    Sitemap({
      hostname: 'https://bardi.tech/',
      dynamicRoutes: dynamicRoutes,
      exclude: ['/sitemap'],
      readable: true,
    }),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      resolvers: [
        // ElementPlusResolver(),
      ],
      dirs: ['./composables/**'],
      vueTemplate: true,
      cache: true,
    }),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue'],

      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/],

      // custom resolvers
      resolvers: [
        // auto import icons
        // https://github.com/antfu/unplugin-icons
        IconsResolver({
          prefix: false,
          // enabledCollections: ['carbon']
        }),
      ],

      dts: 'src/components.d.ts',
    }),

    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
    //https://github.com/ErKeLost/unplugin-imagemin
    imagemin({
      // Default mode squoosh. support squoosh and sharp
      mode: 'sharp',
      // Default configuration options for compressing different pictures

      compress: {
        jpg: {
          quality: 75,
        },
        jpeg: {
          quality: 75,
          progressive: false,
          chromaSubsampling: '4:4:4',
          trellisQuantisation: false,
          overshootDeringing: false,
          optimiseScans: false,
          optimizeScans: false,
          optimiseCoding: true,
          optimizeCoding: true,
          quantisationTable: 0,
          quantizationTable: 0,
          force: true,
        },
        png: {
          progressive: false,
          compressionLevel: 6,
          adaptiveFiltering: false,
          force: true,
          palette: true,
          quality: 75,
          effort: 5,
          bitdepth: 8,
          dither: 1,
        },
        webp: {
          quality: 70,
          alphaQuality: 100,
          lossless: false,
          nearLossless: false,
          smartSubsample: false,
          effort: 6,
        },
      },
      // The type of picture converted after the build

      conversion: [{ from: 'jpeg', to: 'webp' }],
    }),
    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      srcDir: 'src',

      base: '/',
      
      includeAssets: ['favicon.ico', 'robots.txt', 'safari-pinned-tab.svg'],
      workbox: {

        globPatterns: ['**/*.{js,css,html,woff2,woff,ttf,svg,png,jpg,jpeg,gif}'],
        globDirectory: 'dist',
        globIgnores: [ '**/404.html'],
        skipWaiting: true,
        clientsClaim: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'jsdelivr',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
              },
            },
          },
     
          // cloudflare cdn
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdnjs',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
              },
            },
          },
          // assets cache
          {
            urlPattern: /^https:\/\/bardi\.tech\/assets\//,
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets',
              cacheableResponse: {
                statuses: [0, 200],
              },
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
              },
            },
          },
        ],
      },

      manifest: {
        name: 'Bardi.tech',
        short_name: 'Bardi.tech',

        theme_color: '#ffffff',
        dir: 'ltr',
        lang: 'en-US',
        description: 'Bardi.tech',
        display: 'standalone',
        background_color: '#ffffff',
        start_url: '/',
        scope: '/',

        icons: [
          {
            src: '/pwa-256x256.png',
            sizes: '256x256',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    // configCompressPlugin('brotli'),
  ],
})
