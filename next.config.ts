import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gera .next/standalone: imagem Docker enxuta para o Easypanel (ver Dockerfile).
  output: "standalone",
};

export default nextConfig;
