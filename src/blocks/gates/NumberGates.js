// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number

// default 1 input, 1 output
var _default_1 = {
	meshes:  [_mesh],
	inputs:  [{type: "number", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};

// default 2 inputs, 1 output
var _default_2 = {
	meshes:  [_mesh],
	inputs:  [
		{type: "number", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "number", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "number", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};

/**
Sign Unit Block with one input and one output
@class SignUnit
*/
class SignUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		var state = this.mod+1;
		if(state > 3) state = 0;
		this.setState(state);
	}
}
OMICRON.SignUnit = SignUnit;
SignUnit.options = _default_1;
SignUnit.className = "SignUnit";
SignUnit.blockName = "Sign";
var _f = SignUnit._f = []; // functions list
var _l = SignUnit._l = []; //    labels list
_f[0] = function(value){ return 0+value; };
_f[1] = function(value){ return 0-value; };
_f[2] = Math.abs;
_f[3] = function(value){ return -Math.abs(value); };
_l[0] = OMICRON.createLabel(  "x" , _style_number);
_l[1] = OMICRON.createLabel( "-x" , _style_number);
_l[2] = OMICRON.createLabel( "|x|", _style_number);
_l[3] = OMICRON.createLabel("-|x|", _style_number);

/**
Operator Unit Block with two inputs and one output
@class OperatorUnit
*/
class OperatorUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		var state = this.mod+1;
		if(state > 4) state = 0;
		this.setState(state);
	}

}
OMICRON.OperatorUnit = OperatorUnit;
OperatorUnit.options = _default_2;
OperatorUnit.className = "OperatorUnit";
OperatorUnit.blockName = "Operator";
var _f = OperatorUnit._f = []; // functions list
var _l = OperatorUnit._l = []; //    labels list
_f[0] = function(a, b){ return a + b; };
_f[1] = function(a, b){ return a - b; };
_f[2] = function(a, b){ return a * b; };
_f[3] = function(a, b){ return a / b; };
_f[4] = function(a, b){ return a % b; };
_l[0] = OMICRON.createLabel("+"  , _style_number);
_l[1] = OMICRON.createLabel("-"  , _style_number);
_l[2] = OMICRON.createLabel("×"  , _style_number);
_l[3] = OMICRON.createLabel("÷"  , _style_number);
_l[4] = OMICRON.createLabel("MOD", _style_number);

/**
Comparator Unit with two inputs and one output
@class ComparatorUnit
*/
class ComparatorUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		var state = this.mod+1;
		if(state > 5) state = 0;
		this.setState(state);
	}

}
OMICRON.ComparatorUnit = ComparatorUnit;
ComparatorUnit.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "number", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "number", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ComparatorUnit.className = "ComparatorUnit";
ComparatorUnit.blockName = "Comparator";
var _f = ComparatorUnit._f = []; // functions list
var _l = ComparatorUnit._l = []; //    labels list
_f[0] = function(a, b){ return a == b; };
_f[1] = function(a, b){ return a != b; };
_f[2] = function(a, b){ return a <= b; };
_f[3] = function(a, b){ return a <  b; };
_f[4] = function(a, b){ return a >= b; };
_f[5] = function(a, b){ return a >  b; };
_l[0] = OMICRON.createLabel("=", _style_number);
_l[1] = OMICRON.createLabel("≠", _style_number);
_l[2] = OMICRON.createLabel("≤", _style_number);
_l[3] = OMICRON.createLabel("<", _style_number);
_l[4] = OMICRON.createLabel("≥", _style_number);
_l[5] = OMICRON.createLabel(">", _style_number);

/**
Binary Unit Block with one input and one output
@class BinaryUnit
*/
class BinaryUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.BinaryUnit = BinaryUnit;
BinaryUnit.options = _default_1;
BinaryUnit.className = "BinaryUnit";
BinaryUnit.blockName = "Binary";
var _f = BinaryUnit._f = []; // functions list
var _l = BinaryUnit._l = []; //    labels list
_f[false] = function(value){ return 0|value; }; // convert to integer
_f[true ] = function(value){ return  ~value; }; // reverse bits
_l[false] = OMICRON.createLabel("buf", _style_number);
_l[true ] = OMICRON.createLabel("not", _style_number);

/**
Bitwise Unit Block with two inputs and one output
@class BitwiseUnit
*/
class BitwiseUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		var state = this.mod+1;
		if(state > 5) state = 0;
		this.setState(state);
	}

}
OMICRON.BitwiseUnit = BitwiseUnit;
BitwiseUnit.options = _default_2;
BitwiseUnit.className = "BitwiseUnit";
BitwiseUnit.blockName = "Bitwise";
var _f = BitwiseUnit._f = []; // functions list
var _l = BitwiseUnit._l = []; //    labels list
_f[0] = function(a, b){ return   a & b ; };
_f[1] = function(a, b){ return   a | b ; };
_f[2] = function(a, b){ return   a ^ b ; };
_f[3] = function(a, b){ return ~(a & b); };
_f[4] = function(a, b){ return ~(a | b); };
_f[5] = function(a, b){ return ~(a ^ b); };
_l[0] = OMICRON.createLabel("and" , _style_number);
_l[1] = OMICRON.createLabel("or"  , _style_number);
_l[2] = OMICRON.createLabel("xor" , _style_number);
_l[3] = OMICRON.createLabel("nand", _style_number);
_l[4] = OMICRON.createLabel("nor" , _style_number);
_l[5] = OMICRON.createLabel("xnor", _style_number);

