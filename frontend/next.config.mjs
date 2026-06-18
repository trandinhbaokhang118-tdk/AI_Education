/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tạo bản build độc lập (standalone) — tối ưu cho deploy Docker/Node server.
  output: "standalone",
  // Ẩn header X-Powered-By để giảm lộ thông tin hạ tầng.
  poweredByHeader: false,
  reactStrictMode: true,
  // Nén phản hồi để tải nhanh hơn.
  compress: true,

  // Các header bảo mật cơ bản áp cho mọi route.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
