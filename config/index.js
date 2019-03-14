'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},    //代理,处理跨域的

    // Various Dev Server settings
    host: '10.12.200.247', // can be overwritten by process.env.HOST
    port: 8787, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser:false,   //自动打开浏览器
    errorOverlay: true,
    notifyOnErrors: true,
    poll:false,  // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    //将解析后的代码映射到源码上，具体到行数，方便读取报错
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),   //打包后项目的根路径
    assetsSubDirectory: 'static',                     //根目录下创建个子目录，static
    assetsPublicPath: './',    //在打包后生成的js,css引入的路径，前加上assetsPublicPath.这里是设置引入打包后js/css引入的公用路径

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
