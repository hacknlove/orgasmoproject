/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withOrgasmo = require("@orgasmo/orgasmo/withOrgasmo")();

module.exports = withOrgasmo(nextConfig);
