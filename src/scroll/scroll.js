

import * as domTool from '../tool/dom.js';
import * as tool from '../tool/index.js'

import ease from './ease.js';



var MSScroll = {};



/*
	初始化获取滑动参数
 */
MSScroll._initScrollParams = function(){
	//获取包裹元素尺寸
	var { top,left,width,height } = domTool.getDomOffset(this._wrapEl)
	this._warpHeight = height;
	this._warpWidth = width;
	this._warpTop = top;
	this._warpLeft = left;


	//获取滚动元素
	this._scrollEl = this._wrapEl.children[0];
	var { top,left,width,height } = domTool.getDomOffset(this._scrollEl)
	this._scrollHeight = height;
	this._scrollWidth = width;
	this._scrollTop = top;
	this._scrollLeft = left;


	//修正相对位置
	this.replateY = this._warpTop - this._scrollTop
	this.replatex = this._warpLeft - this._scrollLeft


	//获取最小滚动
	this.minScrollY = this._warpHeight - this._scrollHeight;
	this.minScrollX = this._warpWidth - this._scrollWidth
	//最大滚动距离
	this.maxScrollY  = this.replateY;
	this.maxScrollX = this.replatex;
}





//滑动开始
MSScroll._swipeStart = function(e){
	var touch = e.touches[0];
	if(!touch || this.isMove){
		return false;
	}
	this.isMove = true;
	//获取滑动开始位置和时间
	this.startY = this.y;
	this.startX = this.x;
	//开始时间
	this.startTime = new Date().getTime();
	//手指页面位置
	this.moveY = touch.pageY
	this.moveX = touch.pageX
}





//滑动中
MSScroll._swipeMove = function(e){
	var touch = e.touches[0];
	if(!touch || !this.isMove){
		return false;
	}

	var prevY = this.moveY
	var prevX = this.moveX

	//获取当前位置
	this.moveY = touch.pageY
	this.moveX = touch.pageX
	this.time = new Date().getTime();


	//滑动时间和距离要超过动量参数才开始滑动
	if((this.time - this.endTime)>this.momentumTime && 
			Math.abs(this.moveY - this.startY)<this.momentumDistance && 
				Math.abs(this.moveX - this.startX)<this.momentumDistance
	){
		return false
	}

	//计算滑动
	var newX = this.x + (this.moveX - prevX);
	var newY = this.y + (this.moveY - prevY);

	//竖滑动
	if(this.mode === 'v'){
		newX = 0;
		//判断是否超出,并进行阻力修正
		if(newY < this.minScrollY || newY> this.maxScrollY){
			newY = newY- (this.moveY - prevY)
			newY  = newY + (this.moveY - prevY)/3;
		}
	}else{
		//横滑动
		newY = 0;
		//判断是否超出,并进行阻力修正
		if(newX < this.minScrollX || newX> this.maxScrollX){
			newX = newX- (this.moveX - prevX)
			newX  = newX + (this.moveX - prevX)/3;
		}
	}
	this.x = newX;
	this.y = newY;
	//开始滑动
	this._translate(this.x,this.y,0,ease.swipe)
	//修正时间和位置
	if(Math.abs(this.time - this.startTime) >this.momentumTime ){
		this.startTime = this.time;
		this.startY = this.y;
		this.startX = this.x;
	}


	var scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft;
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    var pX = this.moveX - scrollLeft;
    var pY = this.moveY - scrollTop;

    //判断是否滑动超出wrap
    if (pX > document.documentElement.clientWidth - this.momentumDistance ||
    		pX < this.momentumDistance ||
    	 	 	pY < this.momentumDistance ||
    	 	 	 	pY > document.documentElement.clientHeight - this.momentumDistance
    ) {
        this._swipeEnd(e);
    }
}






//滑动结束
MSScroll._swipeEnd = function(e){
	if(!this.isMove){
		return false;
	}

	this.isMove = false;
	this.endTime = new Date().getTime();

	//是否超出复位
	if(this.y < this.minScrollY || this.y > this.maxScrollY){
		this.$reset();
		return false;
	}
	//判断是否触发动量计算
	if(Math.abs(this.endTime - this.startTime) < this.momentumTime && 
			(Math.abs(this.moveY - this.startY)>this.momentumDistance || Math.abs(this.moveX - this.startX)>this.momentumDistance)
	){	
		var time = this.endTime - this.startTime;
		var momentumY = this.momentum(this.y,this.startY,time,this.maxScrollY,this.minScrollY,this._warpHeight);
		var momentumX = this.momentum(this.x,this.startX,time,this.maxScrollX,this.minScrollX,this._warpWidth);
		this.x = 0;
		this.y = momentumY;
		this._translate(this.x,this.y,this.momentumSwipeTime,ease.momentum)
		return false
	}
	//竖滑动
	if(this.mode === 'v'){
		this.x = 0;
	}else{
		//横滑动
		this.y = 0;
	}
	//开始滑动
	this._translate(this.x,this.y,0,ease.swipe)
}






//滑动动画结束
MSScroll._transitionEnd = function(e){
	//是否超出复位
	if(this.y < this.minScrollY || this.y > this.maxScrollY){
		this.$reset();
		return false;
	}
}




//复位
MSScroll.$reset = function(){
	//竖滑动
	if(this.mode === 'v'){
		this.x = 0;
		//进行修正
		if(this.y < this.minScrollY){
			this.y  =  this.minScrollY
		}else{
			 this.y = this.maxScrollY
		}
	}else{
		//横滑动
		this.y = 0;
		//进行修正
		if(this.x < this.minScrollX){
			this.x  =  this.minScrollX
		}else{
			 this.x = this.maxScrollX
		}
	}
	this._translate(this.x,this.y,this.bounce,ease.swipe)
}





//动量滑动
MSScroll.momentum = function(current,start,time,maxScroll,minScroll,warpSize){
	var distance = current - start,
		speed = Math.abs(distance) / time;
	var destination,
		duration;
	destination = current+speed / this.deceleration*(distance<0?-1:1);
	if(destination > maxScroll){
		destination = warpSize? Math.min(maxScroll+warpSize/4,maxScroll+warpSize/this.momentumRate*speed) : maxScroll
	}else if(destination < minScroll){
		destination = warpSize? Math.max(minScroll-warpSize/4, minScroll-warpSize/this.momentumRate*speed) : minScroll
	}

	return destination
}






export default function mixinMSScroll(classObj){
	for(var key in MSScroll){
		classObj.prototype[key] = MSScroll[key];
	}
}







