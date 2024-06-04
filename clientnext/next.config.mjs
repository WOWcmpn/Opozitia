/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static.mk.ru", "localhost", "picsum.photos",
      'plus.unsplash.com', 'cdn.weatherapi.com', 'opozitia-test.vercel.app',
      'finance.rambler.ru'], // <== Domain name
  },
};

export default nextConfig;
