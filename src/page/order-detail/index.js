/*
* @Author: donscoco
* @Date:   2019-04-03 00:54:32
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-06 16:31:55
*/
'use strict';  
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('../common/footer/index.js');

var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var Pagination      = require('util/pagination/index.js');
var _user           = require('service/user-service.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data:{
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderDetail();
    }, 
    bindEvent:function(){
        var _this = this;
        $(document).on('click','.order-cancel',function(){
            _order.cancelOrder(_this.data.orderNo,function(res){
                _mm.successTips('订单取消成功');
                _this.loadOrderDetail();
            },function(errMsg){
                _mm.errorTips(errMsg);
            })
        })
    },
    loadOrderDetail:function(){
        $('.content').html(_mm.renderHtml(templateIndex));
        var _this = this;
        var orderDetailHtml = '';
        var $orderDetailCon = $('.content');
        this.data.orderNo = _mm.getUrlParam('orderNo');
        _order.getOrderDetail(_this.data.orderNo,function(res){
            _this.dataFilter(res);
            var orderDetailHtml = _mm.renderHtml(templateIndex,res);
            $orderDetailCon.html(orderDetailHtml);
        },function(errMsg){
            _mm.errorTips(errMsg);
        })
    },
    //数据的适配
    dataFilter:function(data){
        data.needPay      = data.status == 10;
        data.isCancelable = data.status == 10;

    },
};
$(function(){
    page.init();
});