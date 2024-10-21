const { withContentlayer } = require("next-contentlayer");
 
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	experimental: {
		appDir: true,
	}
};
 
module.exports = withContentlayer(nextConfig);
