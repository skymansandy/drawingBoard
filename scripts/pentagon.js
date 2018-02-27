function Pentagon(a,b,c,d,e,color){
	this.tag="Pentagon";
	this.a=a;
	this.b=b;
	this.c=c;
	this.d=d;
	this.e=e;
	this.color=color;
	this.draw=drawPentagon;
	this.checkInside=checkInsidePentagon;
	this.move=movePentagon;
	this.scale=scalePentagon;
}

function drawPentagon(curItem){
	ctx.beginPath();
	ctx.moveTo(this.a.x,this.a.y);
	ctx.lineTo(this.b.x,this.b.y);
	ctx.lineTo(this.c.x,this.c.y);
	ctx.lineTo(this.d.x,this.d.y);
	ctx.lineTo(this.e.x,this.e.y);
	ctx.closePath();
	ctx.fillStyle=this.color;
	if(!curItem)
		ctx.fill();
	ctx.stroke();
}

function scalePentagon(factor){

}

function checkInsidePentagon(p){
	if(true)
		return true;
	return false;
}

function movePentagon(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	transform(this.a,dx,dy);
	transform(this.b,dx,dy);
	transform(this.c,dx,dy);
	transform(this.d,dx,dy);
	transform(this.e,dx,dy);
}

function getPentagonArea(edge){
	return (Math.sqrt(5*(5+2*Math.sqrt(5)))*Math.pow(edge,2))/4;
}

function getPentagon(p1,p2,color){
	var a;
	var b;
	var c;
	var d;
	var e;
	if(getPentagonArea(edge)>0.5)
		return new Pentagon(a,b,c,d,e,color);
	return null;
}