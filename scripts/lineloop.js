function LineLoop(points,color){
	this.tag="LineLoop";
	this.points=points;
	this.color=color;
	this.lineCount=points.length;
	this.draw=drawLineLoop;
	this.checkInside=checkInsideLineLoop;
	this.move=moveLineLoop;
	this.scale=scaleLineLoop;
}

function drawLineLoop(curItem){
	ctx.beginPath();
	ctx.moveTo(this.points[0].x,this.points[0].y);
	for(var line=1;line<this.lineCount;line++)
		ctx.lineTo(this.points[line].x,this.points[line].y);
	ctx.closePath();
	ctx.fillStyle=this.color;
	if(!curItem)
		ctx.fill();
	ctx.stroke();
}

function scaleLineLoop(factor){

}

function checkInsideLineLoop(p){
	if(true)
		return true;
	return false;
}

function moveLineLoop(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	for(var line=0;line<this.lineCount;line++)
		transform(points[i],dx,dy);
}