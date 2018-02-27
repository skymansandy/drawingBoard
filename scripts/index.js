var x1,y1,x2,y2,moving,draggingThis,movingItem,tempShape,movingIndex;
var startPoint, endPoint;
var p1,p2,p3,p4;
var set=[];
var dragging=false;
var con=document.getElementById("canvasContainer");
var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var shapeColor;
var offset=3;

var button = document.getElementById('saveAsPNG');
var saveLink=document.createElement('a');
saveLink.download="art.png";
saveLink.href= canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
button.addEventListener('click', function (e) {
   saveLink.click();
});

var drawingNow="Rectangle";

canvas.height=window.innerHeight;
canvas.width=window.innerWidth-280;

function changeShape(newShape){
	drawingNow=newShape;
}

function clearCanvasPrompt(){
	if(confirm("Sure to clear the canvas?"))
	{
		clearCanvas(ctx,canvas);
		set.length=0;
	}	
}

function deleteOne(event){
	var curPoint=new Point(event.x-offset,event.y-offset);
	if(set.length>1)
	{
		var i=findOneShape(curPoint);
		if(i!=-1)
		{
			for(i;i<set.length-1;i++)
				set[i]=set[i+1];
			set.length--;
		}
		if(i==set.length-1)
			set.length--;
	}
	else if(findOneShape(curPoint)!=-1)
		set.length=0;

	clearCanvas(ctx,canvas);
	drawAllShapes();
}

function findOneShape(p){
	for(i=set.length-1;i>=0;i--){
		var shape=set[i];
		if(shape.checkInside(p)){
			moving=true;
			return i;
		}
	}
	return -1;
}

function previewShape(event){
	clearCanvas(ctx,canvas);
	if(dragging==true){
		//update
		x2=event.x-offset;
		y2=event.y-offset;
		if(moving){
				endPoint=new Point(x2,y2);
				movingItem.move(startPoint,endPoint);
				startPoint.x=x2;
				startPoint.y=y2;
		}
		else{
			p2=new Point(x2,y2);
			tempShape=getShape(p1,p2,shapeColor);
			if(tempShape!=null)
				tempShape.draw();
		}
	}
	drawAllShapes();
}

function mouseClick(state,event)
{
	if(state=="down")
	{
		x1=event.x-offset;
		y1=event.y-offset;
		p1=new Point(x1,y1);
		startPoint=new Point(x1,y1);
		dragging=true;
		shapeColor=(document.getElementById("ourColor").checked)?document.getElementById("colorPicker").value:getRandomColor();
		movingIndex=findOneShape(p1);
		if(movingIndex!=-1)
		{
			moving=true;
			movingItem=set[movingIndex];
		}
	}
	else
	{
		x2=event.x-offset;
		y2=event.y-offset;
		p2=new Point(x2,y2);
		clearCanvas(ctx,canvas);
		dragging=false;
		if(moving==true)
			moving=false;
		else{
			tempShape=getShape(p1,p2,shapeColor);
			if(tempShape!=null)
				set.push(tempShape);
		}
		drawAllShapes();
	}
}

function drawAllShapes(){
	for(i=0;i<set.length;i++){
		var shape=set[i];
		shape.draw();
	}
}

function getShape(p1,p2,color){
	switch(drawingNow){
		case "Triangle":
			return getTriangle(p1, p2, shapeColor);
		case "Rectangle":
			return getRectangle(p1, p2, shapeColor);
		case "Circle":
			return getCircle(p1, p2, shapeColor);
	}
}