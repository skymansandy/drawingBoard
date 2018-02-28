function Rectangle(a,b,c,d,color){
	this.numPoints=4;
	this.a=a;
	this.b=b;
	this.c=c;
	this.d=d;
	this.color=color;
	this.draw=drawRectangle;
	this.checkInside=checkInsideRectangle;
	this.move=moveRectangle;
	this.scale=scaleRectangle;
}

function drawRectangle(curItem){
	ctx.beginPath();
	ctx.moveTo(this.a.x,this.a.y);
	ctx.lineTo(this.b.x,this.b.y);
	ctx.lineTo(this.c.x,this.c.y);
	ctx.lineTo(this.d.x,this.d.y);
	ctx.closePath();
	ctx.fillStyle=this.color;
	if(!curItem)
		ctx.fill();
	ctx.stroke();
}

function checkInsideRectangle(p){
	var areaSub1=getTriangleArea(this.a,this.b,p);
	var areaSub2=getTriangleArea(this.b,this.c,p);
	var areaSub3=getTriangleArea(this.c,this.d,p);
	var areaSub4=getTriangleArea(this.d,this.a,p);
	var areaMain=getRectangleArea(this.a,this.b,this.c,this.d);

	if(areaMain==areaSub1+areaSub2+areaSub3+areaSub4)
		return true;
	return false;
}

function moveRectangle(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	transform(this.a,dx,dy);
	transform(this.b,dx,dy);
	transform(this.c,dx,dy);
	transform(this.d,dx,dy);
}

function getRectangleArea(a,b,c,d){
	return Math.abs((c.x-a.x)*(c.y-a.y));
}

function getRectangle(p1,p2,color){
	var a=new Point(p1.x,p1.y);
	var b=new Point(p2.x,p1.y);
	var c=new Point(p2.x,p2.y);
	var d=new Point(p1.x,p2.y);
	if(getRectangleArea(a,b,c,d)>0)
		return new Rectangle(a,b,c,d,color);
	return null;
}


function scaleRectangle(){
	
}