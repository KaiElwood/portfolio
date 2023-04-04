const { withContentlayer } = require("next-contentlayer")
 
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
	}
}
 
module.exports = withContentlayer(nextConfig)
