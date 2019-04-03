/*
* @Author: donscoco
* @Date:   2019-03-29 16:09:55
* @Last Modified by:   donscoco
* @Last Modified time: 2019-03-29 16:10:08
*/
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin()
  ]
});