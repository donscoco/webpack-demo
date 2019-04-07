/*
* @Author: donscoco
* @Date:   2019-03-29 19:31:00
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-07 11:34:13
*/
console.log("im index js");
require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');
require('../common/footer/index.js');
require('../../util/slider/index.js');
var _mm = require('util/mm.js');
var templateBanner  = require('./banner.string');
var  navSide   = require('../common/nav-side/index.js');

// _mm.request({
//     url:'/product/list.do?keyword=1',
//     success:function(res){
//         console.log(res);
//     },
//     error:function(errMsg){
//         console.log(errMsg);
//     }
// })

// console.log(_mm.getUrlParam("test"))

// var html = '<div>{{data}}</div>';
// var data = {
//     data: 123
// }
// console.log(_mm.renderHtml(html, data));


