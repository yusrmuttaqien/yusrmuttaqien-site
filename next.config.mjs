/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/project',
        destination: '/project/dashboard-site',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
