import createMDX from "@next/mdx";

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
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    transpilePackages: ["next-mdx-remote"],
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
