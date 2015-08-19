function EndScreen(){

	this.init = function(){
		
		var result;
		var winnerAnnounceText, moneyAnnounceText, winnerVideo;
		
		if( Global.betTargetName == Global.winner ){
			result = "win";
		}else{
			result = "lose";
		}

		// if player win the game
		switch(result){
			
			case "win":
				winnerAnnounceText = Utility.renderText('Winner is ' + Global.winner + "!!!!", H1, 0, 200, 500, 5);
				moneyAnnounceText = Utility.renderText('You win ' + Global.BetMoney  + " pounds!", H1, 0, 200, 550, 5);
				winnerVideo = Utility.renderVideo('assets/'+Global.betTargetName+".mp4", Global.renderer.width, Global.renderer.height*0.8, 10);
			break;
			
			case "lose":
				winnerAnnounceText = Utility.renderText('Winner is ' + Global.winner + "!!!!", H1, 0, 200, 500, 5);
				moneyAnnounceText = Utility.renderText('You lose ' + Global.BetMoney  + " pounds!", H1, 0, 200, 550, 5);
				winnerVideo = Utility.renderVideo('assets/'+Global.againstTargetName+".mp4",Global.renderer.width, Global.renderer.height*0.8, 10);
			break;
		};

		Global.stage.addChild(winnerVideo);
		Utility.addChildToStage([winnerAnnounceText, moneyAnnounceText]);

	};

};