const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['app-emineon.vercel.app'],
  },
};
 
module.exports = withNextIntl(nextConfig); 