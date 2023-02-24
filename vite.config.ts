import { defineConfig } from 'vite'
import { excludeDeps, includeDeps } from './optimize'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { configCompressPlugin } from './config/compress'
import { VitePWA } from 'vite-plugin-pwa'


// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: includeDeps,
    exclude: excludeDeps,
  },
  build: {
    minify: true,
  },
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
    }),
    // https://github.com/antfu/vite-plugin-pwa
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Modern Vue',
        short_name: 'modern-vue',
        theme_color: '#ffffff',
        dir: "ltr",
        lang: "en-US",
      
        icons: [
          {
            src: './src/assets/icons8-cash-24.png',
            sizes: '24x24',
            type: 'image/png',
          },
          {
            src: './src/assets/icons8-cash-48.png',
            sizes: '48x48',
            type: 'image/png',
          },
          {
            src: './src/assets/icons8-cash-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),

    configCompressPlugin('brotli'),
  ],
})
