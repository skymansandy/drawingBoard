function Point(x,y){
	this.x=x;
	this.y=y;
	this.transform=transform;
}

function clearCanvas(ctx,canvas){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

function transform(p,x1,x2,y1,y2)
{
	p.x-=(x1-x2);
	p.y-=(y1-y2);
}
  