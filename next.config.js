  
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new SWPrecacheWebpackPlugin({
        cacheId: 'service-worker-nextjs',
        verbose: true,
        staticFileGlobsIgnorePatterns: [/\.next\//],
        runtimeCaching: [
          {
            handler: 'networkFirst',
            urlPattern: /^https?.*/,
          },
        ],
      }),
    );

    return config;
  },
};
