

import * as domTool from '../tool/dom.js';
import * as tool from '../tool/index.js'



var MSSwipe = {};




MSSwipe._translate = function(x,y,time,ease){
	var time = time?time:0;
	this._scrollEl.style['transitionTimingFunction'] = ease.style;
	this._scrollEl.style['transitionDuration'] = time+'ms';
	this._scrollEl.style['transform'] = 'translate('+x+'px, '+y+'px)';

}







export default function mixinMSSwipe(classObj){
	for(var key in MSSwipe){
		classObj.prototype[key] = MSSwipe[key];
	}
}







