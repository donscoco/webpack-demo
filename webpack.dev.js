/*
* @Author: donscoco
* @Date:   2019-03-29 16:08:51
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-03 14:34:17
*/
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
    //报错定位开发源代码的具体位置
  devtool: 'inline-source-map',
  plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    //告诉开发服务器(dev server)，在哪里查找文件：
    devServer: {
        contentBase: './dist/view',
        //代理转发
        // proxy: {
        //     '**/*.do': {
        //         target: 'http://www.happymmall.com',
        //         changeOrigin: true,
        //         host: "happymmall.com",
        //         //https
        //         secure: false
        //     }
        // },
        port:8080

    }
});