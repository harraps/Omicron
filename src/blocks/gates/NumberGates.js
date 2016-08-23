// default style for labels
var _style = {
	fontFace: "monospace",
	fontColor:       "#ffffff",
	backgroundColor: "#0000b4",
	borderColor:     "#ffffff",
};

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
Sign Gate Block with one input and one output
@class SignGate
*/
class SignGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, SignGate.options);

		// default state of the block
		this.mod = 0;
		this.fun = SignGate._f[0];
		this.labels[0].material = SignGate._l[0];
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		++this.mod;
		if(this.mod > 3) this.mod = 0;
		this.fun = SignGate._f[this.mod];
		// update the label
		this.labels[0].material = SignGate._l[this.mod];
	}
}
OMICRON.SignGate = SignGate;
SignGate.options = _default_1;
var _f = SignGate._f = []; // functions list
var _l = SignGate._l = []; //    labels list
_f[0] = function(value){ return 0+value; };
_f[1] = function(value){ return 0-value; };
_f[2] = Math.abs;
_f[3] = function(value){ return -Math.abs(value); };
_l[0] = OMICRON.createLabel(  "x" , _style);
_l[1] = OMICRON.createLabel( "-x" , _style);
_l[2] = OMICRON.createLabel( "|x|", _style);
_l[3] = OMICRON.createLabel("-|x|", _style);

/**
Operator Gate Block with two inputs and one output
@class OperatorGate
*/
class OperatorGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, OperatorGate.options);

		// default state of the block
		this.mod = 0;
		this.fun = OperatorGate._f[0];
		this.labels[0].material = OperatorGate._l[0];
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		++this.mod
		if(this.mod > 4) this.mod = 0;
		this.fun = OperatorGate._f[this.mod];
		// update the label
		this.labels[0].material = OperatorGate._f[this.mod];
	}

}
OMICRON.OperatorGate = OperatorGate;
OperatorGate.options = _default_2;
var _f = OperatorGate._f = []; // functions list
var _l = OperatorGate._l = []; //    labels list
_f[0] = function(a, b){ return a + b; };
_f[1] = function(a, b){ return a - b; };
_f[2] = function(a, b){ return a * b; };
_f[3] = function(a, b){ return a / b; };
_f[4] = function(a, b){ return a % b; };
_l[0] = OMICRON.createLabel("+"  , _style);
_l[1] = OMICRON.createLabel("-"  , _style);
_l[2] = OMICRON.createLabel("×"  , _style);
_l[3] = OMICRON.createLabel("÷"  , _style);
_l[4] = OMICRON.createLabel("MOD", _style);

/**
Comparator Gate with two inputs and one output
@class CompareGate
*/
class ComparatorGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, ComparatorGate.options);

		// default state of the block
		this.mod = 0;
		this.fun = ComparatorGate._f[0];
		this.labels[0].material = ComparatorGate._l[0];
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		++this.mod
		if(this.mod > 5) this.mod = 0;
		this.fun = ComparatorGate._f[this.mod];
		// update the label
		this.labels[0].material = ComparatorGate._f[this.mod];
	}

}
OMICRON.ComparatorGate = ComparatorGate;
ComparatorGate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "number", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "number", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
var _f = ComparatorGate._f = []; // functions list
var _l = ComparatorGate._l = []; //    labels list
_f[0] = function(a, b){ return a == b; };
_f[1] = function(a, b){ return a != b; };
_f[2] = function(a, b){ return a <= b; };
_f[3] = function(a, b){ return a <  b; };
_f[4] = function(a, b){ return a >= b; };
_f[5] = function(a, b){ return a >  b; };
_l[0] = OMICRON.createLabel("=", _style);
_l[1] = OMICRON.createLabel("≠", _style);
_l[2] = OMICRON.createLabel("≤", _style);
_l[3] = OMICRON.createLabel("<", _style);
_l[4] = OMICRON.createLabel("≥", _style);
_l[5] = OMICRON.createLabel(">", _style);

/**
Round Gate Block with one input and one output
@class RoundGate
*/
class RoundGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, RoundGate.options);

		this.mod = 0;
		this.fun = RoundGate._f[0];
		this.labels[0].material = RoundGate._l[0];
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		++this.mod;
		if(this.mod > 2) this.mod = 0;
		this.fun = RoundGate._f[this.mod];
		// update the label
		this.labels[0].material = RoundGate._l[this.mod];
	}
}
OMICRON.RoundGate = RoundGate;
RoundGate.options = _default_1;
var _f = RoundGate._f = []; // functions list
var _l = RoundGate._l = []; //    labels list
_f[0] = Math.round;
_f[1] = Math.floor;
_f[2] = Math.ceil ;
_l[0] = OMICRON.createLabel("≈↕", _style);
_l[1] = OMICRON.createLabel("≈↓", _style);
_l[2] = OMICRON.createLabel("≈↑", _style);

/**
Trigonometry Gate Block with one input and one output
@class TrigonometryGate
*/
class TrigonometryGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, TrigonometryGate.options);

		this.mod = 0;
		this.fun = TrigonometryGate._f[0];
		this.labels[0].material = TrigonometryGate._l[0];
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		++this.mod;
		if(this.mod > 5) this.mod = 0;
		this.fun = TrigonometryGate._f[this.mod];
		// update the label
		this.labels[0].material = TrigonometryGate._l[this.mod];
	}
}
OMICRON.TrigonometryGate = TrigonometryGate;
TrigonometryGate.options = _default_1;
var _f = TrigonometryGate._f = [];
var _l = TrigonometryGate._l = [];
_f[0] = Math.sin ;
_f[1] = Math.cos ;
_f[2] = Math.tan ;
_f[3] = Math.asin;
_f[4] = Math.acos;
_f[5] = Math.atan;
_l[0] = OMICRON.createLabel( "SIN", _style);
_l[1] = OMICRON.createLabel( "COS", _style);
_l[2] = OMICRON.createLabel( "TAN", _style);
_l[3] = OMICRON.createLabel("ASIN", _style);
_l[4] = OMICRON.createLabel("ACOS", _style);
_l[5] = OMICRON.createLabel("ATAN", _style);

