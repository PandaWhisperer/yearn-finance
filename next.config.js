module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty'
      }
    }

    // load dotenv config in development
    if (dev) {
      const Dotenv = require('dotenv-webpack');
      config.plugins.push(new Dotenv())
    }

    return config
  }
}
