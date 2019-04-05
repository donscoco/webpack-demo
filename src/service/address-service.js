/*
* @Author: donscoco
* @Date:   2019-04-04 18:43:13
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-05 18:28:33
*/
'use strict';

var _mm = require('util/mm.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
               pageSize:50 
            },
            success : resolve,
            error   : reject
        });
    },

    add : function(addressInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    update:function(addressInfo,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    deleteAddress:function(shippingId,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId:shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    getAddress:function(shippingId,resolve,reject){
         _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId  : shippingId
            },
            success : resolve,
            error   : reject
        });
    }

}
module.exports = _address;