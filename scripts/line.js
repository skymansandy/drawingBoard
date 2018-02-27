function Line(a,b,color){
	this.tag="Line";
	this.a=a;
	this.b=b;
	this.color=color;
	this.draw=drawLine;
	this.checkInside=checkInsideLine;
	this.move=moveLine;
	this.scale=scaleLine;
}

var padAllowance=7;

function drawLine(){
	ctx.beginPath();
	ctx.moveTo(this.a.x,this.a.y);
	ctx.lineTo(this.b.x,this.b.y);
	ctx.closePath();
	ctx.fillStyle=this.color;
	ctx.fill();
	ctx.stroke();
}

function checkInsideLine(p){
	var p1=new Point(this.a.x-padAllowance,this.a.y-padAllowance);
	var p2=new Point(this.b.x-padAllowance,this.b.y-padAllowance);
	var p3=new Point(this.b.x+padAllowance,this.b.y+padAllowance);
	var p4=new Point(this.a.x+padAllowance,this.a.y+padAllowance);
	if(new Triangle(p1,p2,p4).checkInside(p)||new Triangle(p2,p4,p3).checkInside(p))
		return true;
	return false;
}

function moveLine(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	transform(this.a,dx,dy);
	transform(this.b,dx,dy);
}

function getLineLength(p1,p2){
	return (Math.abs(p2.x-p1.x));
}

function getLine(p1,p2,color){
	if(getLineLength(p1,p2)>0.5)
		return new Line(p1,p2,color);
	return null;
}

function scaleLine(){
	
}