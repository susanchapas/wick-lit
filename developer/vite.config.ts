import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    build: { chunkSizeWarningLimit: 650 },
    server: {
      proxy: {
        "/api": {
          target:
            env.WICK_API_PROXY_TARGET ??
            "http://localhost:7071",
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});
