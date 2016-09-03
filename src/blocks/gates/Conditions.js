/**
Abstract class to return the value based on the boolean
@class IfCondition
*/
class IfCondition extends Block {
	getValue(){
		if(this.inputs[0].value){
			return this.inputs[1].value;
		}else{
			return this.inputs[2].value;
		}
	}
}

/**
Return the boolean based on the condition
@class IfBooleans
*/
class IfBooleans extends IfCondition {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.IfBooleans = IfBooleans;
IfBooleans.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "boolean", position:{x: 0  , y:-0.36, z:-0.4}}, // condition
		{type: "boolean", position:{x:-0.3, y:-0.36, z:-0.4}}, // result 1
		{type: "boolean", position:{x: 0.3, y:-0.36, z:-0.4}}, // result 2
	],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
IfBooleans.className = "IfBooleans";
IfBooleans.blockName = "If Booleans";
IfBooleans.label = OMICRON.createLabel("If-Else", _style_boolean);

/**
Return the number based on the condition
@class IfNumbers
*/
class IfNumbers extends IfCondition {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.IfNumbers = IfNumbers;
IfNumbers.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "boolean", position:{x: 0  , y:-0.36, z:-0.4}}, // condition
		{type: "number" , position:{x:-0.3, y:-0.36, z:-0.4}}, // result 1
		{type: "number" , position:{x: 0.3, y:-0.36, z:-0.4}}, // result 2
	],
	outputs: [{type: "number", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
IfNumbers.className = "IfNumbers";
IfNumbers.blockName = "If Numbers";
IfNumbers.label = OMICRON.createLabel("If-Else", _style_number);

/**
Return the string based on the condition
@class IfStrings
*/
class IfStrings extends IfCondition {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.IfStrings = IfStrings;
IfStrings.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "boolean", position:{x: 0  , y:-0.36, z:-0.4}}, // condition
		{type: "string" , position:{x:-0.3, y:-0.36, z:-0.4}}, // result 1
		{type: "string" , position:{x: 0.3, y:-0.36, z:-0.4}}, // result 2
	],
	outputs: [{type: "string", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
IfStrings.className = "IfStrings";
IfStrings.blockName = "If Strings";
IfStrings.label = OMICRON.createLabel("If-Else", _style_string);

/**
Return the string based on the condition
@class IfArrays
*/
class IfArrays extends IfCondition {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.IfArrays = IfArrays;
IfArrays.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "boolean", position:{x: 0  , y:-0.36, z:-0.4}}, // condition
		{type: "array"  , position:{x:-0.3, y:-0.36, z:-0.4}}, // result 1
		{type: "array"  , position:{x: 0.3, y:-0.36, z:-0.4}}, // result 2
	],
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
IfArrays.className = "IfArrays";
IfArrays.blockName = "If Arrays";
IfArrays.label = OMICRON.createLabel("If-Else", _style_array);

/**
Return the string based on the condition
@class IfColors
*/
class IfColors extends IfCondition {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.IfColors = IfColors;
IfColors.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "boolean", position:{x: 0  , y:-0.36, z:-0.4}}, // condition
		{type: "color"  , position:{x:-0.3, y:-0.36, z:-0.4}}, // result 1
		{type: "color"  , position:{x: 0.3, y:-0.36, z:-0.4}}, // result 2
	],
	outputs: [{type: "color", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
IfColors.className = "IfColors";
IfColors.blockName = "If Colors";
IfColors.label = OMICRON.createLabel("If-Else", _style_array);
