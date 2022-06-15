import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { Plugin }  from 'vite'
import {createStyleImportPlugin} from 'vite-plugin-style-import' // 按需加载样式

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createStyleImportPlugin({
      libs:[{
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`;
        },
      }]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
})
