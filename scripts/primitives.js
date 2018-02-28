function Point(x,y){
	this.x=x;
	this.y=y;
	this.transform=transform;
}

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
  }

function transform(p,dx,dy)
{
	p.x-=dx;
	p.y-=dy;
}