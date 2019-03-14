'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

const webpack = require('webpack')


// 对于以/开始的路径片段，
// path.join只是简单的将该路径片段进行拼接，
// path.resolve将以/开始的路径片段作为根目录，在此之前的路径将会被丢弃，就像是在node中使用cd命令(cd /)一样。
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}



module.exports = {
  //context 基础目录,用于从配置中解析入口起点(entry)和 loader
  context: path.resolve(__dirname, '../'),
  //入口文件
  entry: {
    app: './src/main.js'
  },
  //打包输出的文件,引用config/index/build中的配置
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  //配置模块如何解析
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    //配置一个别名,确保import或require引入时更方便
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'common':resolve('static/js/common.js'),        //自定义的插件
      'jquery':resolve('static/js/jquery-1.11.3.min')  //插件本身export
    }
  },
  //插件,旨在解决loader无法解决的事
  plugins:[
    //这样的话，全局皆可引用,注意，开头必须引入webpack,即const webpack = require('webpack')
    //ProvidePlugin 自动加载模块，而不必到处 import 或 require
    new webpack.ProvidePlugin({
      $:'jquery'
    })
  ],
  //模块解析
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',    //loader 和 use 等同
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test:/\.less$/,
        loader:'style-loader!css-loader!less-loader'
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
