

import * as tool from '../tool/index.js';

import { mixinMSEvent,mixinMSScroll,mixinMSSwipe} from '../scroll/index.js';

import defaultConfig from './defaultConfig.js';





var MobileScroll = function(el,config) {
	//检验
	if(tool.isUndefined(el) || tool.isNull(el)){
		console.error('mobileScroll: scroll el is undefined')
		return false;
	}
	if(tool.isString(el) && (!document || !document.querySelector)){
		console.error('mobileScroll: document.querySelector is undefined')
		return false;
	}
	//获取元素
	this._wrapEl = tool.isString(el)?document.querySelector(el):null;
	if(!this._wrapEl){
		console.error('mobileScroll: warp dom is undefined')
		return false;
	}
	//获取配置
	var selfConfig = config?tool.extend(defaultConfig ,config):defaultConfig;
	for(var key in selfConfig){
		this[key] = selfConfig[key];
	}
	//初始化运行
	this._init();
}





//初始化
MobileScroll.prototype._init = function(){
	//初始化滑动参数
	this._initScrollParams();
	//绑定相关滑动事件
	this._initEvent();
}





mixinMSEvent(MobileScroll)
mixinMSScroll(MobileScroll)
mixinMSSwipe(MobileScroll)







export default  MobileScroll;




