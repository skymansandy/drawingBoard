function Circle(c,rad,color){
	this.tag="Circle";
	this.c=c;
	this.rad=rad;
	this.color=color;
	this.draw=drawCircle;
	this.checkInside=checkInsideCircle;
	this.move=moveCircle;
}

function drawCircle(){
	ctx.beginPath();
	ctx.arc(this.c.x, this.c.y, this.rad, 0, 2* Math.PI);
	ctx.closePath();
	ctx.fillStyle=this.color;
	ctx.fill();
	ctx.stroke();
}

function checkInsideCircle(p){
	if(Math.pow(this.c.x-p.x,2)+Math.pow(this.c.y-p.y,2)==Math.pow(this.rad,2))
		return true;
	return false;
}

function moveCircle(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	this.c.x-=dx;
	this.c.y-=dy;
}

function getCircleArea(rad){
	return (Math.PI*rad*rad);
}

function getCircle(p1,p2,color){
	var c=new Point(p1.x,p1.y);
	var rad=(Math.sqrt((Math.pow(p2.x-p1.x,2)),Math.pow(p2.y-p1.y,2)));
	if(getCircleArea(rad)>0.5)
		return new Circle(c,rad,color);
	return null;
}