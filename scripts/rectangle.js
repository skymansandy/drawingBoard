function Rectangle(a,b,c,d,color){
	this.tag="Rectangle";
	this.a=a;
	this.b=b;
	this.c=c;
	this.d=d;
	this.color=color;
	this.draw=drawRectangle;
	this.checkInside=checkInsideRectangle;
	this.move=moveRectangle;
}

function drawRectangle(){
	ctx.beginPath();
	ctx.moveTo(this.a.x,this.a.y);
	ctx.lineTo(this.b.x,this.b.y);
	ctx.lineTo(this.c.x,this.c.y);
	ctx.lineTo(this.d.x,this.d.y);
	ctx.closePath();
	ctx.fillStyle=this.color;
	ctx.fill();
	ctx.stroke();
}

function checkInsideRectangle(p){
	if(p.x>=this.a.x&&p.x<=this.c.x&&p.y>=this.a.y&&p.y<=this.c.y)
		return true;
	return false;
}

function moveRectangle(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	this.a.x-=dx;
	this.a.y-=dy;
	this.b.x-=dx;
	this.b.y-=dy;
	this.c.x-=dx;
	this.c.y-=dy;
	this.d.x-=dx;
	this.d.y-=dy;
}

function getRectangleArea(a,b,c,d){
	return ((c.x-a.x)*(c.y-a.y));
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