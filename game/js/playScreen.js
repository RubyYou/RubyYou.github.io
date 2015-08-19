function PlayScreen(){
	
	var path = [
  			{ x: 20, y: 400 }, 
            { x: 100, y: 250 },
            { x: 180, y: 200 }, 
            { x: 220, y: 120 },
            { x: 280, y: 80 },
            { x: 300, y: 120 },
            { x: 260, y: 250 },
            { x: 250, y: 300 },
            { x: 320, y: 300 },
            { x: 390, y: 250 },
            { x: 400, y: 230 },
            { x: 370, y: 180 },
            { x: 460, y: 110 },
            { x: 480, y: 120 },
            { x: 510, y: 150 },
            { x: 500, y: 180 },
            { x: 530, y: 200 },
            { x: 570, y: 180 },
            { x: 590, y: 170 },
            { x: 530, y: 100 },
            { x: 570, y: 70 },
            { x: 630, y: 100 },
            { x: 650, y: 230 },
            { x: 700, y: 380 },
            { x: 650, y: 420 },
            { x: 620, y: 450 },
            { x: 300, y: 420 },
            { x: 150, y: 420 },
            { x: 50, y: 420 }
	];

	var path2 = [];
	var betText;
	var betTargetTween;
	var againstTargetTween;
	var rank = [];
	var totalTime;
	var againstTime;
	var bg;
	var speedUpBtn;
	var betTargetImgCopy;
	var bgmusic;

	this.init = function(){
		var self = this;

		bg = Utility.renderImage('assets/racingMap.jpg', 0, 10, 50, 10);
		speedUpBtn = Utility.renderImage('assets/speedUp-Btn.png', 0, 580, 500, 3);
		betText = Utility.renderText(Global.betTargetName + Global.BetMoney + 'pounds', H1, 0, 200, 500, 5);

		// do a copy to to place in Bottom
		if(Global.betTargetName == "GrumpyCat"){
			betTargetImgCopy = Utility.renderImage('assets/cat.png', 0.5, 100, 500, 1);
		}else{
			betTargetImgCopy = Utility.renderImage('assets/doge.png', 0.5, 100, 500, 1);
		}

		betTargetImgCopy.scale.x = 0.7;
		betTargetImgCopy.scale.y = 0.7;

		Utility.assignProperties(Global.betTarget, 0.5, 20, 400, 0.2, 1);
		Utility.assignProperties(Global.againstTarget, 0.5, 50, 400, 0.2, 1);
		// add two characters

		Utility.addChildToStage([bg, betText, speedUpBtn, betTargetImgCopy]);
		Utility.updateLayersOrder();

		speedUpBtn.interactive = true;
		//speedUpBtn.on('mousedown', this.speedUp);
		speedUpBtn.on('onTouchEnd', this.speedUp);

		// render the second Path
		for(var i =0; i < path.length ; i++){

			// angle in degrees
			var x1 = path[i].x;
			var y1 = path[i].y;
			var angleDeg, newX, newY;
			
			if(i<path.length-2){
				var x2 = path[i+1].x;
				var y2 = path[i+1].y;
				angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

				// adjust previous val
				if(angleDeg>0){
					newX = x1-30;
					newY = y1+Utility.getRandomInt(0,10);
				}else{
					newX = x1+Utility.getRandomInt(0,10);
					newY = y1-50;
				}

			// match last value
			}else{
				newX = x1;
				newY = y1;
			}

			var object = {x:newX, y:newY};
			path2.push(object);
		}
		//console.log(path2);
		self.run();
	};

	this.run = function(){
		animate(false);
		var self = this;
		betTargetTween = new TimelineMax({onComplete:completeHandler, onCompleteParams: [Global.betTargetName]});
		againstTargetTween = new TimelineMax({onComplete:completeHandler, onCompleteParams: [Global.againstTargetName]});
		
		//betTargetTween 
		betTargetTween.to( Global.betTarget, 50, {
		    bezier: {
		        type: "soft",
		        values: path,
		        autoRotate: false,
		    }, 
		    delay:1,
		    ease: Linear.easeNone
		});

		//againstTargetTween
		againstTargetTween.to( Global.againstTarget, 50, {
		    bezier: {
		        type: "soft",
		        values: path2,
		        autoRotate: false,
		    }, 
		    delay:1,
		    ease: Linear.easeNone
		});

		totalTime = betTargetTween.totalDuration();
		againstTime = againstTargetTween.totalDuration();

		bgmusic = new Audio("assets/James_Bond_007_Movie_Theme_Music.mp3");
		bgmusic.addEventListener('ended', function() {
		    this.currentTime = 0;
		    this.play();
		}, false);

		bgmusic.play();
	};// this run

	this.speedUp = function(){
		
		// speedUp in positive value
		if(totalTime>0 || againstTime > 0){
			totalTime = totalTime - (Utility.getRandomInt(0,50)*0.1);
			betTargetTween.totalDuration(totalTime);

			againstTime = againstTime - (Utility.getRandomInt(0,50)*0.09);
			againstTargetTween.totalDuration(againstTime);

			Global.BetMoney ++;
			betText.text = Global.betTargetName + " " + Global.BetMoney + 'pounds';
		}

	};// this.speedUp

	var completeHandler = function(name){
		rank.push(name);
		
		if(rank.length>1){
			bgmusic.pause();
			bgmusic.currentTime = 0;
			winner();
		}
		
		//console.log(rank);
	};

	var winner = function(){
		Global.winner = rank[0];
		Utility.removeChild([bg, speedUpBtn, betText, betTargetImgCopy]);
		changeState(STATE_ENDSCREEN);
	};
}


