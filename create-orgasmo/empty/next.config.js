/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const withOrgasmo = require("@orgasmo/orgasmo/withOrgasmo")();

/**
 * Wrap yout nextConfig with this withOrgasmo.
 *
 * If you have many plugins, follow the order indications of the other plugins, for this one should work in any order.
 *
 * It is not changing your webpack configuration, or any other nextjs configuration.
 *
 * It only starts the orgasmo build tools that agregates your /driver.js, /style.scss and /components.js
 *
 * More information on how to configure the orgasmo's build tools in the [orgasmo's buildTools' source]{@link [/orgasmo/src/buildTools} and in the comments of {@link driver.js}, {@link Components.js} and {@link style.scss}
 */
module.exports = withOrgasmo(
  nextConfig /*, { driver: true, components: true, scss: true } */
);
