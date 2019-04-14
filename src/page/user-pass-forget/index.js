/*
* @Author: donscoco
* @Date:   2019-04-14 10:47:35
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-14 10:55:23
*/
require('./index.css');
require('page/common/nav-simple/index.js');
require('../common/footer/index.js')
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// page 逻辑部分
var page = {
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#question-way').click(function(){
            window.location.href = './user-pass-reset-question.html';
        });
        $('#email-way').click(function(){
            window.location.href = './user-pass-reset-email.html';
        });
    }
};

$(function(){
    page.init();
});