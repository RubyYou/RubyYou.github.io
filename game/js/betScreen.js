
function BetScreen(){

	var catBetBtn, dogeBetBtn, introText;

	this.init = function(){

		var self = this;

		Global.grumpyCat = Utility.renderImage('assets/cat.png', 0.5, Global.renderer.view.width/2-200, 320, 2);
		Global.doge = Utility.renderImage('assets/doge.png', 0.5, Global.renderer.view.width/2+200, 320, 1);
		catBetBtn = Utility.renderImage('assets/cat-btn.png', 0.5, Global.renderer.view.width/2-200, 450, 3);
		dogeBetBtn = Utility.renderImage('assets/doge-btn.png', 0.5, Global.renderer.view.width/2+200, 450, 3);
		introText = Utility.renderText('Choose One to place bet for 2015 race winner!', H1, 0, 80, 80, 5);

		catBetBtn.interactive = true;
		dogeBetBtn.interactive = true;
		
		catBetBtn.betItem = Global.grumpyCat;
		dogeBetBtn.betItem = Global.doge;
		catBetBtn.betItemName = "GrumpyCat";
		dogeBetBtn.betItemName = "Doge";

		//catBetBtn.on('mousedown', this.playScreenHandler);
		//dogeBetBtn.on('mousedown', this.playScreenHandler);
		catBetBtn.on('onTouchStart', this.playScreenHandler);
		dogeBetBtn.on('onTouchStart', this.playScreenHandler);

		Utility.addChildToStage([introText, Global.grumpyCat, Global.doge, dogeBetBtn, catBetBtn]);
	};


	this.playScreenHandler = function(){

		Global.betTarget = this.betItem;
		Global.betTargetName = this.betItemName;

		if(Global.betTargetName == "GrumpyCat"){
			Global.againstTarget = dogeBetBtn.betItem;
			Global.againstTargetName = dogeBetBtn.betItemName;
		}else{
			Global.againstTarget = catBetBtn.betItem;
			Global.againstTargetName = catBetBtn.betItemName;
		};

		Utility.removeChild([catBetBtn, dogeBetBtn, introText]);

		changeState(STATE_PLAYSCREEN);
	};

}




