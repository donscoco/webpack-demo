/*
* @Author: donscoco
* @Date:   2019-05-02 10:54:44
* @Last Modified by:   donscoco
* @Last Modified time: 2019-05-02 16:06:56
*/
require('./index.css');
require('page/common/nav-simple/index.js');
require('../common/footer/index.js')
var _wechat   = require('service/wechat-service.js');
var _mm     = require('util/mm.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page={
    data:{
        code:   _mm.getUrlParam('code'),
        state:  _mm.getUrlParam('state')
    },
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        this.loadQrInfo();
    },
    loadQrInfo:function(){
        var _this         = this;
        var $tipCon   = $('.page-wrap'); 
        var tipHtml   = '';
        // $paymentCon.html(_mm.renderHtml(templateIndex));
        $tipCon.html('<div class="loading"></div>');
        _wechat.loginCallback(_this.data,function(res){
            console.log(res);
            tipHtml   = _mm.renderHtml(templateIndex,res);
            $tipCon.html(tipHtml);
        },function(errMsg){
            $tipCon.html("<p class='err-tip'>"+errMsg+"</p>");
        })
    }
};
$(function(){
    page.init();
});
