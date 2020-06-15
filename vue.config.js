const path = require('path')
module.exports = {
  // BUILD DEV
  // publicPath:'/VUE/supermall/dist/',
  // BUILD PRO
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'views': '@/views'
      },
    },
    devServer:{
      port:8081
    }
  },

  publicPath: './'
}
