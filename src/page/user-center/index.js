/*
* @Author: Rosen
* @Date:   2017-05-23 19:33:33
* @Last Modified by:   donscoco
* @Last Modified time: 2019-03-31 20:49:44
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('../common/footer/index.js');

var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

console.log(templateIndex);
// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        $('.panel-body').html(templateIndex);
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});