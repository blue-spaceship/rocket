const path = require('path')
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: true
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/styles')],
  },
  async rewrites(){
    return [
      { source: '/login', destination: '/auth/login' },
      { source: '/welcome', destination: '/auth/welcome' }
    ]
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
        // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
        config.resolve.fallback = {
            fs: false
        }
    }
    return config;
  }
})