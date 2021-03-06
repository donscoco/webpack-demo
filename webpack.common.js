/*
* @Author: donscoco
* @Date:   2019-03-29 16:07:43
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-24 11:29:37
*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');


    //测试环境
// var STATIC_URL="//static.donscoco.online/webpack-demo/dist/";

    //正式环境
var STATIC_URL="//static.donscoco.online/mall/dist/";


// 获取html-webpack-plugin参数的方法 
//chunks 将common 对应的js 在打包的时候引入 不用在每个页面去require
var getHtmlConfig = function(name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        favicon     : './favicon.ico',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    };
};


module.exports = {
  entry: {
    'index'             : ['./src/page/index/index.js'],
    'common'            : ['./src/page/common/index.js'],
    'list'              : ['./src/page/list/index.js'],
    'detail'            : ['./src/page/detail/index.js'],
    'cart'              : ['./src/page/cart/index.js'],
    'user-login'        : ['./src/page/user-login/index.js'],
    'user-login-email'  : ['./src/page/user-login-email/index.js'],
    'user-register'     : ['./src/page/user-register/index.js'],
    'user-pass-forget'   : ['./src/page/user-pass-forget/index.js'],
    'user-pass-reset-question'   : ['./src/page/user-pass-reset-question/index.js'],
    'user-pass-reset-email'   : ['./src/page/user-pass-reset-email/index.js'],
    'user-pass-reset-email-check'   : ['./src/page/user-pass-reset-email-check/index.js'],
    'user-center'       : ['./src/page/user-center/index.js'],
    'user-center-update': ['./src/page/user-center-update/index.js'],
    'user-pass-update'  : ['./src/page/user-pass-update/index.js'],
    'order-confirm'     : ['./src/page/order-confirm/index.js'],
    'order-detail'      : ['./src/page/order-detail/index.js'],
    'order-list'        : ['./src/page/order-list/index.js'],
    'payment'           : ['./src/page/payment/index.js'],
    'result'            : ['./src/page/result/index.js'],
    'login-callback'        : ['./src/page/login-callback/index.js'],
    'test'              : ['./src/page/test/index.js'],
    'about'             : ['./src/page/about/index.js']
  },
  //输出形式，这个决定了打包后，html对js等静态文件的引用方式
  output: {
      filename: 'js/[name].bundle.js',
      // path: './dist',
      path: path.resolve(__dirname, 'dist'),
      //后面输出的位置都会以     static.donscoco.online为域名去请求
      // publicPath: '//static.donscoco.online/webpack-demo/dist/'
      publicPath: STATIC_URL
    },
  externals : {
        //前端html中引用了对应的script，这里引用下可以在自己的page中js使用
        '$'      : 'window.jQuery',
        'jquery' : 'window.jQuery',
        'BMap'   : 'BMap'
  },
  //各种加载器 css style file
  module: {
        rules: [
        // {
        //     test: /\.css$/,
        //     use: [
        //         'style-loader',
        //         'css-loader'
        //     ]
        // },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
        },
        {
            test: /\.string$/,
            use: {
              loader: 'html-loader',
              options: {
                attrs: [':data-src']
              }
            }
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader'
            ]
        },
        {
            test: /\.(csv|tsv)$/,
            use: [
               'csv-loader'
            ]
        },
        {
            test: /\.xml$/,
            use: [
               'xml-loader'
            ]
        },
        {
            test: /\.(eot|woff2?|ttf|svg)$/,
            use: [
                {
                    loader: "url-loader",
                    options: {
                        name: "[name]-[hash:5].min.[ext]",
                        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                        publicPath: "font/",
                        outputPath: "font/"
                    }
                    
                }
            ]
        }
    ]
   },
   //配置别名，这样require 函数不用通过相对路径去找
   resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        }
    },
   //各种插件
  plugins: [
    // 独立通用模块到js/base.js
    // new webpack.optimize.CommonsChunkPlugin({
    //     name : 'common',
    //       filename : 'js/base.js'
    // }),
   //  optimization: {
   // //抽取公共的dm
   //     splitChunks: {
   //         cacheGroups: {
   //             commons: {
   //                name: "commons",
   //                chunks: "initial",
   //                 minChunks: 2
   //             }
   //         }
   //     }
   // },
   // 把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    //使用jquery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    // html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
    new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login-email', '邮箱登陆')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-forget', '找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset-question', '问题找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset-email', '邮件找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset-email-check', '邮件找回密码确认')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
    new HtmlWebpackPlugin(getHtmlConfig('order-detail', '订单详情')),
    new HtmlWebpackPlugin(getHtmlConfig('order-list', '订单列表')),
    new HtmlWebpackPlugin(getHtmlConfig('payment', '订单支付')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('login-callback', '登陆回调')),
    new HtmlWebpackPlugin(getHtmlConfig('test', '测试页面')),
    new HtmlWebpackPlugin(getHtmlConfig('about', '关于我们'))
  ]
};