const { withContentlayer } = require("next-contentlayer2");
 
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true
};
 
module.exports = withContentlayer(nextConfig);
