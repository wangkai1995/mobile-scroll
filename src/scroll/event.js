


import * as tool from '../tool/index.js'


var MSEvent = {};




//处理事件
MSEvent._handleEvent = function(e){
	 switch (e.type) {
        case 'touchstart':
            this._swipeStart(e);
             break;
        case 'touchmove':
            this._swipeMove(e);
            break;
        case 'touchend':
        case 'touchcancel':
            this._swipeEnd(e);
            break;
        case 'transitionend':
        case 'webkitTransitionEnd':
        case 'oTransitionEnd':
        case 'MSTransitionEnd':
        	this._transitionEnd(e);
        	break;
    }
}




//添加dom事件
MSEvent._addDomEvent = function(target,event){
	var self = this;
	target.addEventListener(event,function(e){
		self._handleEvent(e)
	})
}




/*
	初始化滑动事件处理
 */
MSEvent._initEvent = function(){
	//touch
	this._addDomEvent(this._wrapEl,'touchstart')
	this._addDomEvent(this._wrapEl,'touchmove')
	this._addDomEvent(this._wrapEl,'touchend')
	this._addDomEvent(this._wrapEl,'touchcancel')
	//transition
	this._addDomEvent(this._wrapEl,'transitionend')
	this._addDomEvent(this._wrapEl,'webkitTransitionEnd')
	this._addDomEvent(this._wrapEl,'oTransitionEnd')
	this._addDomEvent(this._wrapEl,'MSTransitionEnd')
}
















export default function mixinMSEvent(classObj){
	for(var key in MSEvent){
		classObj.prototype[key] = MSEvent[key];
	}
}







