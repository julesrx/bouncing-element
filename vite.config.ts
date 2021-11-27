import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'Bouncer',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: format => `bouncing-element.${format}.js`
    }
  }
});
