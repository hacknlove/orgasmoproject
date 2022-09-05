/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withOrgasmo = require('orgasmo/withOrgasmo')()

module.exports = withOrgasmo(nextConfig)
