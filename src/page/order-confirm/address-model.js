/*
* @Author: donscoco
* @Date:   2019-04-05 02:36:20
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-05 18:19:49
*/
'use strict';
var _mm                   = require('util/mm.js');
var _address              = require('service/address-service.js');
var _city                 = require('util/city/index.js');
var templateAddressModel  = require('./address-model.string');


var addressModel = {
    show:function(option){
        //把option放到对象上，使其他方法也可以用

        this.option      = option;
        this.option.data = option.data||{};
        this.$modelWrap  = $('.model-wrap');
        //渲染页面
        this.loadModel();
        //绑定事件
        this.bindEvent();
    },
    hide:function(){
        this.$modelWrap.empty();
    },
    loadModel:function(){
        var addressModelHtml=_mm.renderHtml(templateAddressModel,{
            isUpdate   :this.option.isUpdate,
            data       :this.option.data
        });
        this.$modelWrap.html(addressModelHtml);
        //
        this.loadProvince();
        //
        // this.loadCities();
    },
    bindEvent:function(){
        var _this = this;
        //省市二级联动
        this.$modelWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        //提交收货地址
        this.$modelWrap.find('.form-btn').click(function(){
            var  receiverInfo = _this.getReceiverInfo();
            var  isUpdate          = _this.option.isUpdate;
            if(!isUpdate && receiverInfo.status){
                _address.add(receiverInfo.data,function(res){
                    _mm.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' 
                    && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else if(isUpdate && receiverInfo.status){
                _address.update(receiverInfo.data,function(res){
                    _mm.successTips('地址更新成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' 
                    && _this.option.onSuccess(res);
                },function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }else{
                _mm.errorTips(receiverInfo.errMsg || "好像哪里不对了");
            }
        });
        //点击model内容区域不关闭弹窗
        //将冒泡事件停止下来
        this.$modelWrap.find(".model-container").click(function(e){
            e.stopPropagation();
        });
        //关闭弹窗，点击关闭或者点击空白区域 ps.在html模板加上.close 类
        this.$modelWrap.find(".close").click(function(){
            _this.hide();
        });

    },
    loadProvince:function(){
        var provinces = _city.getProvinces() || [];
        var $provinceSelect =this.$modelWrap.find('#receiver-province');
        $provinceSelect.html(this.getSelectOption(provinces));
        //判断是否update，且 this.option.data.receiverProvince 是否有值
        if(this.option.isUpdate && this.option.data.receiverProvince){
            $provinceSelect.val(this.option.data.receiverProvince);
        }
        this.loadCities(this.option.data.receiverProvince);
    },
    loadCities:function(provinceName){
        var cities = _city.getCities(provinceName)||[];
        var $citySelect = this.$modelWrap.find('#receiver-city');
        $citySelect.html(this.getSelectOption(cities));
        //判断是否update，且 this.option.data.receiverCity 有值
        if(this.option.isUpdate && this.option.data.receiverCity){
            $citySelect.val(this.option.data.receiverCity);
        }
    },
    getSelectOption:function(optionArray){
        //<option value=''>请选择</option>
        var html ="<option value=''>请选择</option>";
        for(var i=0, length=optionArray.length;i<length;i++){
            html += "<option value='"+optionArray[i]+"'>"+optionArray[i]+"</option>"
        }
        return html;
    },
    getReceiverInfo:function(){
        var receiverInfo = {};
        var   result      ={
                status:false
            };
        receiverInfo.receiverName     = $.trim(this.$modelWrap.find("#receiver-name").val());
        receiverInfo.receiverProvince = $.trim(this.$modelWrap.find("#receiver-province").val());
        receiverInfo.receiverCity     = $.trim(this.$modelWrap.find("#receiver-city").val());
        receiverInfo.receiverAddress  = $.trim(this.$modelWrap.find("#receiver-address").val());
        receiverInfo.receiverPhone    = $.trim(this.$modelWrap.find("#receiver-phone").val());
        receiverInfo.receiverZip      = $.trim(this.$modelWrap.find("#receiver-zip").val());
        if(this.option.isUpdate){
            receiverInfo.id    = $.trim(this.$modelWrap.find("#receiver-id").val());
        }

        if(!receiverInfo.receiverName){
            result.errMsg="请输入收件人姓名";
        }else if(!receiverInfo.receiverProvince){
            result.errMsg="请选择收件人所在省份";
        }else if(!receiverInfo.receiverCity){
            result.errMsg="请选择收件人所在城市";
        }else if(!receiverInfo.receiverAddress){
            result.errMsg="请输入收件人详细地址";
        }else if(!receiverInfo.receiverPhone){
            result.errMsg="请输入收件人手机号";
        }else{
            result.status=true;
            result.data=receiverInfo;
        }
        return result;
    }
    
};

module.exports=addressModel;