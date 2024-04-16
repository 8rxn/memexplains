/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "memes-cdn.rajaryan.work",
      },
      {
        protocol: "https",
        hostname: "memes.e7a17d0cace2e321c4b772e9f252658e.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default nextConfig;
