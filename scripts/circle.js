function Circle(c,rad,color){
	this.tag="Circle";
	this.c=c;
	this.rad=rad;
	this.color=color;
	this.draw=drawCircle;
	this.checkInside=checkInsideCircle;
	this.move=moveCircle;
	this.scale=scaleCircle;
}

function drawCircle(curItem){
	ctx.beginPath();
	ctx.arc(this.c.x, this.c.y, this.rad, 0, 2* Math.PI);
	ctx.closePath();
	ctx.fillStyle=this.color;
	if(!curItem)
		ctx.fill();
	ctx.stroke();
}

function checkInsideCircle(p){
	if((Math.pow(p.x-this.c.x,2)+Math.pow(p.y-this.c.y,2))<Math.pow(this.rad,2))
		return true;
	return false;
}

function moveCircle(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	transform(this.c,dx,dy);
}

function getCircleArea(rad){
	return (Math.PI*rad*rad);
}

function getCircle(p1,p2,color){
	var c=new Point((p1.x+p2.x)/2,(p1.y+p2.y)/2);
	var rad=Math.min(Math.abs(p2.x-p1.x),Math.abs(p2.y-p1.y))/2;
	if(getCircleArea(rad)>0.5)
		return new Circle(c,rad,color);
	return null;
}


function scaleCircle(factor){

}