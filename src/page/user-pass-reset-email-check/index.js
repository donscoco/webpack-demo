/*
* @Author: donscoco
* @Date:   2019-04-14 14:14:53
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-14 16:07:49
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
    validate:{
        result:false
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
    },
    bindEvent : function(){
        var _this = this;
        $('#submit-send').click(function(){
            _this.submit();
        });
        $('#email-check-confirm').blur(function(){
            _this.passwordValidate();
        });
    },
    submit:function(){
        var _password = $.trim($('#email-check').val());
        var _token    = _mm.getUrlParam('token');
        var _email    = _mm.getUrlParam('email');
        this.passwordValidate();
        if(this.validate.result){
            _user.checkEmailToken({
                email:_email,
                passwordNew:_password,
                token:_token
            }, function(res){
                formError.show("修改成功，可前往登陆");
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 用户名不存在
        else{
            formError.show('两次输入不一样');
        }
    },
    passwordValidate:function(){

        var _password = $.trim($('#email-check').val());
        var _passwordConfirm = $.trim($('#email-check-confirm').val());
        // 验证两次输入的密码是否一致
        if(_password !== _passwordConfirm){
            this.validate.result = false;

        }else{
            this.validate.result = true;
        }
    }
    
};
$(function(){
    page.init();
});