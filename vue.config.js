const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/static/',
  devServer: {
    // 代理服务器，方便更改后端服务器地址，开发时生效，打包后失效
    proxy: {
      '/api': {
        target: 'http://47.105.178.110:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})

