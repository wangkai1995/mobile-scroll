




export default{
	//滑动模式
	mode: 'v', //h=横 v=竖


	//动量时间ms
	momentumTime:300,
	//动量距离
	momentumDistance:15,
	//动量比例
	momentumRate:15,
	//动量倍数
	deceleration:0.0018,
	//动量过度时间
	momentumSwipeTime:500,

	//拖拽阻力倍数
	dragRate:3,
	//回弹时间ms
	bounce:800,

	//x轴最大范围
	maxScrollX:0,
	minScrollX:0,
	//y轴最大范围
	maxScrollY:0,
	minScrollY:0,

	//滑动使用到参数
	x:0,
	y:0,
	newY:0,
	newX:0,
	startTime:0,
	time:0,
}