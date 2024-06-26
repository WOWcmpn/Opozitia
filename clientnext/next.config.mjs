/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["static.mk.ru", "localhost", "picsum.photos",
      'plus.unsplash.com', 'cdn.weatherapi.com', 'opozitia.vercel.app', 'opozitia-server.vercel.app',
      'finance.rambler.ru', 'news.store.rambler.ru', 'i.ytimg.com', 'img01.rl0.ru'], // <== Domain name
  },
};

export default nextConfig;
