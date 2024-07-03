/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.mwc.com.vn",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "mwc.com.vn",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
