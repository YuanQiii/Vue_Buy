const { defineConfig } = require('@vue/cli-service')
const CompressionWebpackPlugin = require('compression-webpack-plugin');

let externals = {
  'vue': 'Vue',
  'vant': 'Vant',
  'js-cookie': 'Cookies',
  'dayjs': 'dayjs',
  'twix': 'twix',
  'vue-clipboard2': 'VueClipboard'
}
let cdn = {
  css: [
    'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/normalize/8.0.1/normalize.css',
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/vant/2.12.44/index.min.css',
  ],
  js: [
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.min.js',
    'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/vant/2.12.44/vant.min.js',
    'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/js-cookie/3.0.1/js.cookie.min.js',
    'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/dayjs/1.10.8/dayjs.min.js',
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/twix.js/1.3.0/twix.min.js',
    'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue-clipboard2/0.3.3/vue-clipboard.min.js'
  ]
}
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  chainWebpack(config) {

    if(process.env.NODE_ENV === 'production'){

      config.set('externals', externals)
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
  
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
  
      config.optimization.splitChunks({
        // 拆包配置
        chunks: 'all', //三选一："initial" 初始化，"all"(默认就是all)，"async"（动态加载）
        minSize: 30000, // 形成一个新代码块最小的体积,只有 >= minSize 的bundle会被拆分出来 30000
        maxSize: 0, //拆分之前最大的数值，默认为0，即不做限制
        minChunks: 1, //引入次数，如果为2 那么一个资源最少被引用两次才可以被拆分出来
        maxAsyncRequests: 5, // 按需加载的最大并行请求数
        maxInitialRequests: 3, // 一个入口最大并行请求数
        automaticNameDelimiter: '~', // 文件名的连接符
        cacheGroups: {
          // node_modules模块包
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-vendors',
            chunks: 'all',
            priority: -10,
          },
          // 共享模块
          common: {
            name: 'chunk-common',
            minChunks: 2,
            maxSize: 1024, //拆分之前最大的数值，默认为0，即不做限制
            priority: -20,
            reuseExistingChunk: true
          }
        }
      })
  
      config.plugin('CompressionWebpackPlugin').use(new CompressionWebpackPlugin({
        test: /\.(js)$|\.(css)$/, // 匹配文件名
        threshold: 10240, // 对超过10k的数据压缩
        minRatio: 0.8,
        deleteOriginalAssets: true // 删除源文件
      }))
    }
  },
})
