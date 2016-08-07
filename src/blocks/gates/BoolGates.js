/**
Logic Gate Block with one input and one output
@class LogicGate1
*/
class LogicGate1 extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = false;
		this.fun = LogicGate1._f[false];

		//create the input and output
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		this.mod = !this.mod;
		this.fun = LogicGate1._f[this.mod];
		var text = LogicGate1._l[this.mod];
		//set text for the label
		this.labels[0].setText(text);
	}
}
var _f = LogicGate1._f = [];
var _l = LogicGate1._l = [];
_f[false] = function(value){ return !!value; }; _l[false] = "BUF";
_f[true ] = function(value){ return  !value; }; _l[true ] = "NOT";

OMICRON.LogicGate1 = LogicGate1;

/**
Logic Gate Block with two inputs and one output
@class LogicGate2
*/
class LogicGate2 extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.mod = 0;
		this.fun = LogicGate2._f[0];

		//create the inputs and output
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		++this.mod;
		if(this.mod > 5) this.mod = 0;
		this.fun = LogicGate2._f[this.mod];
		var text = LogicGate2._f[this.mod];
		//set text for the label
		this.labels[0].setText(text);
	}
}
var _f = LogicGate1._f = [];
var _l = LogicGate1._l = [];
_f[0] = function(a, b){ return   a && b;    }; _l[0] = "AND" ;
_f[1] = function(a, b){ return   a || b;    }; _l[1] = "OR"  ;
_f[2] = function(a, b){ return   a ?  !b:b; }; _l[2] = "XOR" ;
_f[3] = function(a, b){ return !(a && b);   }; _l[3] = "NAND";
_f[4] = function(a, b){ return !(a || b);   }; _l[4] = "NOR" ;
_f[5] = function(a, b){ return   a ?  b:!b; }; _l[5] = "XNOR";

OMICRON.LogicGate2 = LogicGate2;

/**
Latch with one input and one output
@class ToggleLatch
*/
class ToggleLatch extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		//we need to store the value in the block
		this.value      = false;
		this.wasToggled = false;

		//create the input and output
	}

	update(){
		// if the input is set to true
		if(this.inputs[0].value){
			// if the pin has just changed of value, we toggle the value
      if(!this.wasToggled) this.value = !this.value;
      // the value has already been toggled
      this.wasToggled = true;
		}else{
			// the pin is now false, we can register the next toggle
      this.wasToggled = false;
		}
	}

	interact(){
		this.value = !this.value;
	}

	getValue(){
		return this.value;
	}

}
OMICRON.ToggleLatch = ToggleLatch;

/**
Latch with two inputs and two outputs
@class FlipFlopLatch
*/
class FlipFlopLatch extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		this.value = false;

		//create the inputs and outputs
		// 0 -> S
		// 1 -> R
		// 0 => Q
		// 1 => not Q
	}

	update(){
		// if S then Q=true else if R then notQ=true
		if     (this.inputs[0].value) this.value = true;
		else if(this.inputs[1].value) this.value = false;
	}

	interact(){
		this.value = !this.value;
	}

	getValue(outpin){
		// if S then Q else if R then not Q
		if     (outpin === this.outputs[0]) return  this.value;
		else if(outpin === this.outputs[1]) return !this.value;
	}

}
OMICRON.FlipFlopLatch = FlipFlopLatch;
