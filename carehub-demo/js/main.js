var materialList = [];
var careHubList = [];

function init() {
  Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/11HXw1ECF-phG0ocIK_IzBqvWhc6UxAQt1eFaMocV7aI/pubhtml',
                   callback: function(data, tabletop) { 
                       //console.log(data);
                       materialList = data.materials.elements;
                       careHubList = data["carehub-list"].elements;
                       addCareHubList(careHubList);
                       addMaterialList(materialList);
                       
                   }} )

}

function addCareHubList(elements){

	for(var i =0; i < elements.length; i++){
		var progress = getProgressIcon(elements[i].progress);
		var item = '<a class="item" href=\"content.html#'+ elements[i].id +'\">' + 
						'<h3>' + elements[i].title + '</h3>' + 
						'<div class="icon"><i class=\"fa '+ progress.icon +'\"/><p>' + progress.text +'</p></div>' + 
						'<div class="sub-item">' + 
							'<span>' + elements[i].type + '</span>' +
							'<span><i class="fa fa-clock-o" />' + elements[i].time + '</span>' +
							'<span><i class="fa fa-paper-plane" />' + elements[i].assign + '</span>' + 
						'</div>' +
					'</a>';
		$('.carehub-list').append(item);
	}

	populateContentData();
	toggleSignArea();
}

function toggleSignArea(){
	$('.sign').find('a').on('click', function(){
		$('.draw').addClass('show');
	});

	$('.draw').find('.remove').on('click', function(){
		$('.draw').removeClass('show');
	})
}


function populateContentData(){
	
	// content page exist
	if($('#content').length > 0 ){
		var id = window.location.hash.substr(1);
		var content = careHubList.filter(function(item){
			return id == parseInt(item.id);
		});
		var progressClass = getProgressClass(content[0].progress);
		$('#content').find('.progress').find(progressClass).addClass('active');
		$('#content').find('.title').append(content[0].title);
		$('#content').find('.type').append(content[0].type);
		$('#content').find('.endTime').append(content[0].endTime);
		$('#content').find('.details').append(content[0].details);
		$('#content').find('.created').append(content[0].created);
		$('#content').find('.supervisor').append(content[0].supervisor);
		$('#content').find('.assign').append(content[0].assign);
		$('#content').find('.lastUpdated').append(content[0].lastUpdated);
		$('#content').find('.map').attr('src', content[0].map); // replace to proper map
		$('#content').find('.totalTime').append(content[0].totalTime);
		$('#content').find('.cost').append(content[0].cost);
	}
}

function getProgressClass(name){
	var className = "";

	switch (name){
		case "start":
			className = ".start";
		break;
		case "pause":
			className = ".pause";
		break;
		case "in progress":
			className = ".inProgress";
		break;
		case "resolve":
			className = ".resolve";
		break;
	}

	return className;
}

function addMaterialList(elements){

	for(var i =0; i < elements.length; i++){
		var item = '<a class="item" href=\"material-content.html#'+ elements[i].number +'\">' + 
						'<h4>' + elements[i].number +  '<span class="name">' + elements[i].item  +'</span></h4>' + 
						'<p>' + elements[i].standard +'</p>' + 
						'<div class="amount">' + 
							'<p>數量</p>' +'<p>' + elements[i].storage + '</p>' +
						'</div>' +
					'</a>';
		$('.material-list').append(item);
	}

	populateMaterialContentData();
}

function populateMaterialContentData(){
	if($('#material-content').length > 0 ){
		var id = window.location.hash.substr(1);
		var content = materialList.filter(function(item){
			return id == item.number;
		});
		
		$('#material-content').find('.standard input').val(content[0].standard);
		$('#material-content').find('.describe input').val(content[0].describe);
		$('#material-content').find('.price input').val(content[0].price);
		$('#material-content').find('.storage input').val(content[0].storage);
		$('#material-content').find('.require input').val(content[0].require);
		$('#material-content').find('.date input').val(content[0].date);
		$('#material-content').find('.number').append('#' + content[0].number);
	}
}


function getProgressIcon(progress){
	var icon = null;
	var text = "";
	switch(progress){
		case "start":
			text = "開始";
			icon = "fa-unlock-alt";
		break;
		case "pause":
			text = "暫停";
			icon = "fa-pause";
		break;
		case "in progress":
			text = "處理中";
			icon = "fa-spinner";
		break;
		case "pause":
			text = "解決";
			icon = "fa-smile-o";
		break;
	}
	return { text: text, icon: icon};
}



window.addEventListener('DOMContentLoaded', init)