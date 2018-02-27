function Triangle(a,b,c,color){
	this.tag="Triangle";
	this.a=a;
	this.b=b;
	this.c=c;
	this.color=color;
	this.draw=drawTriangle;
	this.checkInside=checkInsideTriangle;
	this.move=moveTriangle;
}

function checkInsideTriangle(p){
	var areaSub1=getTriangleArea(this.a,this.b,p);
	var areaSub2=getTriangleArea(this.b,this.c,p);
	var areaSub3=getTriangleArea(this.c,this.a,p);
	var areaMain=getTriangleArea(this.a,this.b,this.c);
	if(areaMain==(areaSub1+areaSub2+areaSub3))
		return true;
	return false;
}

function moveTriangle(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	this.a.x-=dx;
	this.a.y-=dy;
	this.b.x-=dx;
	this.b.y-=dy;
	this.c.x-=dx;
	this.c.y-=dy;
}

function drawTriangle()
{
	ctx.beginPath();
			ctx.moveTo(this.a.x,this.a.y);
			ctx.lineTo(this.b.x,this.b.y);
			ctx.lineTo(this.c.x,this.c.y);
	ctx.closePath();
	ctx.fillStyle=this.color;
	ctx.fill();
	ctx.stroke();
}

function getTriangle(p1,p2,color){
	var a=new Point((p1.x+p2.x)/2,p1.y);
	var b=new Point(p1.x,p2.y);
	var c=new Point(p2.x,p2.y);
	if(getTriangleArea(a,b,c)>0)
		return new Triangle(a,b,c,color);
	return null;
}

function getTriangleArea(a,b,c){
	return (Math.abs(a.x*(b.y - c.y) + b.x*(c.y - a.y) + c.x*(a.y-b.y))/2);
}