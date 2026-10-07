const { withContentlayer } = require("next-contentlayer2");

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
 
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	async rewrites() {
		return [
			{ source: '/payroll_data', destination: 'https://kaielwood.github.io/payroll_data/' },
			{ source: '/payroll_data/:path*', destination: 'https://kaielwood.github.io/payroll_data/:path*' },
		];
	}
};
 
module.exports = withContentlayer(withBundleAnalyzer(nextConfig));
