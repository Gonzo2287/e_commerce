/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      },
};

export default {
    ...nextConfig,
    typescript: {
      ignoreBuildErrors: true, // Ignora errores de TypeScript
    },
    eslint: {
      ignoreDuringBuilds: true, // Ignora errores de ESLint
    },
};

