const path = require('path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      name: 'BouncingElement',
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: format => `bouncing-element.${format}.js`
    }
  }
});