/**
Binary Shift Block with two inputs and one output
@class BinaryShift
*/
class BinaryShift extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		var state = this.mod+1;
		if(state > 2) state = 0;
		this.setState(state);
	}

}
OMICRON.BinaryShift = BinaryShift;
BinaryShift.options = _default_2;
BinaryShift.className = "BinaryShift";
BinaryShift.blockName = "Binary Shift";
var _f = BinaryShift._f = []; // functions list
var _l = BinaryShift._l = []; //    labels list
_f[0] = function(a, b){ return a <<  b; };
_f[1] = function(a, b){ return a >>  b; };
_f[2] = function(a, b){ return a >>> b; };
_l[0] = OMICRON.createLabel("Left Shift"    , _style_number);
_l[1] = OMICRON.createLabel("Right Shift"   , _style_number);
_l[2] = OMICRON.createLabel("0-fill R-Shift", _style_number);

/**
Round Unit Block with one input and one output
@class RoundUnit
*/
class RoundUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		var state = this.mod+1;
		if(state > 2) state = 0;
		this.setState(state);
	}
}
OMICRON.RoundUnit = RoundUnit;
RoundUnit.options = _default_1;
RoundUnit.className = "RoundUnit";
RoundUnit.blockName = "Round";
var _f = RoundUnit._f = []; // functions list
var _l = RoundUnit._l = []; //    labels list
_f[0] = Math.round;
_f[1] = Math.floor;
_f[2] = Math.ceil ;
_l[0] = OMICRON.createLabel("≈↕", _style_number);
_l[1] = OMICRON.createLabel("≈↓", _style_number);
_l[2] = OMICRON.createLabel("≈↑", _style_number);

/**
Trigonometry Unit Block with one input and one output
@class TrigonometryUnit
*/
class TrigonometryUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		var state = this.mod+1;
		if(state > 5) state = 0;
		this.setState(state);
	}
}
OMICRON.TrigonometryUnit = TrigonometryUnit;
TrigonometryUnit.options = _default_1;
TrigonometryUnit.className = "TrigonometryUnit";
TrigonometryUnit.blockName = "Trigonometry";
var _f = TrigonometryUnit._f = [];
var _l = TrigonometryUnit._l = [];
_f[0] = Math.sin ;
_f[1] = Math.cos ;
_f[2] = Math.tan ;
_f[3] = Math.asin;
_f[4] = Math.acos;
_f[5] = Math.atan;
_l[0] = OMICRON.createLabel( "SIN", _style_number);
_l[1] = OMICRON.createLabel( "COS", _style_number);
_l[2] = OMICRON.createLabel( "TAN", _style_number);
_l[3] = OMICRON.createLabel("ASIN", _style_number);
_l[4] = OMICRON.createLabel("ACOS", _style_number);
_l[5] = OMICRON.createLabel("ATAN", _style_number);

/**
Trigonometry Unit Block with two inputs and one output
@class ATAN2_Unit
*/
class ATAN2_Unit extends Block {
	constructor(position, orientation){
		super(this.__proto__,	position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		//atan2(y, x) -> y and x are reversed
		return Math.atan2(this.inputs[1].value, this.inputs[0].value);
	}
}
OMICRON.ATAN2_Unit = ATAN2_Unit;
ATAN2_Unit.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "number", position:{x:0, y:-0.36, z:-0.2}}, // X
		{type: "number", position:{x:0, y:-0.36, z:-0.4}}, // Y
	],
	outputs: [{type: "number", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
ATAN2_Unit.className = "ATAN2_Unit";
ATAN2_Unit.blockName = "ArcTangent";
ATAN2_Unit.label = OMICRON.createLabel("<ATAN>", _style_number);

/**
Power Unit Block with two inputs and one output
@class PowerUnit
*/
class PowerUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		return this.fun(this.inputs[0].value, this.inputs[1].value);
	}

	interact(){
		this.setState(!this.mod);
	}

}
OMICRON.PowerUnit = PowerUnit;
PowerUnit.options = _default_2;
PowerUnit.className = "PowerUnit";
PowerUnit.blockName = "Power";
var _f = PowerUnit._f = []; // functions list
var _l = PowerUnit._l = []; //    labels list
_f[false] = Math.pow;
_f[true ] = function(x, n){ return Math.pow(x, 1/n); };
_l[false] = OMICRON.createLabel("xⁿ" , _style_number);
_l[true ] = OMICRON.createLabel("ⁿ√x", _style_number);

