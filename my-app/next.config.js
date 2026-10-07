const { withContentlayer } = require("next-contentlayer2");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
 
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	async rewrites() {
		return [{ source: '/payroll_data', destination: '/payroll_data/index.html' }];
	}
};
 
module.exports = withContentlayer(withBundleAnalyzer(nextConfig));
