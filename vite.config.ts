import { UserConfig, defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  base: '/',
  envPrefix: 'REACT_APP_',
  plugins: [
    react(),
    {
      ...eslint(),
      apply: 'serve'
    }
  ] as UserConfig['plugins'],
  build: {
    outDir: './build',
    emptyOutDir: true,
    sourcemap: true,
  },
  server: {
    host: true,
    port: 3000
  },
  preview: {
    port: 3000
  }
});