/**
Square Unit Block with one input and one output
@class SquareUnit
*/
class SquareUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		return this.fun(this.inputs[0].value);
	}

	interact(){
		this.setState(!this.mod);
	}

}
OMICRON.SquareUnit = SquareUnit;
SquareUnit.options = _default_2;
SquareUnit.className = "SquareUnit";
SquareUnit.blockName = "Square";
var _f = SquareUnit._f = []; // functions list
var _l = SquareUnit._l = []; //    labels list
_f[false] = function(x){ return x*x; };
_f[true ] = Math.sqrt;
_l[false] = OMICRON.createLabel("x²", _style_number);
_l[true ] = OMICRON.createLabel("√x", _style_number);

/**
Distribution Unit Block allow to get data about a array of number
@class DistributionUnit
*/
class DistributionUnit extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	getValue(){
		var args = [];
		for(var i=0; i<this.inputs.length; ++i){
			var value = this.inputs[i].value;
			// add only if type number
			if(typeof value === "number") args[args.length] = value;
		}
		// pass the array to the function
		return this.fun(args);
	}

	interact(){
		var state = this.mod+1;
		if(state > 6) state = 0;
		this.setState(state);
	}
}
OMICRON.DistributionUnit = DistributionUnit;
DistributionUnit.options = {
	meshes:  [_mesh],
	inputs:  [{type: "array" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
DistributionUnit.className = "DistributionUnit";
DistributionUnit.blockName = "Distribution";
// function to quicksort an array
DistributionUnit.split = function(array, x, ref){
	do{ // do left and right scan until pointers cross
		while(array[ref.i] < x) ++ref.i; // scan from left
		while(array[ref.j] > x) --ref.j; // scan from right
		// then swap values if they are in the wrong part
		if(ref.i <= ref.j){
			var t = array[ref.i];
			array[ref.i] = array[ref.j];
			array[ref.j] = t;
			++ref.i;
			--ref.j;
		}
	}while(ref.i <= ref.j);
};
// function to get percentiles of an array
DistributionUnit.percentiles = function(array, k){
	var l = 0, r = array.length - 1;
	var k *= array.length; // 1/2 -> median
	var ref = { i, j };
	while( l < r ){
		ref.i = l;
		ref.j = r;
		DistributionGate.split(array, x, ref);
		if( ref.j < k ) l = ref.i;
		if( ref.i > k ) r = ref.j;
	}
	// if l=6 and r=5 -> 5.5
	return (array[l] + array[r]) * 0.5;
};
var _f = DistributionUnit._f = []; // functions list
var _l = DistributionUnit._l = []; //    labels list
_f[0] = function(array){ // Average
	var result = 0;
	for(var i=0; i<array.length; ++i)
		result += array[i];
	return result / array.length;
};
_f[1] = function(a){ return Math.min(...a); }; // Minimum
_f[2] = function(a){ return Math.max(...a); }; // Maximum
_f[3] = function(a){ return DistributionUnit.percentiles(a, 0.5 ); };
_f[4] = function(a){ return DistributionUnit.percentiles(a, 0.25); };
_f[5] = function(a){ return DistributionUnit.percentiles(a, 0.75); };
_f[6] = function(array){
	var q1 = DistributionUnit.percentiles(array, 0.25),
			q2 = DistributionUnit.percentiles(array, 0.75);
	return q2 - q1;
};
_l[0] = OMICRON.createLabel("Average"      , _style_number);
_l[1] = OMICRON.createLabel("Minimum"      , _style_number);
_l[2] = OMICRON.createLabel("Maximum"      , _style_number);
_l[3] = OMICRON.createLabel("Median"       , _style_number);
_l[4] = OMICRON.createLabel("1st Quartile" , _style_number);
_l[5] = OMICRON.createLabel("2nd Quartile" , _style_number);
_l[6] = OMICRON.createLabel("Interquartile", _style_number);

/**
Convert a number into a hexadecimal sequence
@class Hexadecimal
*/
class Hexadecimal extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var value = this.inputs[0].value;
		if(typeof value === "number"){
			return value.toString(16);
		}
		return null;
	}
}
OMICRON.Hexadecimal = Hexadecimal;
Hexadecimal.options = {
	meshes:  [_mesh],
	inputs:  [{type: "number", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "string", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
};
Hexadecimal.className = "Hexadecimal";
Hexadecimal.blockName = "Hexadecimal";
Hexadecimal.label = OMICRON.createLabel("Hexadecimal", _style_number);

/**
Convert a hexadecimal sequence into a number
@class Decimal
*/
class Decimal extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var value = this.inputs[0].value;
		if(typeof value === "string"){
			return parseInt(str, 16);
		}
		return null;
	}
}
OMICRON.Decimal = Decimal;
Decimal.options = {
	meshes:  [_mesh],
	inputs:  [{type: "string", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
};
Decimal.className = "Decimal";
Decimal.blockName = "Decimal";
Decimal.label = OMICRON.createLabel("Decimal", _style_number);
