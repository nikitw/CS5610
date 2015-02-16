$(function (e) {
	$(".dragme").draggable();
	$(".resizeme").resizable();
	$(".sortable").sortable({
		axis: "y"
	});

	$("#addP").click( function (e) {
		addPara("new Paragraph", 300, 220);
	});

	$("#saveP").click( function(e) {
		save();	
	});

	$("#loadP").click( function(e) {
		load();	
	});
		
});

function save() {
	var para = $(".para");
	var pList = [];
	para.each(function (i) {
		var pos = $(this).position();
		var text = $(this).text();

		var obj = {
			text: text,
			x: pos.left,
			y: pos.top
		};

		pList.push(obj);
	});
	localStorage.setItem("000-exp17", JSON.stringify(pList));
}

function load() {
	var pList = JSON.parse(localStorage.getItem("000-exp17"));
	if(pList == null) return;

	for (var p in pList) {
		var para = pList[p];
		addPara(para.text, para.x, para.y);
	}
}

function addPara( text, x, y) {
	var p = $("<p contenteditable=true>");
	p.addClass("para");
	p.draggable({
		grid: [20,20]
	});
	p.css({
		position: 'absolute',
		left: x,
		top:  y
	});
	p.html(text);
	$("#2").append(p);
}