/*
* @Author: donscoco
* @Date:   2019-05-02 14:32:55
* @Last Modified by:   donscoco
* @Last Modified time: 2019-05-02 15:21:16
*/

var _mm = require('util/mm.js');

var _wechat = {

    //微信登陆
    wechatLogin : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/wechat/wechat_login.do'),
            method  : 'GET',
            success : resolve,
            error   : reject
        });
        
    },
    //微信登陆回调
    loginCallback : function(data,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/wechat/wechat_login_callback.do'),
            data    : data,
            method  : 'GET',
            success : resolve,
            error   : reject
        });
        
    },
    //登陆状态轮询
    isLogin : function(data,resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/wechat/is_login.do'),
            data    : {
                wechat_login_flag:data
            },
            method  : 'GET',
            success : resolve,
            error   : reject
        });
        
    }
}


module.exports = _wechat;

