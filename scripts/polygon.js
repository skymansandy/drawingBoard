function Polygon(center, rad, color, numPoints){
	this.numPoints=numPoints;
	this.c=center;
	this.rad=rad;
	this.color=color;
	this.draw=drawPolygon;
	this.checkInside=checkInsidePolygon;
	this.move=movePolygon;
	this.getPoints=getPointsOfPolygon;
	this.scale=scalePolygon;
	this.step=360/numPoints;
	console.log((this.step));
}

var degToRad=(Math.PI/180);

function drawPolygon(curItem){
	ctx.beginPath();
	ctx.moveTo(this.c.x,this.c.y+this.rad);
	for(var i=90;i<=450;i+=this.step){
		var x=parseInt(this.c.x+this.rad*Math.cos(i*degToRad));
		var y=parseInt(this.c.y+this.rad*Math.sin(i*degToRad));
		ctx.lineTo(x,y);
	}
	ctx.closePath();
	ctx.fillStyle=this.color;
	if(!curItem)
		ctx.fill();
	ctx.stroke();
}

function scalePolygon(factor){

}

function checkInsidePolygon(p){
	if((Math.pow(p.x-this.c.x,2)+Math.pow(p.y-this.c.y,2))<Math.pow(this.rad,2))
		return true;
	return false;
}

function movePolygon(start,end){
	var dx=(start.x-end.x);
	var dy=(start.y-end.y);
	transform(this.c,dx,dy);
}

function getPolygonArea(edge){
	return (Math.sqrt(5*(5+2*Math.sqrt(5)))*Math.pow(edge,2))/4;
}

function getPolygon(p1,p2,color,numPoints){
	var c=new Point((p1.x+p2.x)/2,(p1.y+p2.y)/2);
	var rad=Math.min(Math.abs(p2.x-p1.x),Math.abs(p2.y-p1.y))/2;
	if(true)//getPolygonArea(edge)>0.5)
		return new Polygon(c,rad,color,numPoints);
	return null;
}

function getPointsOfPolygon(){
	var pts=[];
	console.log("Start");
	for(var i=90;i<450;i+=parseInt(360/this.numPoints)){
		console.log("This");
		var x=parseInt(this.c.x+this.rad*Math.cos(i*(Math.PI/180)));
		var y=parseInt(this.c.y+this.rad*Math.sin(i*(Math.PI/180)));
		pts[parseInt((i-90)/(360/this.numPoints))]=new Point(x,y);
	}
	console.log(pts);
	return pts;
}