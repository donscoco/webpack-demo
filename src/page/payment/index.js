/*
* @Author: donscoco
* @Date:   2019-04-03 00:54:46
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-06 19:09:29
*/
'use strict';  
require('./index.css');
require('../common/nav/index.js');
require('page/common/header/index.js');
require('../common/footer/index.js');

var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var _payment        = require('service/payment-service.js');
var templateIndex   = require('./index.string');
// page 逻辑部分
var page={
    data:{
        orderNo:_mm.getUrlParam('orderNo')
    },
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        this.loadPaymentInfo();
    },
    loadPaymentInfo:function(){
        var _this         = this;
        var $paymentCon   = $('.page-wrap'); 
        var paymentHtml   = '';
        // $paymentCon.html(_mm.renderHtml(templateIndex));
        $paymentCon.html('<div class="loading"></div>');
        _payment.pay(_this.data.orderNo,function(res){
            paymentHtml   = _mm.renderHtml(templateIndex,res);
            $paymentCon.html(paymentHtml);
            _this.queryStatus();
        },function(errMsg){
            $paymentCon.html("<p class='err-tip'>"+errMsg+"</p>");
        })
    },
    //监听状态
    queryStatus:function(){
        var _this = this;
        //轮询
        this.paymentTimer = window.setInterval(function(){
            _payment.queryOrderPayStatus(_this.data.orderNo,function(res){
                if(res == true){
                    window.location.href = './result.html?type=payment&orderNo='+_this.data.orderNo;

                }
            },function(){

            });
        },5e3);
    }
};
$(function(){
    page.init();
});