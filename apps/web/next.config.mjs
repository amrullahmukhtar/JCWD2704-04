/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "m.media-amazon.com",
      "via.placeholder.com",
      "assets.aceternity.com",
    ],
  },
  env: {
    MAIN_API: process.env.MAIN_API,
    OMDB_KEY: process.env.OMDB_KEY,
  },
};

export default nextConfig;
