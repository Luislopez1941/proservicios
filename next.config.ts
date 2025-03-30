import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // config.experiments = {
      //   turboModules: true,
      // };
    }

    // Agregar soporte para archivos JSON
    config.module.rules.push({
      test: /\.json$/,
      type: 'javascript/auto',
      loader: 'json-loader',
    });

    return config;
  },
  /* Añade otras opciones de configuración aquí */
};

export default nextConfig;
