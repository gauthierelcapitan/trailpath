import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteTsConfigPathsPlugin from 'vite-tsconfig-paths';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { VitePluginFonts } from 'vite-plugin-fonts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    ViteTsConfigPathsPlugin({
      root: '../../',
      projects: ['tsconfig.base.json'],
    }),
    VitePluginFonts({
      google: {
        preconnect: true,
        display: 'swap',
        families: [
          {
            name: 'JetBrains+Mono',
            styles: 'ital,wght@0,300;0,400;0,600;1,300;1,400;1,600',
            defer: true,
          },
        ],
      },
      custom: {
        families: [
          {
            name: 'MonoLisa',
            src: './src/assets/fonts/mono/*.ttf',
          },
        ],
        display: 'auto',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend',
      },
    }),
    tsconfigPaths({ projects: ['../../tsconfig.base.json'] }),
    vanillaExtractPlugin({}),
  ],
});
