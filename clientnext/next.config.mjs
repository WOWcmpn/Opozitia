/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.mk.ru',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'finance.rambler.ru',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'news.store.rambler.ru',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.m24.ru',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.championat.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img01.rl0.ru',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img02.rl0.ru',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img03.rl0.ru',
        port: '',
      },
    ],
  },
};

export default nextConfig;
