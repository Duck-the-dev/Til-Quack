import { defineConfig } from 'vite'
import { excludeDeps, includeDeps } from './optimize'
import vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import { configCompressPlugin } from './config/compress'

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
    configCompressPlugin('brotli'),
  ],
})
