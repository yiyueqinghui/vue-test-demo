'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

//自主设置域名与端口的方法，在npm run dev之前，在其npm中命令形式设置环境如下
//export HOST=vue.my
//export PORT=9090
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    //css 模块加载解析
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true
    })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
    //watchOptions.poll通过传递 true 开启 poll，或者指定毫秒为单位进行轮询,监听文件修改，当文件改变时，重新构建
      poll: config.dev.poll,
    }
  },
  plugins: [
    //DefinePlugin 允许创建一个在编译时可以配置的全局常量
    //参考链接： https://webpack.docschina.org/plugins/define-plugin/#src/components/Sidebar/Sidebar.jsx
    //这里使得config/dev.env.js内的数据为全局常量，任何地方都可以访问
    new webpack.DefinePlugin({
      //配置环境为生产环境
      'process.env': require('../config/dev.env')
    }),
    //模块热替换(HMR - Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面
    //参考链接： https://webpack.docschina.org/concepts/hot-module-replacement
    new webpack.HotModuleReplacementPlugin(),

    // HMR shows correct file names in console on update.
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // every webpack,This will generate a file index.html,and import relative js、css.
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',   //生成的html,引用vue自带的模板index.html
      inject: true
    }),
    // copy custom static assets
    // 复制指定目录到指定根目录
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

//启动服务
module.exports = new Promise((resolve, reject) => {
  //确定端口
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
