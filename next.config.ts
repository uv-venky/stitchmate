import type { NextConfig } from "next";
import path from "path";

// Local uv-core source is linked via package.json ("uv-core": "link:../uv-core")
const uvCoreSrc = path.resolve(__dirname, "./node_modules/uv-core/src");

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
      "@/components/core": path.join(uvCoreSrc, "components/core"),
      "@/components/ui": path.join(uvCoreSrc, "components/ui"),
      "@/components/sidebar": path.join(uvCoreSrc, "components/sidebar"),
      "@/lib/monaco-setup": path.join(uvCoreSrc, "lib/monaco-setup"),
      "@/lib/monaco-theme": path.join(uvCoreSrc, "lib/monaco-theme"),
      "@/lib/feedback/client/FeedbackWidget": path.join(uvCoreSrc, "lib/feedback/client/FeedbackWidget"),
      "@/lib/markdown": path.join(uvCoreSrc, "lib/markdown"),
      "@/lib/workflow/client-plugin": path.join(uvCoreSrc, "lib/workflow/client-plugin"),
      "@/lib/common/ui-constants": path.join(uvCoreSrc, "lib/common/ui-constants"),
      "@/lib/common": path.join(uvCoreSrc, "lib/common"),
      "@/lib/core": path.join(uvCoreSrc, "lib/core"),
      "@/plugins": path.join(uvCoreSrc, "plugins"),
      "@/hooks": path.join(uvCoreSrc, "hooks"),
      "@/app": path.join(uvCoreSrc, "app"),
    };
    return config;
  },
};

export default nextConfig;

