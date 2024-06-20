import CopyPlugin from "copy-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer, dev }) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    console.log("Performing Webpack config", { isServer, dev });
    if (isServer) {
      if (!dev) {
        config.plugins.push(
          new CopyPlugin({
            patterns: [
              {
                context: "/var/task/.next/server",
                to: "./app/[name][ext]",
                from: "../../node_modules/@xmtp/user-preferences-bindings-wasm/dist/node",
                filter: (resourcePath) => resourcePath.endsWith(".wasm"),
              },
            ],
          })
        );
        config.plugins.push(
          new CopyPlugin({
            patterns: [
              {
                context: "/var/task/.next/server",
                to: "./chunks/[name][ext]",
                from: "../../node_modules/@xmtp/user-preferences-bindings-wasm/dist/node",
                filter: (resourcePath) => resourcePath.endsWith(".wasm"),
              },
            ],
          })
        );
      } else {
        config.plugins.push(
          new CopyPlugin({
            patterns: [
              {
                context: ".next/server",
                to: "./vendor-chunks/[name][ext]",
                from: "../../node_modules/@xmtp/user-preferences-bindings-wasm/dist/node",
                filter: (resourcePath) => resourcePath.endsWith(".wasm"),
              },
            ],
          })
        );
      }
    }
    return config;
  },
};

export default nextConfig;
