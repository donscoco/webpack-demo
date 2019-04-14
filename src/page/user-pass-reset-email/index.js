/*
* @Author: donscoco
* @Date:   2019-04-14 14:10:24
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-14 15:19:04
*/
require('./index.css');
require('page/common/nav-simple/index.js');
require('../common/footer/index.js')
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {
    data : {
        email    : ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    },
    bindEvent : function(){
        var _this = this;
        // 输入用户名后下一步按钮的点击
        $('#submit-send').click(function(){
            var _email = $.trim($('#email').val());
            console.log("getHtml #email:"+email);
            // 用户名存在
            if(_email){
                _user.getEmailToken({
                    email:_email
                }, function(res){
                    console.log("send pls check");
                    formError.show('已发送邮件，请确认邮箱');
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            // 用户名不存在
            else{
                formError.show('请输入');
            }
        });
        
    }
    
};
$(function(){
    page.init();
});
