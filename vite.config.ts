import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  define: {
    // By default, Vite doesn't include shims for NodeJS/ necessary for segment
    // analytics lib to work
    // https://github.com/vitejs/vite/discussions/5912#discussioncomment-2908994
    global: {},
  },
  server: {
    open: true,
    port: 3000,
  },
});
