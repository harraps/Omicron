// default style for labels
var _style = {
	fontFace: "monospace",
	fontColor:       "#ffffff",
	backgroundColor: "#b40000",
	borderColor:     "#ffffff",
};

// default 1 input, 1 output
var _default_1 = {
	meshes:  [_mesh],
	inputs:  [{type: "boolean", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};

// default 2 inputs, 1 output
var _default_2 = {
	meshes:  [_mesh],
	inputs:  [
		{type: "boolean", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "boolean", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};

/**
Logic Gate Block with one input and one output
@class LogicGate1
*/
class LogicGate1 extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, LogicGate1.options);

		// default state of the block
		this.mod = false;
		this.fun = LogicGate1._f[false];
		this.labels[0].material = LogicGate1._l[false];
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		// switch block state
		this.mod = !this.mod;
		this.fun = LogicGate1._f[this.mod];
		// update the label
		this.labels[0].material = LogicGate1._l[this.mod];
	}
}
OMICRON.LogicGate1 = LogicGate1;
LogicGate1.options = _default_1;
var _f = LogicGate1._f = []; // functions list
var _l = LogicGate1._l = []; //    labels list
_f[false] = function(value){ return !!value; };
_f[true ] = function(value){ return  !value; };
_l[false] = OMICRON.createLabel("BUF", _style);
_l[true ] = OMICRON.createLabel("NOT", _style);

/**
Logic Gate Block with two inputs and one output
@class LogicGate2
*/
class LogicGate2 extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, LogicGate2.options);

		//default state of the block
		this.mod = 0;
		this.fun = LogicGate2._f[0];
		this.labels[0].material = LogicGate2._l[0];
	}

	getValue(){
		return this.fun(this.inputs[0], this.inputs[1]);
	}

	interact(){
		++this.mod;
		if(this.mod > 5) this.mod = 0;
		this.fun = LogicGate2._f[this.mod];
		// update the label
		this.labels[0].material = LogicGate2._l[this.mod];
	}
}
OMICRON.LogicGate2 = LogicGate2;
LogicGate2.options = _default_2;
var _f = LogicGate1._f = []; // functions list
var _l = LogicGate1._l = []; //    labels list
_f[0] = function(a, b){ return   a && b;    };
_f[1] = function(a, b){ return   a || b;    };
_f[2] = function(a, b){ return   a ?  !b:b; };
_f[3] = function(a, b){ return !(a && b);   };
_f[4] = function(a, b){ return !(a || b);   };
_f[5] = function(a, b){ return   a ?  b:!b; };
_l[0] = OMICRON.createLabel("AND" , _style);
_l[1] = OMICRON.createLabel("OR"  , _style);
_l[2] = OMICRON.createLabel("XOR" , _style);
_l[3] = OMICRON.createLabel("NAND", _style);
_l[4] = OMICRON.createLabel("NOR" , _style);
_l[5] = OMICRON.createLabel("XNOR", _style);

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

/**
Latch with one input and one output
@class ToggleLatch
*/
class ToggleLatch extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, ToggleLatch.options);

		//we need to store the value in the block
		this.value      = false;
		this.wasToggled = false;
		this.labels[0].material = ToggleLatch.label;
		this.labels[1].material = ToggleLatch._l[false];
	}

	update(){
		// if the input is set to true
		if(this.inputs[0].value){
			// if the pin has just changed of value, we toggle the value
      if(!this.wasToggled){
				this.value = !this.value;
				this.labels[1].material = ToggleLatch._l[this.value];
			}
      // the value has already been toggled
      this.wasToggled = true;
		}else{
			// the pin is now false, we can register the next toggle
      this.wasToggled = false;
		}
	}

	interact(){
		this.value = !this.value;
		this.labels[1].material = ToggleLatch._l[this.value];
	}

	getValue(){
		return this.value;
	}

}
OMICRON.ToggleLatch = ToggleLatch;
ToggleLatch.options = _default_1;
ToggleLatch.label = OMICRON.createLabel("Toggle Latch", _style);
ToggleLatch._l    = _switchLabels;

/**
Latch with two inputs and two outputs
@class FlipFlopLatch
*/
class FlipFlopLatch extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, FlipFlopLatch.options);

		this.value = false;
		this.labels[0].material = FlipFlopLatch.label;
		this.labels[1].material = FlipFlopLatch._l[false];
		//create the inputs and outputs
		// 0 -> S
		// 1 -> R
		// 0 => Q
		// 1 => not Q
	}

	update(){
		// if S then Q=true else if R then notQ=true
		if      (this.inputs[0].value){ // S
			this.value = true;
			this.labels[1].material = FlipFlopLatch._l[true];
		}else if(this.inputs[1].value){ // R
			this.value = false;
			this.labels[1].material = FlipFlopLatch._l[false];
		}
	}

	interact(){
		this.value = !this.value;
		this.labels[1].material = FlipFlopLatch._l[this.value];
	}

	getValue(outpin){
		// if S then Q else if R then not Q
		if     (outpin === this.outputs[0]) return  this.value;
		else if(outpin === this.outputs[1]) return !this.value;
	}

}
OMICRON.FlipFlopLatch = FlipFlopLatch;
FlipFlopLatch.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "boolean", position:{x:-0.4, y:-0.36, z: 0  }}, // S
		{type: "boolean", position:{x: 0.4, y:-0.36, z: 0  }}, // R
	],
	outputs: [
		{type: "boolean", position:{x: 0  , y:-0.36, z: 0.4}}, // Q
		{type: "boolean", position:{x: 0  , y:-0.36, z:-0.4}}, // not Q
	],
	labels:  [_label, {position: {x:0, y:0.1, z:0}}],
	interactibles: [_interactible],
};
FlipFlopLatch.label = OMICRON.createLabel("Flip-Flop Latch", _style);
FlipFlopLatch._l    = _switchLabels;

/**
Merge booleans into a number
@class BitSet
*/
class BitSet extends Block {
	constructor(position, orientation){
		super("BitSet", position, orientation, BitSet.options);
		this.labels[0].material = BitSet.label;
	}

	getValue(){
		var array = this.inputs[0].value;
		if(array != null){
			var n = 0;
			// we go in reverse order
			for(var i=array.length-1; i>=0; --i){
				if(typeof array === "boolean"){
					n <<= 1; // shift to the left
					if(array[i]) n |= 1; // if true add 1
				}
			}
			return n;
		}
		return null;
	}
}
OMICRON.BitSet = BitSet;
BitSet.options = {
	meshes:  [_mesh],
	inputs:  [{type: "array" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
};
BitSet.label = OMICRON.createLabel("BitSet", _style);
