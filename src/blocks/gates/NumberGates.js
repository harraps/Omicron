/**
Sign Gate Block with one input and one output
@class SignGate
*/
class SignGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = 0;
		this.fun = SignGate._f[0];

		//create the input and output
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		++this.mod;
		if(this.mod > 3) this.mod = 0;
		this.fun = SignGate._f[this.mod];
		var text = SignGate._l[this.mod];
		// set text for label
		this.labels[0].setText(text);
	}
}
var _f = SignGate._f = [];
var _l = SignGate._l = [];
_f[0] = function(value){ return 0+value; };          _l[0] =   "x" ;
_f[1] = function(value){ return 0-value; };          _l[1] =  "-x" ;
_f[2] = Math.abs;                                    _l[2] =  "|x|";
_f[3] = function(value){ return -Math.abs(value); }; _l[3] = "-|x|";

OMICRON.SignGate = SignGate;

/**
Operator Gate Block with two inputs and one output
@class OperatorGate
*/
class OperatorGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = 0;
		this.fun = OperatorGate._f[0];

		//create the inputs and output
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		++this.mod
		if(this.mod > 4) this.mod = 0;
		this.fun = OperatorGate._f[this.mod];
		var text = OperatorGate._f[this.mod];
		//set text for the label
		this.labels[0].setText(text);
	}

}
var _f = OperatorGate._f = [];
var _l = OperatorGate._l = [];
_f[0] = function(a, b){ return a + b; }; _l[0] = "+";
_f[1] = function(a, b){ return a - b; }; _l[1] = "-";
_f[2] = function(a, b){ return a * b; }; _l[2] = "×";
_f[3] = function(a, b){ return a / b; }; _l[3] = "÷";
_f[4] = function(a, b){ return a % b; }; _l[4] = "MOD";

OMICRON.OperatorGate = OperatorGate;

/**
Comparator Gate with two inputs and one output
@class CompareGate
*/
class ComparatorGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = 0;
		this.fun = ComparatorGate._f[0];

		//create the inputs and output
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		++this.mod
		if(this.mod > 5) this.mod = 0;
		this.fun = ComparatorGate._f[this.mod];
		var text = ComparatorGate._f[this.mod];
		//set text for the label
		this.labels[0].setText(text);
	}

}
var _f = ComparatorGate._f = [];
var _l = ComparatorGate._l = [];
_f[0] = function(a, b){ return a == b; }; _l[0] = "=";
_f[1] = function(a, b){ return a != b; }; _l[1] = "≠";
_f[2] = function(a, b){ return a <= b; }; _l[2] = "≤";
_f[3] = function(a, b){ return a <  b; }; _l[3] = "<";
_f[4] = function(a, b){ return a >= b; }; _l[4] = "≥";
_f[5] = function(a, b){ return a >  b; }; _l[5] = ">";

OMICRON.ComparatorGate = ComparatorGate;

/**
Round Gate Block with one input and one output
@class RoundGate
*/
class RoundGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = 0;
		this.fun = RoundGate._f[0];

		//create the inputs and output
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		++this.mod;
		if(this.mod > 2) this.mod = 0;
		this.fun = RoundGate._f[this.mod];
		var text = RoundGate._l[this.mod];
		// set text for label
		this.labels[0].setText(text);
	}

}
var _f = RoundGate._f = [];
var _l = RoundGate._l = [];
_f[0] = Math.round; _l[0] = "≈↕";
_f[1] = Math.floor; _l[1] = "≈↓";
_f[2] = Math.ceil ; _l[2] = "≈↑";

/**
Trigonometry Gate Block with one input and one output
@class TrigonometryGate
*/
class TrigonometryGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = 0;
		this.fun = TrigonometryGate._f[0];

		//create the inputs and output
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		++this.mod;
		if(this.mod > 5) this.mod = 0;
		this.fun = TrigonometryGate._f[this.mod];
		var text = TrigonometryGate._l[this.mod];
		// set text for label
		this.labels[0].setText(text);
	}

}
var _f = TrigonometryGate._f = [];
var _l = TrigonometryGate._l = [];
_f[0] = Math.sin ; _l[0] =  "SIN";
_f[1] = Math.cos ; _l[1] =  "COS";
_f[2] = Math.tan ; _l[2] =  "TAN";
_f[3] = Math.asin; _l[3] = "ASIN";
_f[4] = Math.acos; _l[4] = "ACOS";
_f[5] = Math.atan; _l[5] = "ATAN";

OMICRON.TrigonometryGate = TrigonometryGate;

/**
Trigonometry Gate Block with two inputs and one output
@class ATAN2_Gate
*/
class ATAN2_Gate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		// create the inputs and outputs
	}

	getValue(){
		//atan2(y, x) -> y and x are reversed
		return Math.atan2(this.inputs[1].value, this.inputs[0].value);
	}
}
OMICRON.ATAN2_Gate = ATAN2_Gate;

/**
Power Gate Block with two inputs and one output
@class PowerGate
*/
class PowerGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = false;
		this.fun = PowerGate._f[false];
		// create the inputs and outputs
	}

	getValue(){
		return this.fun(this.inputs[0].value, this.inputs[1].value);
	}

	interact(){
		this.mod = !this.mod;
		this.fun = PowerGate._f[this.mod];
		var text = PowerGate._l[this.mod];
		//set text for the label
		this.labels[0].setText(text);
	}

}
var _f = PowerGate._f = [];
var _l = PowerGate._l = [];
_f[false] = Math.pow;                                   _l[false] = "xⁿ";
_f[true ] = function(x, n){ return Math.pow(x, 1/n); }; _l[true ] = "ⁿ√x";

OMICRON.PowerGate = PowerGate;

/**
Square Gate Block with one input and one output
@class SquareGate
*/
class SquareGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = false;
		this.fun = PowerGate._f[false];
		// create the inputs and outputs
	}

	getValue(){
		return this.fun(this.inputs[0].value);
	}

	interact(){
		this.mod = !this.mod;
		this.fun = SquareGate._f[this.mod];
		var text = SquareGate._l[this.mod];
		//set text for the label
		this.labels[0].setText(text);
	}

}
var _f = SquareGate._f = [];
var _l = SquareGate._l = [];
_f[false] = function(x){ return x*x; }; _l[false] = "x²";
_f[true ] = Math.sqrt;                  _l[true ] = "√x";

OMICRON.SquareGate = SquareGate;