/**
Trigonometry Gate Block with two inputs and one output
@class ATAN2_Gate
*/
class ATAN2_Gate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, ATAN2_Gate.options);
		this.labels[0].material = ATAN2_Gate.label;
	}

	getValue(){
		//atan2(y, x) -> y and x are reversed
		return Math.atan2(this.inputs[1].value, this.inputs[0].value);
	}
}
OMICRON.ATAN2_Gate = ATAN2_Gate;
ATAN2_Gate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "number", position:{x:0, y:-0.36, z:-0.2}}, // X
		{type: "number", position:{x:0, y:-0.36, z:-0.4}}, // Y
	],
	outputs: [{type: "number", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
ATAN2_Gate.label = OMICRON.createLabel("<ATAN>", _style);

/**
Power Gate Block with two inputs and one output
@class PowerGate
*/
class PowerGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, PowerGate.options);

		// default state of the block
		this.mod = false;
		this.fun = PowerGate._f[false];
		this.labels[0].material = PowerGate._l[false];
	}

	getValue(){
		return this.fun(this.inputs[0].value, this.inputs[1].value);
	}

	interact(){
		this.mod = !this.mod;
		this.fun = PowerGate._f[this.mod];
		// update the label
		this.labels[0].material = PowerGate._l[this.mod];
	}

}
OMICRON.PowerGate = PowerGate;
PowerGate.options = _default_2;
var _f = PowerGate._f = []; // functions list
var _l = PowerGate._l = []; //    labels list
_f[false] = Math.pow;
_f[true ] = function(x, n){ return Math.pow(x, 1/n); };
_l[false] = OMICRON.createLabel("xⁿ" , _style);
_l[true ] = OMICRON.createLabel("ⁿ√x", _style);

/**
Square Gate Block with one input and one output
@class SquareGate
*/
class SquareGate extends Block {
	constructor(position, orientation){
		super("Square Gate", position, orientation, SquareGate.options);

		// default state of the block
		this.mod = false;
		this.fun = SquareGate._f[false];
		this.labels[0].material = SquareGate._l[false];
	}

	getValue(){
		return this.fun(this.inputs[0].value);
	}

	interact(){
		this.mod = !this.mod;
		this.fun = SquareGate._f[this.mod];
		// update the label
		this.labels[0].material = SquareGate._l[this.mod];
	}

}
OMICRON.SquareGate = SquareGate;
SquareGate.options = _default_2;
var _f = SquareGate._f = []; // functions list
var _l = SquareGate._l = []; //    labels list
_f[false] = function(x){ return x*x; };
_f[true ] = Math.sqrt;
_l[false] = OMICRON.createLabel("x²", _style);
_l[true ] = OMICRON.createLabel("√x", _style);

/**
Distribution Gate Block allow to get data about a array of number
@class DistributionGate
*/
class DistributionGate extends Block {
	constructor(position, orientation){
		super("Distribution", position, orientation, DistributionGate.options);

		// default state of the block
		this.mod = 0;
		this.fun = DistributionGate.f[0];
		this.labels[0].material = DistributionGate._l[0];
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
		++this.mod;
		if(this.mod > 6) this.mod = 0;
		this.fun = DistributionGate._l[this.mod];
		// update the label
		this.labels[0].material = DistributionGate._l[this.mod];
	}
}
OMICRON.DistributionGate = DistributionGate;
DistributionGate.options = {
	meshes:  [_mesh],
	inputs:  [{type: "array" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
// function to quicksort an array
DistributionGate.split = function(array, x, ref){
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
DistributionGate.percentiles = function(array, k){
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
var _f = DistributionGate._f = []; // functions list
var _l = DistributionGate._l = []; //    labels list
_f[0] = function(array){ // Average
	var result = 0;
	for(var i=0; i<array.length; ++i)
		result += array[i];
	return result / array.length;
};
_f[1] = function(a){ return Math.min(...a); }; // Minimum
_f[2] = function(a){ return Math.max(...a); }; // Maximum
_f[3] = function(a){ return DistributionGate.percentiles(a, 0.5 ); };
_f[4] = function(a){ return DistributionGate.percentiles(a, 0.25); };
_f[5] = function(a){ return DistributionGate.percentiles(a, 0.75); };
_f[6] = function(array){
	var q1 = DistributionGate.percentiles(array, 0.25),
			q2 = DistributionGate.percentiles(array, 0.75);
	return q2 - q1;
};
_l[0] = OMICRON.createLabel("Average"        , _style);
_l[1] = OMICRON.createLabel("Minimum"        , _style);
_l[2] = OMICRON.createLabel("Maximum"        , _style);
_l[3] = OMICRON.createLabel("Median"         , _style);
_l[4] = OMICRON.createLabel("First Quartile" , _style);
_l[5] = OMICRON.createLabel("Second Quartile", _style);
_l[6] = OMICRON.createLabel("Interquartile"  , _style);
