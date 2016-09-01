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
class LogicGate1 extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);

		// default state of the block
		this.setState(false);
	}

	getValue(){
		return this.fun(this.inputs[0]);
	}

	interact(){
		// switch block state
		this.setState(!this.mod);
	}
}
OMICRON.LogicGate1 = LogicGate1;
LogicGate1.options = _default_1;
LogicGate1.className = "LogicGate1";
LogicGate1.BlockName = "Logic Gate";
var _f = LogicGate1._f = []; // functions list
var _l = LogicGate1._l = []; //    labels list
_f[false] = function(value){ return !!value; };
_f[true ] = function(value){ return  !value; };
_l[false] = OMICRON.createLabel("BUF", _style_boolean);
_l[true ] = OMICRON.createLabel("NOT", _style_boolean);

/**
Logic Gate Block with two inputs and one output
@class LogicGate2
*/
class LogicGate2 extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);

		//default state of the block
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
OMICRON.LogicGate2 = LogicGate2;
LogicGate2.options = _default_2;
LogicGate2.className = "LogicGate2";
LogicGate2.BlockName = "Logic Gate";
var _f = LogicGate1._f = []; // functions list
var _l = LogicGate1._l = []; //    labels list
_f[0] = function(a, b){ return   a && b;    };
_f[1] = function(a, b){ return   a || b;    };
_f[2] = function(a, b){ return   a ?  !b:b; };
_f[3] = function(a, b){ return !(a && b);   };
_f[4] = function(a, b){ return !(a || b);   };
_f[5] = function(a, b){ return   a ?  b:!b; };
_l[0] = OMICRON.createLabel("AND" , _style_boolean);
_l[1] = OMICRON.createLabel("OR"  , _style_boolean);
_l[2] = OMICRON.createLabel("XOR" , _style_boolean);
_l[3] = OMICRON.createLabel("NAND", _style_boolean);
_l[4] = OMICRON.createLabel("NOR" , _style_boolean);
_l[5] = OMICRON.createLabel("XNOR", _style_boolean);

/**
Latch with one input and one output
@class ToggleLatch
*/
class ToggleLatch extends Block {
	/**
	@constructor
	*/
	constructor(position, orientation){
		super(this.__proto__, position, orientation);

		//we need to store the value in the block
		this.value      = false;
		this.wasToggled = false;
		this.labels[0].material = this.class.label;
		this.labels[1].material = this.class._l[false];
	}

	update(){
		// if the input is set to true
		if(this.inputs[0].value){
			// if the pin has just changed of value, we toggle the value
      if(!this.wasToggled){
				this.value = !this.value;
				this.labels[1].material = this.class._l[this.value];
			}
      // the value has already been toggled
      this.wasToggled = true;
		}else{
			// the pin is now false, we can register the next toggle
      this.wasToggled = false;
		}
	}

	setState(state){
		this.value = state;
	}

	getValue(){
		return this.value;
	}

	interact(){
		this.value = !this.value;
		this.labels[1].material = this.class._l[this.value];
	}
}
OMICRON.ToggleLatch = ToggleLatch;
ToggleLatch.options = {
	meshes:  [_mesh],
	inputs:  [{type: "boolean", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label, {position: {x:0, y:0.1, z:0}}],
	interactibles: [_interactible],
};
ToggleLatch.className = "ToggleLatch";
ToggleLatch.blockName = "Toggle Latch";
ToggleLatch.label = OMICRON.createLabel("Toggle Latch", _style_boolean);
ToggleLatch._l    = _switchLabels;

/**
Latch with two inputs and two outputs
@class FlipFlopLatch
*/
class FlipFlopLatch extends Block {
	/**
	@constructor
	*/
	constructor(position, orientation){
		super(this.__proto__, position, orientation);

		this.value = false;
		this.labels[0].material = this.class.label;
		this.labels[1].material = this.class._l[false];
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
			this.labels[1].material = this.class._l[true ];
		}else if(this.inputs[1].value){ // R
			this.value = false;
			this.labels[1].material = this.class._l[false];
		}
	}

	setState(state){
		this.value = state;
	}

	getValue(outpin){
		// if S then Q else if R then not Q
		if     (outpin === this.outputs[0]) return  this.value;
		else if(outpin === this.outputs[1]) return !this.value;
	}

	interact(){
		this.value = !this.value;
		this.labels[1].material = this.class._l[this.value];
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
FlipFlopLatch.className = "FlipFlopLatch";
FlipFlopLatch.blockName = "Flip-Flop Latch";
FlipFlopLatch.label = OMICRON.createLabel("Flip-Flop Latch", _style_boolean);
FlipFlopLatch._l    = _switchLabels;

/**
Merge booleans into a number
@class BitSet
*/
class BitSet extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
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
BitSet.className = "BitSet";
BitSet.blockName = "Bits Set";
BitSet.label = OMICRON.createLabel("Bits Set", _style_boolean);
