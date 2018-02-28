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
var customAlert=document.getElementById("customAlertBox");
var shapeColor;
var offset=3;


document.onload=applySizes();
var curDrawingShape='Rectangle';
var pointsForCurShape=4;
document.getElementById(curDrawingShape).style.backgroundColor="#ffffff";

//stack for undo redo
var stack=new ActionStack();

function undo(){
	stack.pop();
}

function redo(){

}

var button = document.getElementById('saveAsPNG');
var saveLink=document.createElement('a');
saveLink.download="art.png";
saveLink.href= canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
button.addEventListener('click', function (e) {
	if(canvasEmpty)
		alert("Canvas is empty. Draw Something before saving!");
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
	customAlert.style.marginTop=canvas.height;
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
		alert("Nothing to clear");
	else if(confirm("Sure to clear the canvas?"))
	{
		clearCanvas(ctx,canvas);
		set.length=0;
		canvasEmpty=true;
	}
}

function deleteOne(event){
	var curPoint=new Point(event.x-offset,event.y-offset);
	if(set.length>1)
	{
		var i=findOneShape(curPoint);
		console.log(i);
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
		x2=event.x-offset;
		y2=event.y-offset;
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
	x1=event.x-offset;
	y1=event.y-offset;
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
		stack.push(curDrawingShape+" added");
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