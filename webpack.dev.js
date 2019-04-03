/*
* @Author: donscoco
* @Date:   2019-03-29 16:08:51
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-03 18:46:44
*/
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(common, {
    //输出形式，这个决定了打包后，html对js等静态文件的引用方式
    // output: {
    //     filename: 'js/[name].bundle.js',
    //     // path: './dist',
    //     path: path.resolve(__dirname, 'dist'),
    //     //后面输出的位置都会以     /dist为根节点
    //     publicPath: '/dist'
    // },
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
        hot:true,
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