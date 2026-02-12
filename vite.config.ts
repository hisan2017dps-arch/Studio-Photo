
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development/production)
  // The third argument '' loads all variables including those without VITE_ prefix
  // Using '.' instead of process.cwd() to resolve potential type issues with process in certain environments
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [react()],
    define: {
      // Safely inject API_KEY from environment to the browser context
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
      // Prevent "process is not defined" errors in browser
      'process.env': {} 
    },
    build: {
      outDir: 'dist',
      sourcemap: false
    }
  };
});
