/*
* @Author: donscoco
* @Date:   2019-04-05 02:36:20
* @Last Modified by:   donscoco
* @Last Modified time: 2019-04-15 19:20:38
*/
'use strict';
var _mm                   = require('util/mm.js');
var _address              = require('service/address-service.js');
var _city                 = require('util/city/index.js');
var templateAddressModel  = require('./address-model.string');






var addressModel = {
    option:{

    },
    map:{

    },
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

        //地图
        this.loadBaiduMap();
    },
    bindEvent:function(){
        var _this = this;
        //省市二级联动
        this.$modelWrap.find('#receiver-province').change(function(){
            var selectedProvince = $(this).val();
            _this.loadCities(selectedProvince);
        });
        //城市一改变就触发百度地图查找对应位置
        this.$modelWrap.find('#receiver-city').change(function(){
            var selectedProvince = $(this).val();
            var selectedCity = $(this).val();
            var keyWord = selectedProvince+selectedCity;
            _this.baiduMapSearch(keyWord);
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
    },
    loadBaiduMap:function(){
        console.log($.isEmptyObject(this.map));
        //初始化地图逻辑
        // 创建地图实例  
        this.map = new BMap.Map("allmap1");
        // 创建点坐标 
        var point = new BMap.Point(116.404, 39.915); 
        // 初始化地图，设置中心点坐标和地图级别  
        this.map.centerAndZoom(point, 15);

        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        this.map.addControl(new BMap.NavigationControl());               // 添加平移缩放控件

        this.map.addControl(new BMap.ScaleControl());                    // 添加比例尺控件

        this.map.addControl(new BMap.OverviewMapControl());              //添加缩略地图控件

        this.map.enableScrollWheelZoom();                            //启用滚轮放大缩小

        //如果非是更新就自动获取当前地址
        if(!this.option.isUpdate){
            this.baiduMapLocation();
        }else{
            var keyWord = $('#receiver-province').val()+$('#receiver-city').val();
            this.baiduMapSearch(keyWord);
        }
        this.bindBaiduMapEvent();
    },
    //关键字检索
    baiduMapSearch:function(keyWord){
        var map = this.map;
        var local = new BMap.LocalSearch(map, {
            renderOptions:{map: map}
        });
        local.search(keyWord);
    },
    //定位当前位置
    baiduMapLocation:function(){
        var _this = this;
        var _map = this.map;
        var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);
                    _map.addOverlay(mk);
                    _map.panTo(r.point);
                    //
                    console.log(r);
                    var addComp = r.address;
                    $('#receiver-province').val(_this.adaptProvinces(addComp.province));
                    _this.loadCities(_this.adaptProvinces(addComp.province));
                    $('#receiver-city').val(_this.adaptCity(addComp.city));
                    //回填详细选项框
                    var addressDetail = addComp.province+addComp.city;
                    if(addComp.district){
                        addressDetail=addressDetail+addComp.district;
                    }
                    if(addComp.street){
                        addressDetail=addressDetail+addComp.street;
                    }
                    if(addComp.streetNumber){
                        addressDetail=addressDetail+addComp.streetNumber;
                    }
                    $('#receiver-address').val(addressDetail);
                }
                else {
                    alert('failed'+this.getStatus());
                }        
            },{enableHighAccuracy: true})
    },
    bindBaiduMapEvent:function(){
        var _this = this;
        var _map = this.map;
        //鼠标点击地图获取地址
        var geoc = new BMap.Geocoder();    
            _map.addEventListener("click", function(e){        
                var pt = e.point;
                geoc.getLocation(pt, function(rs){
                var addComp = rs.addressComponents;
                // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                // alert(_this.option.isUpdate);
                console.log(rs);
                //清除原来的覆盖物，添加覆盖物
                _map.clearOverlays(); 
                var mk = new BMap.Marker(pt);
                //添加心的覆盖物
                _map.addOverlay(mk);
                //镜头移向这个位置
                _map.panTo(pt);
                //回填二级联动
                $('#receiver-province').val(_this.adaptProvinces(addComp.province));
                _this.loadCities(_this.adaptProvinces(addComp.province));
                $('#receiver-city').val(_this.adaptCity(addComp.city));
                //回填详细选项框
                $('#receiver-address').val(rs.address);
                });        
            });

    },
    //因为项目中使用的二级联动数据没有  省  市   的字，而百度地图中会返回如广东省，广州市，所以使用
    //这样的一个 ‘适配器’ 来匹配百度地图返回的数据
    adaptProvinces:function(str){
        return str.substring(0, str.length - 1);
    },
    adaptCity:function(str){
        return str.substring(0, str.length - 1);
    }

    
};

module.exports=addressModel;