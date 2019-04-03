const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/index.js'
    },
    //开发使用，可以找到错误的具体位置
    devtool: 'inline-source-map',
    //告诉开发服务器(dev server)，在哪里查找文件：
    devServer: {
        contentBase: './dist',
        hot: true
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
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
        }
    ]
   }
};