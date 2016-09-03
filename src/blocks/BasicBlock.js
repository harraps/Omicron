/*
Contains data to create generic blocks
*/

/**
A block which can change of function when we interact with it
@class MutableBlock
*/
class MutableBlock extends Block {
	constructor(clazz, position, orientation, options){
		super(clazz, position, orientation, options);
	}

	setState(state){
		this.mod = state;
		this.fun = this.class._f[state];
		this.labels[0].material = this.class._l[state];
	}

	// add the state of the block to the json object
	toJSON(){
		var json   = super.toJSON();
		json.state = this.mod;
		return json;
	}
}

// default mesh for blocks
var _mesh = {
	geometry: new THREE.BoxGeometry(1,0.1,1),
	material: new THREE.MeshLambertMaterial({color: 0xffcccc}),
	position: {x:0, y:-0.45, z:0},
};
// default label position
var _label = {
	position: {x:0, y:-0.25, z:0},
};
// default interaction zone
var _interactible = {
	min:      {x:-0.3, y:-0.14, z:-0.3},
	max:      {x: 0.3, y: 0.14, z: 0.3},
	position: {x: 0  , y:-0.25, z: 0  },
};

// style defined on types
var _style_boolean = {
	fontFace: "monospace",
	fontColor:       "#E84646",
	backgroundColor: "#5C1313",
	borderColor:     "#E84646",
};
var _style_number = {
	fontFace: "monospace",
	fontColor:       "#478FF5",
	backgroundColor: "#0D2445",
	borderColor:     "#478FF5",
};
var _style_string = {
	fontFace: "monospace",
	fontColor:       "#40DB67",
	backgroundColor: "#0D421A",
	borderColor:     "#40DB67",
};
var _style_array = {
	fontFace: "monospace",
	fontColor:       "#F2AC49",
	backgroundColor: "#543912",
	borderColor:     "#F2AC49",
};
var _style_color = {
	fontFace: "monospace",
	fontColor:       "#ffffff",
	backgroundColor: "#000000",
	borderColor:     "#ffffff",
};

var _switchLabels = [];
_switchLabels[false] = OMICRON.createLabel("ON" , {
	fontFace: "monospace",
	fontColor:       {r:255, g:255, b:255, a:1},
	backgroundColor: {r:255, g:106, b:  0, a:1},
	borderColor:     {r:255, g:255, b:255, a:1},
});
_switchLabels[true ] = OMICRON.createLabel("OFF", {
	fontFace: "monospace",
	fontColor:       {r:155, g:155, b:155, a:1},
	backgroundColor: {r:  0, g:  0, b:  0, a:1},
	borderColor:     {r:155, g:155, b:155, a:1},
});

var _multipleInPins = [
	//top raw
	{position:{x:-0.3, y:-0.36, z:-0.2}},
	{position:{x:-0.1, y:-0.36, z:-0.2}},
	{position:{x: 0.1, y:-0.36, z:-0.2}},
	{position:{x: 0.3, y:-0.36, z:-0.2}},
	// bottom raw
	{position:{x:-0.3, y:-0.36, z:-0.4}},
	{position:{x:-0.1, y:-0.36, z:-0.4}},
	{position:{x: 0.1, y:-0.36, z:-0.4}},
	{position:{x: 0.3, y:-0.36, z:-0.4}},
];

var _multipleOutPins = [
	//top raw
	{position:{x:-0.3, y:-0.36, z:0.4}},
	{position:{x:-0.1, y:-0.36, z:0.4}},
	{position:{x: 0.1, y:-0.36, z:0.4}},
	{position:{x: 0.3, y:-0.36, z:0.4}},
	// bottom raw
	{position:{x:-0.3, y:-0.36, z:0.2}},
	{position:{x:-0.1, y:-0.36, z:0.2}},
	{position:{x: 0.1, y:-0.36, z:0.2}},
	{position:{x: 0.3, y:-0.36, z:0.2}},
];
