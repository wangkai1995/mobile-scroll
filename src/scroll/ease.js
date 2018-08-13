


const 	pow = Math.pow,
	  	sqrt = Math.sqrt,
		sin = Math.sin,
		cos = Math.cos,
		PI = Math.PI;



export default {
	// easeOutQuart
	swipe:{
        style:'cubic-bezier(0.165, 0.84, 0.44, 1)',
		fn:function(x){
			return 1 - pow(1 - x,4);
		}
	},
	//easeOutQuad
	momentum:{
		style:'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
		fn:function(x){
            return 1 -(1 - x)*(1 - x);
        },
	},
	//easeOutQuint
	bounce:{
		style:'cubic-bezier(0.23, 1, 0.32, 1)',
		fn:function(x){
            return 1 - pow(1 - x,5);
        },
   	}
}

