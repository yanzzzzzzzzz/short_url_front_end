import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const API_URL = `${env.VITE_PROXY_TARGET}`;
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: API_URL,
          // target: 'http://localhost:4001',
          changeOrigin: true
        }
      }
    }
  };
});
