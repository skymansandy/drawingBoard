var x1,y1,x2,y2,moving,movingItem,tempShape,movingIndex;
var canvasEmpty=true;
var statePressed;
var startPoint, endPoint;
var p1,p2;
var set=[];
var dragging=false;
var con=document.getElementById("canvasContainer");
var canvas=document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var checkBoxColor=document.getElementById("ourColor");
var checkBoxStatus=document.getElementById("colorPickerStatus");

var shapeColor;
var xOffset=36,yOffset=3;


document.onload=applySizes();
var curDrawingShape='Rectangle';
var pointsForCurShape=4;
document.getElementById(curDrawingShape).style.backgroundColor="#ffffff";

//stack for undo redo
var stack=new ActionStack();
stack.record();

function showAlert(msg){
	document.getElementById("customAlertBox").style.display="block";
	document.getElementById("msgHolder").innerHTML=msg;
}

function fadeOutAlert(div){
	div.style.opacity = "0";
	setTimeout(function(){ div.style.display = "none"; }, 600);
}

var button = document.getElementById('saveAsPNG');
var saveLink=document.createElement('a');
saveLink.download="art.png";
saveLink.href= canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
button.addEventListener('click', function (e) {
	if(canvasEmpty)
		showAlert("Canvas is empty. Draw Something before saving!");
	else
   		saveLink.click();
});

function colorOptionToggle(){
	checkBoxStatus.innerHTML= checkBoxColor.checked?"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Applied":"Not Applied";
}



function clearCanvas(ctx,canvas){
	ctx.clearRect(0,0,canvas.width,canvas.height);
}

function applySizes(){
	clearCanvas(ctx,canvas);
	canvas.height=window.innerHeight;
	canvas.width=window.innerWidth-300;
	drawAllShapes();
}


function changeShape(newShape){
	document.getElementById(curDrawingShape).style.backgroundColor=null;
	document.getElementById(newShape).style.backgroundColor="#ffffff";
	curDrawingShape=newShape;
	pointsForCurShape=getNumOfPoints(newShape);
}

function getNumOfPoints(shape){
	switch(shape){
		case 'LineLoop':return -1;
		case 'Circle':return 0;
		case 'Line':return 2;
		case 'Triangle':return 3;
		case 'Rectangle':return 4;
		case 'Polygon':return document.getElementById("inputNumOfShapes").value;
	}
}

function clearCanvasPrompt(){
	if(set.length==0)
		showAlert("Nothing to clear");
	else if(confirm("Sure to clear the canvas?"))
	{
		clearCanvas(ctx,canvas);
		set.length=0;
		canvasEmpty=true;
	}
}

function deleteOne(event){
	var curPoint=new Point(event.x-xOffset,event.y-yOffset);
	var found=findOneShape(curPoint);
	if(set.length>1)
	{
		if(found!=-1)
		{
			for(i=found;i<set.length-1;i++)
				set[i]=set[i+1];
			set.length--;
		}
	}
	else if(found!=-1)
		set.length=0;
	if(found!=-1)
		stack.record();
	clearCanvas(ctx,canvas);
	drawAllShapes();
}

function findOneShape(p){
	for(i=set.length-1;i>=0;i--){
		if(set[i].checkInside(p)){
			return i;
		}
	}
	return -1;
}

function previewShape(event){
	if(dragging==true){
		//update
		clearCanvas(ctx,canvas);
		x2=event.x-xOffset;
		y2=event.y-yOffset;
		if(moving){
				endPoint=new Point(x2,y2);
				movingItem.move(startPoint,endPoint);
				drawAllShapes();
				startPoint.x=x2;
				startPoint.y=y2;
		}
		else{
			p2=new Point(x2,y2);
			drawAllShapes();
			tempShape=getShape(p1,p2,shapeColor);
			if(tempShape!=null)
				tempShape.draw(true);
		}
	}
}

function mouseDown(event){
	statePressed=true;
	x1=event.x-xOffset;
	y1=event.y-yOffset;
	p1=new Point(x1,y1);
	startPoint=new Point(x1,y1);
	dragging=true;
	shapeColor=(document.getElementById("ourColor").checked)?document.getElementById("colorPicker").value:getRandomColor();

	if(true)//event.ctrlKey)
	{
		movingIndex=findOneShape(p1);
		if(movingIndex!=-1)
		{
			moving=true;
			movingItem=set[movingIndex];
		}
	}
}

function mouseUp(event){
	statePressed=false;
	x2=event.x-xOffset;
	y2=event.y-yOffset;
	p2=new Point(x2,y2);
	clearCanvas(ctx,canvas);
	dragging=false;
	if(moving==true){
		moving=false;
		stack.record();
	}
	else{
		tempShape=getShape(p1,p2,shapeColor);
		if(tempShape!=null)
		{
			set.push(tempShape);
			stack.record();
		}
	}
	drawAllShapes();
}

function drawAllShapes(){
	for(i=0;i<set.length;i++){
		var shape=set[i];
		var fillCurrentItem=(moving==true&&i==movingIndex?true:false);
		shape.draw(fillCurrentItem);
	}
	canvasEmpty=(set.length==0)?true:false;
}

function getShape(p1,p2,color){
	switch(pointsForCurShape){
		case -1:
			console.log("Drawing line loop");
		break;
		case 0:
			return getCircle(p1, p2, shapeColor, pointsForCurShape);
		case 2:
			return getLine(p1, p2, shapeColor, pointsForCurShape);
		case 3:
			return getTriangle(p1, p2, shapeColor, pointsForCurShape);
		case 4:
			return getRectangle(p1, p2, shapeColor, pointsForCurShape);
		default:
			return getPolygon(p1, p2, shapeColor, pointsForCurShape);
	}
}
