/*
* @Author: donscoco
* @Date:   2019-04-13 20:06:21
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-14 15:29:51
*/
console.log("im login js");

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
    init: function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        // 登录按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        // 如果按下回车，也进行提交
        $('.user-content').keyup(function(e){
            // keyCode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    // 提交表单
    submit : function(){
        var _this = this;
        var formData = {
                email : $.trim($('#email').val())
            },
            // 表单验证结果
            validateResult = this.formValidate(formData);
        // 验证成功
        if(validateResult.status){
            _user.emailLogin(formData, function(res){

                formError.show("邮件已发送，请确认邮箱");
                _this.queryStatus();
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        // 验证失败
        else{
            // 错误提示
            formError.show(validateResult.msg);
        }

    },
    //监听是否登陆
    queryStatus:function(){
        var _this = this;
        //轮询
        this.emailLoginTimer = window.setInterval(function(){
            console.log("loop:");
            _user.checkLogin(function(res){
                window.location.href = './index.html';
            },function(){
                console.log("emailLogin fail");
            });
        },5e3);
    },
    // 表单字段的验证
    formValidate : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        if(!_mm.validate(formData.email, 'require')){
            result.msg = '邮箱不能为空';
            return result;
        }

        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }
};

$(function(){
    page.init();
});