var materialList = [];
var careHubList = [];

function init() {
	var config = {
		apiKey: "AIzaSyABzMG21mytB-OW1mv37Rfh4tdpvSLaunQ",
		authDomain: "torrid-inferno-9944.firebaseapp.com",
		databaseURL: "https://torrid-inferno-9944.firebaseio.com",
		projectId: "torrid-inferno-9944",
		storageBucket: "torrid-inferno-9944.appspot.com",
		messagingSenderId: "836178416951"
	};
	firebase.initializeApp(config);
	firebase.database().ref("carehub").on('value', function (snapshots)
	{
		snapshots.forEach( function (snap) {
			var data = Object.assign ({}, snap.val(), {key: snap.key});
			careHubList.push (data);
		});
	});

	firebase.database().ref("material").on('value', function (snapshots)
	{
		snapshots.forEach( function (snap) {
			var data = Object.assign ({}, snap.val(), {key: snap.key});
			materialList.push (data);
		});

	});

	console.log ('careHubList', careHubList);
	console.log ('materialList', materialList);
	setTimeout(function (){
		if ($('.carehub-list').length > 0 ) {
			addCareHubList (careHubList);
		}

		if($('#content').length > 0 )
		{
			populateContentData ();
		}

		if ($('.material-list').length > 0)
		{
			addMaterialList (materialList);
		}


		if($('#material-content').length > 0 )
		{
			populateMaterialContentData();
		}
	}, 2000);

}


function addCareHubList (elements)
{

	for(var i =0; i < elements.length; i++){
		var progress = getProgressIcon(elements[i].progress);
		var item = '<a class="item" href=\"content.html#'+ elements[i].key +'\">' +
			'<h3>' + elements[i].title + '</h3>' +
			'<div class="icon"><i class=\"fa '+ progress.icon +'\"/><p>' + progress.text +'</p></div>' +
			'<div class="sub-item">' +
			'<span>' + elements[i].type + '</span>' +
			'<span><i class="fa fa-clock-o" />' + elements[i].endTime + '</span>' +
			'<span><i class="fa fa-paper-plane" />' + elements[i].assignee + '</span>' +
			'</div>' +
			'</a>';
		$('.carehub-list').append(item);
	}
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

	var key = window.location.hash.substr(1);
	var content = careHubList.filter(function(item){
		return key == item.key;
	});
	var progressClass = getProgressClass(content[0].progress);
	console.log(progressClass);
	$('#content').find('.progress').find(progressClass).addClass('active');
	$('#content').find('.title').append(content[0].title);
	$('#content').find('.type').append(content[0].type);
	$('#content').find('.endTime').append(content[0].endTime);
	$('#content').find('.details').append(content[0].details);
	$('#content').find('.supervisor').append(content[0].supervisor);
	$('#content').find('.assign').append(content[0].assignee);
	$('#content').find('.lastUpdated').append(content[0].lastUpdated);
	$('#content').find('.totalTime').append(content[0].hour + 'hours ' + content[0].minus + 'minus');
	$('#content').find('.cost').append(content[0].cost);
	toggleSignArea();
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
		var item = '<a class="item" href=\"material-content.html#'+ elements[i].key +'\">' +
			'<h4>' + elements[i].number +  '<span class="name">' + elements[i].item  +'</span></h4>' +
			'<p>' + elements[i].standard +'</p>' +
			'<div class="amount">' +
			'<p>數量</p>' +'<p>' + elements[i].storage + '</p>' +
			'</div>' +
			'</a>';
		$('.material-list').append(item);
	}

}

function populateMaterialContentData(){

	var key = window.location.hash.substr(1);
	var content = materialList.filter(function(item){
		return key == item.key;
	});

	$('#material-content').find('.standard input').val(content[0].standard);
	$('#material-content').find('.describe input').val(content[0].describe);
	$('#material-content').find('.price input').val(content[0].price);
	$('#material-content').find('.storage input').val(content[0].storage);
	$('#material-content').find('.require input').val(content[0].require);
	$('#material-content').find('.date input').val(content[0].date);
	$('#material-content').find('.number').append('#' + content[0].number);
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
		case "resolve":
			text = "解決";
			icon = "fa-smile-o";
			break;
	}
	return { text: text, icon: icon};
}



window.addEventListener('DOMContentLoaded', init)
