// http://threejs.org/docs/#Reference/Math/Color
// https://github.com/mrdoob/three.js/blob/master/src/math/Color.js

/**
Return true if the colors are the same
@class ComparatorColor
*/
class ComparatorColor extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		var color1 = this.inputs[0].value,
				color2 = this.inputs[1].value;
		if(color1 instanceof THREE.Color
		&& color2 instanceof THREE.Color){
			return this.fun(color1, color2);
		}
		return false;
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.ComparatorColor = ComparatorColor;
ComparatorColor.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "color", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "color", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ComparatorColor.className = "ComparatorColor";
ComparatorColor.blockName = "Comparator Color";
var _f = ComparatorColor._f = [];
var _l = ComparatorColor._l = [];
_f[false] = function(a,b){ return  a.equals(b); };
_f[true ] = function(a,b){ return !a.equals(b); };
_l[false] = OMICRON.createLabel("Equals"   , _style_color);
_l[true ] = OMICRON.createLabel("Different", _style_color);

/**
Convert a number into a color
@class ColorFromNumber
*/
class ColorFromNumber extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		return this.fun(0+this.inputs[0].value);
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.ColorFromNumber = ColorFromNumber;
ColorFromNumber.options = {
	meshes:  [_mesh],
	inputs:  [{type: "number", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "color" , position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ColorFromNumber.className = "ColorFromNumber";
ColorFromNumber.blockName = "Color From Number";
var _f = ColorFromNumber._f = []; // functions list
var _l = ColorFromNumber._l = []; //    labels list
_f[false] = function(n){ return new THREE.Color(n);             }; // Integer
_f[true ] = function(n){ return new THREE.Color().setScalar(n); }; // Scalar
_l[false] = OMICRON.createLabel("Integer", _style_color);
_l[true ] = OMICRON.createLabel("Scalar" , _style_color);

/**
Convert 3 channels into a color
@class ColorFromChannels
*/
class ColorFromChannels extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		this.fun(
			0+this.inputs[0].value,
			0+this.inputs[1].value,
			0+this.inputs[2].value
		);
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.ColorFromChannels = ColorFromChannels;
ColorFromChannels.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "number", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "number", position:{x: 0  , y:-0.36, z:-0.4}},
		{type: "number", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "color" , position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ColorFromChannels.className = "ColorFromChannels";
ColorFromChannels.blockName = "Color From Channels";
var _f = ColorFromChannels._f = []; // functions list
var _l = ColorFromChannels._l = []; //    labels list
_f[false] = function(a,b,c){ return new THREE.Color(a,b,c);          }; // RGB
_f[true ] = function(a,b,c){ return new THREE.Color().setHSL(a,b,c); }; // HSL
_l[false] = OMICRON.createLabel("RGB", _style_color);
_l[true ] = OMICRON.createLabel("HSL", _style_color);

/**
Convert string into a color
@class ColorFromString
*/
class ColorFromString extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		return new THREE.Color(this.inputs[0].value);
	}
}
OMICRON.ColorFromString = ColorFromString;
ColorFromString.options = {
	meshes:  [_mesh],
	inputs:  [{type: "string", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "color" , position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
};
ColorFromString.className = "ColorFromString";
ColorFromString.blockName = "Color From String";
ColorFromString.label = OMICRON.createLabel("Color String", _style_color);

/**
Get Integer from color
@class ColorToInteger
*/
class ColorToInteger extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var color = this.inputs[0].value;
		if(color instanceof THREE.Color){
			return color.getHex();
		}
		return null;
	}
}
OMICRON.ColorToInteger = ColorToInteger;
ColorToInteger.options = {
	meshes:  [_mesh],
	inputs:  [{type: "color" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
};
ColorToInteger.className = "ColorToInteger";
ColorToInteger.blockName = "Color To Integer";
ColorToInteger.label = OMICRON.createLabel("Color Integer", _style_color);

/**
Color to Channels
@class ColorToChannels
*/
class ColorToChannels extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
		this.value = null; // contains 3 values
	}

	update(){
		var color = this.inputs[0].value;
		if(color instanceof THREE.Color){
			this.value = this.fun(color);
		}else{
			this.value = null;
		}
	}

	getValue(outpin){
		var index = this.outputs.indexOf(outpin);
		if(-1 < index && index < 3 && this.value != null){
			return this.value[index];
		}
		return null;
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.ColorToChannels = ColorToChannels;
ColorToChannels.options = {
	meshes:  [_mesh],
	inputs:  [{type: "color", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [
		{type: "number", position:{x:-0.3, y:-0.36, z: 0.4}},
		{type: "number", position:{x: 0  , y:-0.36, z: 0.4}},
		{type: "number", position:{x: 0.3, y:-0.36, z: 0.4}},
	],
	labels:  [_label],
	interactibles: [_interactible],
};
ColorToChannels.className = "ColorToChannels";
ColorToChannels.blockName = "Color To Channels";
var _f = ColorToChannels._f = []; // functions list
var _l = ColorToChannels._l = []; //    labels list
_f[false] = function(c){                 return [c.r, c.g, c.b]; }; // RGB
_f[true ] = function(c){ c = c.getHSL(); return [c.h, c.s, c.l]; }; // HSL
_l[false] = OMICRON.createLabel("RGB", _style_color);
_l[true ] = OMICRON.createLabel("HSL", _style_color);

/**
Get style from color
@class ColorToStyle
*/
class ColorToStyle extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		var color = this.inputs[0].value;
		return this.fun(color);
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.ColorToStyle = ColorToStyle;
ColorToStyle.options = {
	meshes:  [_mesh],
	inputs:  [{type: "color" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "string", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ColorToStyle.className = "ColorToStyle";
ColorToStyle.blockName = "Color To Style";
var _f = ColorToStyle._f = []; // functions list
var _l = ColorToStyle._l = []; //    labels list
_f[false] = function(color){ return color.getHexString(); };
_f[true ] = function(color){ return color.getStyle    (); };
_l[false] = OMICRON.createLabel("Hexa" , _style_color);
_l[true ] = OMICRON.createLabel("Style", _style_color);

/**
Add colors based on RGB values
@class OperatorColor
*/
class OperatorColor extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		var color1 = this.inputs[0].value,
				color2 = this.inputs[1].value;
		// if both values are colors
		if(color1 instanceof THREE.Color
		&& color2 instanceof THREE.Color){
			// we don't want to overwrite the value of the input
			color1 = color1.clone();
			return this.fun(color1, color2);
		}
		return null;
	}

	interact(){
		var state = this.mod+1;
		if(state > 2) state = 0;
		this.setState(state);
	}
}
OMICRON.OperatorColor = OperatorColor;
OperatorColor.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "color", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "color", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "color", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
OperatorColor.className = "OperatorColor";
OperatorColor.blockName = "Operator Color";
var _f = OperatorColor._f = []; // functions list
var _l = OperatorColor._l = []; //    labels list
_f[0] = function(a,b){ return a.add     (b); };
_f[1] = function(a,b){ return a.sub     (b); };
_f[2] = function(a,b){ return a.multiply(b); };
_l[0] = OMICRON.createLabel("Additive" , _style_color);
_l[1] = OMICRON.createLabel("Substract", _style_color);
_l[2] = OMICRON.createLabel("Multiply" , _style_color);

/**
Add colors based on a scalar
@class ScalarColor
*/
class ScalarColor extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		var color1 = this.inputs[0].value,
				color2 = this.inputs[1].value;
		// if both values are colors
		if(color1 instanceof THREE.Color
		&& color2 instanceof THREE.Color){
			// we don't want to overwrite the value of the input
			color1 = color1.clone();
			return this.fun(color1, color2);
		}
		return null;
	}

	interact(){
		var state = this.mod+1;
		if(state > 2) state = 0;
		this.setState(state);
	}
}
OMICRON.ScalarColor = ScalarColor;
ScalarColor.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "color", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "color", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "color", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ScalarColor.className = "ScalarColor";
ScalarColor.blockName = "Scalar Color";
var _f = ScalarColor._f = []; // functions list
var _l = ScalarColor._l = []; //    labels list
_f[0] = function(c,n){ return c.addScalar      (n); };
_f[1] = function(c,n){ return c.sub({r:n,g:n,b:n}); };
_f[2] = function(c,n){ return c.multiplyScalar (n); };
_l[0] = OMICRON.createLabel("Additive" , _style_color);
_l[1] = OMICRON.createLabel("Substract", _style_color);
_l[2] = OMICRON.createLabel("Multiply" , _style_color);

/**
Offset HSL to change a color based on the hue, saturation and light
@class OffsetHSL
*/
class OffsetHSL extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var color = this.inputs[0].value;
		if(color instanceof THREE.Color){
			// we don't want to overwrite the value of the input
			color = color.clone();
			return color.offsetHSL(
				this.inputs[1].value, // H
				this.inputs[2].value, // S
				this.inputs[3].value  // L
			);
		}
		return null;
	}
}
OMICRON.OffsetHSL = OffsetHSL;
OffsetHSL.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "color" , position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "number", position:{x: 0.2, y:-0.36, z:-0.4}},
		{type: "number", position:{x: 0.3, y:-0.36, z:-0.4}},
		{type: "number", position:{x: 0.4, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "color", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
OffsetHSL.className = "OffsetHSL";
OffsetHSL.blockName = "Offset HSL";
OffsetHSL.label = OMICRON.createLabel("Offset HSL", _style_color);

/**
Lerp from one color to the other
@class LerpColor
*/
class LerpColor extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var color1 = this.inputs[1].value,
				color2 = this.inputs[2].value;
		if(color1 instanceof THREE.Color
		&& color2 instanceof THREE.Color){
			// we don't want to overwrite the value of the input
			color1 = color1.clone();
			return color1.lerp(color2, this.inputs[0].value);
		}
		return null;
	}
}
OMICRON.LerpColor = LerpColor;
LerpColor.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "number", position:{x: 0  , y:-0.36, z:-0.4}},
		{type: "color" , position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "color" , position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "color", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
OffsetHSL.className = "LerpColor";
OffsetHSL.blockName = "Lerp Color";
OffsetHSL.label = OMICRON.createLabel("Lerp", _style_color);

/**
Convert from Gamma to Linear and the opposite
@class GammaLinear
*/
class GammaLinear extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		var color = this.inputs[0].value;
		if(color instanceof THREE.Color){
			color = color.clone();
			return this.fun(color);
		}
		return null;
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.GammaLinear = GammaLinear;
GammaLinear.options = {
	meshes:  [_mesh],
	inputs:  [{type: "color", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "color", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
GammaLinear.className = "GammaLinear";
GammaLinear.blockName = "Convert Gamma/Linear";
var _f = GammaLinear._f = [];
var _l = GammaLinear._l = [];
_f[false] = function(color){ return color.convertGammaToLinear(); };
_f[true ] = function(color){ return color.convertLinearToGamma(); };
_l[false] = OMICRON.createLabel("Gamma to Linear", _style_color);
_l[true ] = OMICRON.createLabel("Linear to Gamma", _style_color);
