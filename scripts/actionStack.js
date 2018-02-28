function ActionStack(){
    this.top=-1;
    this.stack=[];
    this.undo=undoStack;
    this.redo=redoStack;
    this.record=recordAction;
}

function recordAction(){
    this.stack.push(set.slice());
    this.top++;
}

function undoStack(){
    if(this.top>0)
    set= this.stack[--this.top];
    else
    showAlert("Nothing to Undo!");
    clearCanvas(ctx, canvas);
    drawAllShapes();
}

function redoStack(){
    if (this.top<this.stack.length-1)
    set= this.stack[++this.top];
    else
    showAlert("Nothing to Redo!");
    clearCanvas(ctx, canvas);
    drawAllShapes();
}