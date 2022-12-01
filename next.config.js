/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/dog_breed",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
