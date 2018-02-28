function ActionStack(){
	this.actions=[]
	this.top=-1;
	this.push=pushAction;
	this.pop=popAction;
	this.settle=settleActionStack;
	this.getSize=getSize;
}

function getSize(){
	return this.actions.length;
}

function pushAction(action){
	this.actions[this.getSize()]=action;
}

function popAction(){
	var revoke=this.actions[this.getSize()-1];
	console.log(revoke);
}

function settleActionStack(){

}