import type { NextConfig } from "next";
import path from "path";

// Linked uv-core package exposes dist/, not src/
const uvCoreRoot = path.resolve(__dirname, "./node_modules/uv-core/dist");

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['uv-core'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    const appNodeModules = path.resolve(__dirname, 'node_modules');
    config.resolve.modules = [appNodeModules, ...(config.resolve.modules || [])];
    config.resolve.alias = {
      ...config.resolve.alias,
      // Map all @/ aliases to uv-core source so both stitchmate generated files
      // and uv-core's internal imports resolve correctly during transpilation.
      "@/components/core": path.join(uvCoreRoot, "components/core"),
      "@/components/ui": path.join(uvCoreRoot, "components/ui"),
      "@/components/sidebar": path.join(uvCoreRoot, "components/sidebar"),
      "@/lib/monaco-setup": path.join(uvCoreRoot, "lib/monaco-setup"),
      "@/lib/monaco-theme": path.join(uvCoreRoot, "lib/monaco-theme"),
      "@/lib/feedback/client/FeedbackWidget": path.join(uvCoreRoot, "lib/feedback/client/FeedbackWidget"),
      "@/lib/markdown": path.join(uvCoreRoot, "lib/markdown"),
      "@/lib/workflow/client-plugin": path.join(uvCoreRoot, "lib/workflow/client-plugin"),
      "@/lib/common/ui-constants": path.join(uvCoreRoot, "lib/common/ui-constants"),
      "@/lib/common": path.join(uvCoreRoot, "lib/common"),
      "@/lib/core": path.join(uvCoreRoot, "lib/core"),
      "@/plugins": path.join(uvCoreRoot, "plugins"),
      "@/hooks": path.join(uvCoreRoot, "hooks"),
      "@/app": path.join(uvCoreRoot, "app"),
    };
    return config;
  },
};

export default nextConfig;

