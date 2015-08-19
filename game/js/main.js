// Global object
var Global = {
	state:"",
	renderer:"",
	stage:"",
	betTarget:"",
	betTargetName:"",
	againstTaret:"",
	againstTaretName:"",
	grumpyCat:"",
	doge:"",
	winner:"",
	BetMoney:20
};


var STATE_BETSCREEN = "State.BetScreen";
var STATE_PLAYSCREEN = "State.PlayScreen";
var STATE_ENDSCREEN = "State.EndScreen";

var changeState = function(state) {
	//console.log("change state: "+state);
    
    switch (state) {
        case "State.BetScreen":
        	  var betScreen = new BetScreen();
        	  betScreen.init();
       		  break;

       	case "State.PlayScreen":
       		  var playScreen = new PlayScreen();      		  
       		  Global.state = STATE_PLAYSCREEN;
        	  playScreen.init();
       		  break;

       	case "State.EndScreen":
       		  var endScreen = new EndScreen();
       		  Global.state = STATE_ENDSCREEN;
        	  endScreen.init();
       		  break;
    }
}


function animate(config) {
	if(config !== false){
		requestAnimationFrame(animate);
		Global.renderer.render(Global.stage);
		//console.log('update');
	}

}

function init(){
	
	// stage
	Global.renderer = new PIXI.CanvasRenderer(800, 600,{backgroundColor : 0x000000, clearBeforeRender:true});
	document.body.appendChild(Global.renderer.view);

	// create the root of the scene graph
	Global.stage = new PIXI.Container();
	
	changeState(STATE_BETSCREEN);

	animate(true);
}

window.onload = init;












