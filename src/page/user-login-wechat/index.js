/*
* @Author: donscoco
* @Date:   2019-05-02 10:54:29
* @Last Modified by:   donscoco
* @Last Modified time: 2019-05-02 15:29:40
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
        flag:null
    },
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        this.loadQrInfo();
    },
    loadQrInfo:function(){
        var _this         = this;
        var $qrCon   = $('.page-wrap'); 
        var qrHtml   = '';
        // $paymentCon.html(_mm.renderHtml(templateIndex));
        $qrCon.html('<div class="loading"></div>');
        _wechat.wechatLogin(function(res){
            console.log(res);
            qrHtml   = _mm.renderHtml(templateIndex,res);
            $qrCon.html(qrHtml);
            _this.data.flag=res.wechat_login_flag;
            _this.queryStatus();
        },function(errMsg){
            $qrCon.html("<p class='err-tip'>"+errMsg+"</p>");
        })
    },
    //监听状态
    queryStatus:function(){
        var _this = this;
        //轮询
        this.queryTimer = window.setInterval(function(){
            _wechat.isLogin(_this.data.flag,function(res){
                if(res == true){
                    window.location.href = './index.html';
                }
            },function(res){
                console.log(res);
                console.log("loop query status "+_this.data.flag);
            });
        },5e3);
    }
};
$(function(){
    page.init();
});

