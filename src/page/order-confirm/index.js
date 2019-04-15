/*
* @Author: donscoco
* @Date:   2019-04-03 00:54:17
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-15 14:57:41
*/
'use strict';
require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');
require('../common/footer/index.js');
var nav             = require('page/common/nav/index.js');
var _mm              = require('util/mm.js');
var addressModel              = require('./address-model.js');
var _order           = require('service/order-service.js');
var _address           = require('service/address-service.js');
var templateAddress  = require('./address-list.string');
var templateProduct  = require('./product-list.string');





var page = {
    data:{
        selectedAddressId: null
    },
    //初始化，初始化一般要做的就是请求后台信息，为html元素绑定时间
    init:function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad:function(){
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function(){
        var _this = this;
        //selection of address
        $(document).on("click",'.address-select',function(){
            $(this).addClass('active').siblings('.address-select').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
            console.log(_this.data.selectedAddressId);
        });
        //submit of order
        $(document).on("click",'.order-submit',function(){
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId:shippingId
                },function(res){
                    window.location.href = './payment.html?orderNo='+res.orderNo;
                },function(errMsg){
                    _mm.errorTips(errMsg)
                })
            }else{
                _mm.errorTips("请选择地址后提交")
            }
        });
        // 添加地址
        $(document).on('click','.address-add',function(){
            addressModel.show({
                isUpdate:false,
                onSuccess:function(){
                    _this.loadAddressList();
                }
            });
        });
        // 编辑地址
        $(document).on('click','.address-update',function(e){
            //阻止事件的冒泡
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId,function(res){
                addressModel.show({
                    isUpdate        : true,
                    data            : res,
                    onSuccess       : function(){
                        _this.loadAddressList();
                    }
                });
            },function(errMsg){
                _mm.errorTips(errMsg);
            }); 
        });
        // 删除地址
        $(document).on('click','.address-delete',function(e){
            //阻止事件冒泡
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if(window.confirm('确认要删除该地址吗')){
                _address.deleteAddress(shippingId,function(res){
                    _this.loadAddressList();
                },function(errMsg){
                    _mm.errorTips(errMsg);
                })
            }
        }); 
    },
    loadAddressList:function(){
        var _this = this;
        _address.getAddressList(function(res){
            _this.addressFilter(res);
            var addressListHtml = _mm.renderHtml(templateAddress,res);
            $('.address-con').html(addressListHtml);
        },function(errMsg){
            $('.address-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    },
    //处理地址列表选中状态
    addressFilter:function(res){
        console.log(res);
        if(this.data.selectedAddressId){
            var selectedAddressIdFlag = false;
            for(var i=0, length=res.list.length;i<length;i++){
                if(res.list[i].id === this.data.selectedAddressId){
                    res.list[i].isActive =true;
                    selectedAddressIdFlag =true;
                }
            };
            //如果以前选中的地址不在列表里，将其删除
            if(!selectedAddressIdFlag){
                this.data.selectedAddressId=null;
            }
        }
    },
    loadProductList:function(){
        var _this = this;
        //获取列表
        _order.getProductList(function(res){
            var productListHtml = _mm.renderHtml(templateProduct,res);
            $('.product-con').html(productListHtml);
        },function(errMsg){
            $('.product-con').html('<p class="err-tip">地址加载失败，请刷新后重试</p>');
        })
    }
};

$(function(){
    page.init();
})