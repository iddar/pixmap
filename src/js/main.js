var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

var colors = ["000000","ababab","6a6a6a"];
var colorSet = 2;

function colorChange(value){
	colorSet = value;
	clickX = [];
	clickY = [];
	clickDrag = [];
}

function addClick(x, y, dragging)
{
	clickX.push(x);
	clickY.push(y);
	clickDrag.push(dragging);
}

function redraw(){
	canvas.width = canvas.width; // Clears the canvas


	context.fillStyle = "rgb(255,255,255)"; //Le coloco fondo Blanco
	context.fillRect (0, 0, canvas.width, canvas.height);

	context.strokeStyle = "#" + colors[colorSet];
	context.lineJoin = "round";
	context.lineWidth = 8;

	for(var i=0; i < clickX.length; i++) {		
		context.beginPath();
		
		if(clickDrag[i] && i){
			context.moveTo(clickX[i-1], clickY[i-1]);
		}else{
			context.moveTo(clickX[i]-1, clickY[i]);
		}

		context.lineTo(clickX[i], clickY[i]);
		context.closePath();
		context.stroke();
	}
}

canvasWidth = 640;
canvasHeight = 400;

function createCanvas(){
	var canvasDiv = document.getElementById('canvasDiv');
	canvas = document.createElement('canvas');
	canvas.setAttribute('width', canvasWidth);
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('id', 'paint');
	canvasDiv.appendChild(canvas);
	if(typeof G_vmlCanvasManager != 'undefined') {
		canvas = G_vmlCanvasManager.initElement(canvas);
	}
	context = canvas.getContext("2d");
}

jQuery(document).ready(function(){

	createCanvas();

	$("#new").click( function(){
		
		clickX = [];
		clickY = [];
		clickDrag = [];
		context.clearRect(0, 0, canvasWidth, canvasHeight);

	} );

	$('#paint').mousedown(function(e){
		var mouseX = e.pageX - this.offsetLeft;
		var mouseY = e.pageY - this.offsetTop;
			
		paint = true;
		addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		redraw();
	});

	$('#paint').mousemove(function(e){
		if(paint){
			addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
			redraw();
		}
	});

	$('#paint').mouseup(function(e){
		paint = false;
		var canvas = document.getElementById("paint");
		var img    = canvas.toDataURL("image/png");
		$("a.link").attr("href", img.replace('image/png', 'image/octet-stream'));
	});

})