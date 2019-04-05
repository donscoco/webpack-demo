/*
* @Author: donscoco
* @Date:   2019-04-03 00:54:40
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-06 01:03:45
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
        listParam:{
            pageNum:1,
            pageSize:10
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderList();
    },
    loadOrderList:function(){
        console.log('loadOrderList');
        var _this = this; 
        var orderListHtml='';
        var $orderListCon=$('.order-list-con');
        $orderListCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam,function(res){
            _this.dataFilter(res);
            orderListHtml = _mm.renderHtml(templateIndex,res);
            $orderListCon.html(orderListHtml);
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        },function(errMsg){
            $orderListCon.html('<p class="err-tip">加载订单失败，请刷新重试</p>');
        })
        console.log('loadOrderListEnd');
    },
    dataFilter:function(data){
        data.isEmpty = !data.list.length;

    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    }
    
};
$(function(){
    page.init();
});