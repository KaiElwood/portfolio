const { withContentlayer } = require("next-contentlayer2");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
 
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true
};
 
module.exports = withContentlayer(withBundleAnalyzer(nextConfig));
