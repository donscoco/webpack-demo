/*
* @Author: donscoco
* @Date:   2019-04-13 13:56:37
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-13 20:01:16
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('../common/footer/index.js');

var _user   = require('service/user-service.js');
var _callback     = require('service/callback-service.js');
var _mm     = require('util/mm.js');

// page 逻辑部分
var page = {
    init: function(){
        this.onload();
    },
    onload:function(){
        var _this = this;
        //获取参数
        var email = _mm.getUrlParam('email');
        var token = _mm.getUrlParam('token');
        var data  = {
            'email' : email,
            'token' : token
        };
        console.log(data);
        //调用回调函数
        _callback.emailLogin(data,function(res){
            //成功跳转
            _this.timerRefer();
        },function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //定时跳转函数
    timerRefer : function(){
        window.location.href = './index.html';
    }
};

$(function(){
    page.init();
});