/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "ezguljgduiakfcehjegy.supabase.co",
                port: "",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "/**",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
