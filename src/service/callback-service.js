/*
* @Author: donscoco
* @Date:   2019-04-13 14:41:46
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-13 20:02:19
*/

'use strict';

var _mm = require('util/mm.js');

var _callback = {
    emailLogin:function(data,resolve,reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/emailLoginCallBack.do'),
            data    : data,
            success : resolve,
            error   : reject
        });
    }
    
}

module.exports = _callback;