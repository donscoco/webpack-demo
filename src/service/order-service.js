/*
* @Author: donscoco
* @Date:   2019-04-04 14:46:33
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-06 00:58:42
*/
'use strict';

var _mm = require('util/mm.js');

var _order = {
    // 获取订单列表
    getProductList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/get_order_cart_product.do'),
            success : resolve,
            error   : reject
        });
    },
    createOrder : function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/create.do'),
            data    : shippingId,
            success : resolve,
            error   : reject
        });
    },
    getOrderList:function(listParam,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/list.do'),
            data    :listParam,
            success : resolve,
            error   : reject
        })
    },
    getOrderDetail:function(orderNo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/order/detail.do'),
            data    : shippingId,
            success : resolve,
            error   : reject
        });
    },
}
module.exports = _order;