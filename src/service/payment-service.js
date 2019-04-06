/*
* @Author: donscoco
* @Date:   2019-04-06 17:38:18
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-06 18:16:39
*/
'use strict';

var _mm = require('util/mm.js');

var _payment = {
    // 获取订单列表
    pay:function(orderNo,resolve, reject){
         _mm.request({
            url     : _mm.getServerUrl('/order/pay.do'),
            data    : {
                orderNo:orderNo
            },
            success : resolve,
            error   : reject
        });
    },
    queryOrderPayStatus:function(orderNo,resolve, reject){
         _mm.request({
            url     : _mm.getServerUrl('/order/query_order_pay_status.do'),
            data    : {
                orderNo:orderNo
            },
            success : resolve,
            error   : reject
        });
    }

}
module.exports = _payment;