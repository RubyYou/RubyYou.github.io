function Utility() {}

Utility.removeChild = function (children){
	var length = children.length;
	for (var i=0; i<length ; i++){
		Global.stage.removeChild(children[i]);
	}

}

/* sort out the depth of the objects */
Utility.updateLayersOrder = function () {
    Global.stage.children.sort(function(a,b) {
        a.zIndex = a.zIndex || 0;
        b.zIndex = b.zIndex || 0;
        return b.zIndex - a.zIndex
    });
};

Utility.renderImage = function(TextureUrl, anchor, positionX, positionY, depth){
	var objectTexture = PIXI.Texture.fromImage(TextureUrl);
	var object = new PIXI.Sprite(objectTexture);
	object.anchor.x = anchor;
	object.anchor.y = anchor;
	object.position.x = positionX;
	object.position.y = positionY;
	object.zIndex = depth;
	return object;
}

Utility.renderVideo = function(TextureUrl, width, height, depth){
	var objectTexture = PIXI.Texture.fromVideo(TextureUrl);
	var object = new PIXI.Sprite(objectTexture);
	object.width = width;
	object.height = height;
	object.zIndex = depth;
	return object;
}

Utility.renderText = function(text, style, anchor, positionX, positionY, depth){
	var text = new PIXI.Text(text, H1);
	text.anchor.x = anchor;
	text.anchor.y = anchor;
	text.position.x = positionX;
	text.position.y = positionY;
	text.zIndex = depth;
	return text;
}

Utility.addChildToStage = function(object){
	var length = object.length;
	for (var i=0; i<length ; i++){
		Global.stage.addChild(object[i]);
	}
}

Utility.assignProperties = function(object, anchor, positionX, positionY, scale, depth){
	object.anchor.x = anchor || 0.5;
	object.anchor.y = anchor || 0.5;
	object.position.x = positionX;
	object.position.y = positionY;
	object.scale.x = scale || 1;
	object.scale.y = scale || 1;
	object.zIndex = depth || 1;
	return object;
}

Utility.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}




