/*
* @Author: Rosen
* @Date:   2017-05-19 21:52:46
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-06 19:16:33
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
require('../common/footer/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    if(type === 'payment'){
        var orderNo = _mm.getUrlParam('orderNo')
        $element.find('.order-no').attr('href',$element.find('.order-no').attr('href')+orderNo);
    }
    // 显示对应的提示元素
    $element.show();
})
