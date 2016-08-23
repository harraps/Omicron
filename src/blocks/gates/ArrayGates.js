// default style for labels
var _style = {
	fontFace: "monospace",
	fontColor:       "#ffffff",
	backgroundColor: "#b4b4b4",
	borderColor:     "#ffffff",
};

/**
Array Length Block return the length of the array
@class ArrayLength
*/
class ArrayLength extends Block {
	constructor(position, orientation){
		super("Array Length", position, orientation, ArrayLength.options);
		this.labels[0].material = ArrayLength.label;
	}

	getValue(){
		var array = this.inputs[0].value;
		if(array != null) return array.length;
		return null;
	}
}
OMICRON.ArrayLength = ArrayLength;
ArrayLength.options = {
	meshes:  [_mesh],
	inputs:  [{type: "array" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ArrayLength.label = OMICRON.createLabel("Array Length", _style);

/**
Abstract class which implement the method get value
@class JoinToArray
*/
class JoinToArray extends Block {
	getValue(){
		var array = [];
		for(var i=0; i<this.inputs.length; ++i){
			var value = this.inputs[i].value;
			if(value != null){
				array[array.length] = value;
			}
		}
		return array;
	}
}
OMICRON.JoinToArray = JoinToArray;

/**
Create a array of boolean
@class JoinBooleans
*/
class JoinBooleans extends JoinToArray {
	constructor(position, orientation){
		super("Join Booleans", position, orientation, JoinBooleans.options);
		this.labels[0].material = JoinBooleans.label;
	}
}
OMICRON.JoinBooleans = JoinBooleans;
JoinBooleans.options = {
	meshes:  [_mesh],
	defaultType: "boolean",
	inputs:  _multipleInPins,
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
JoinBooleans.label = OMICRON.createLabel("Join Booleans", _style);

/**
Create a array of numbers
@class JoinNumbers
*/
class JoinNumbers extends JoinToArray {
	constructor(position, orientation){
		super("Join Numbers", position, orientation, JoinNumbers.options);
		this.labels[0].material = JoinNumbers.label;
	}
}
OMICRON.JoinNumbers = JoinNumbers;
JoinNumbers.options = {
	meshes:  [_mesh],
	defaultType: "number",
	inputs:  _multipleInPins,
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
JoinNumbers.label = OMICRON.createLabel("Join Numbers", _style);

/**
Create a array of strings
@class JoinStrings
*/
class JoinStrings extends JoinToArray {
	constructor(position, orientation){
		super("Join Strings", position, orientation, JoinStrings.options);
		this.labels[0].material = JoinStrings.label;
	}
}
OMICRON.JoinStrings = JoinStrings;
JoinStrings.options = {
	meshes:  [_mesh],
	defaultType: "string",
	inputs:  _multipleInPins,
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
JoinStrings.label = OMICRON.createLabel("Join Strings", _style);

// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator
