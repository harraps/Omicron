
/**
@method createLabelMaterial
create a
*/
OMICRON.createLabel = function(text, params){
	if(typeof text !== "string") throw new Error("given text is not string !");
	params = params || {};
	var ftFace  = params.fontFace  || "Arial",
			ftSize  = params.fontSize  || 18,
			ftStyle = params.fontStyle || "Bold",
			ftColor = params.fontColor       || "#ffffff",
			bgColor = params.backgroundColor || null,
			bdColor = params.borderColor     || null,
			bdThickness = params.borderThickness || 4,
			round = params.roundness || 6;
	// we create a canvas to draw our sprite
	var canvas  = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = ftStyle+" "+ftSize+"px "+ftFace;

	// get size of data
	var metrics = context.measureText(text);
	var width = metrics.width, height = metrics.height;

	// if alpha of background or border is not null
	if(bgColor || bdColor){
		// draw the rectangle
		context.fillStyle   = bgColor || "rgba(0,0,0,0)"; // background color
		context.strokeStyle = bdColor || "rgba(0,0,0,0)"; // border color
		context.linewidth = bdThickness;
		var offset = bdThickness*0.5;
		// 1.4 is extra height factor for text below baseline: g,j,p,q.
		roundRect( context, offset, offset,
			width + bdThickness, ftSize * 1.4 + bdThickness, round );
	}

	// draw the text
	context.fillStyle = createColorStyle(ftColor); // text color
	context.fillText( text, bdThickness, ftSize + bdThickness );

	// use the canvas for a texture
	var texture = new THREE.Texture(canvas);
	texture.needsUpdate = true;

	// we create a new material
	var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r){
  ctx.beginPath();
  ctx.moveTo(x+r, y);
  ctx.lineTo(x+w-r, y);
  ctx.quadraticCurveTo(x+w, y, x+w, y+r);
  ctx.lineTo(x+w, y+h-r);
  ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
  ctx.lineTo(x+r, y+h);
  ctx.quadraticCurveTo(x, y+h, x, y+h-r);
  ctx.lineTo(x, y+r);
  ctx.quadraticCurveTo(x, y, x+r, y);
  ctx.closePath();
  ctx.fill();
	ctx.stroke();
}
