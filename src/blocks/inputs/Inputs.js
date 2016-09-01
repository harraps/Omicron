/**
Allow to input a boolean into the block
@class ButtonInput
*/
class ButtonInput extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		// we display the value asigned to the block
		this.timer = 0;
		this.labels[0].material = this.class.label;
		this.labels[1].material = this.class._l[false];
	}

	update(){
		if(this.timer > 0) --this.timer;
	}

	getValue(){
		return this.timer > 0;
	}

	interact(){
		// reset the timer
		this.timer = this.class.timer;
		// update the value displayed
		this.labels[1].material = this.class._l[this.timer > 0];
	}
}
OMICRON.ButtonInput = ButtonInput;
ButtonInput.options = {
	meshes:  [_mesh],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label, {position: {x:0, y:0.1, z:0}}],
	interactibles: [_interactible],
};
ButtonInput.className = "ButtonInput";
ButtonInput.blockName = "Button";
ButtonInput.label = OMICRON.createLabel("Button", _style_boolean);
ButtonInput._l    = _switchLabels;
ButtonInput.timer = 60; // how much frame is the button active

/**
Allow to input a boolean into the block
@class SwitchInput
*/
class SwitchInput extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		// we display the value asigned to the block
		this.value = false;
		this.labels[0].material = this.class.label;
		this.labels[1].material = this.class._l[false];
	}

	getValue(){
		return this.value;
	}

	interact(){
		this.value = !this.value;
		// update the value displayed
		this.labels[1].material = this.class._l[this.value];
	}
}
OMICRON.SwitchInput = SwitchInput;
SwitchInput.options = {
	meshes:  [_mesh],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label, {position: {x:0, y:0.1, z:0}}],
	interactibles: [_interactible],
};
SwitchInput.className = "SwitchInput";
SwitchInput.blockName = "Switch";
SwitchInput.label = OMICRON.createLabel("Switch", _style_boolean);
SwitchInput._l    = _switchLabels;

/**
Allow to input a number into the block
@class NumberInput
*/
class NumberInput extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		// we display the value asigned to the block
		this.value = 0;
		this.labels[0].material = OMICRON.createLabel("0", _style_number);
	}

	getValue(){
		return this.value;
	}

	interact(){
		// display interaction menu
		this.value = 10;
		// update the value displayed
		this.labels[0].material = OMICRON.createLabel(""+this.value, _style_number);
	}
}
OMICRON.NumberInput = NumberInput;
NumberInput.options = {
	meshes:  [_mesh],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
NumberInput.className = "NumberInput";
NumberInput.blockName = "Number Input";

/**
Allow to input a string into the block
@class StringInput
*/
class StringInput extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		// we display the value asigned to the block
		this.value = "";
		this.labels[0].material = OMICRON.createLabel("", _style_string);
	}

	getValue(){
		return this.value;
	}

	interact(){
		// display interaction menu
		this.value = "hello";
		// update the value displayed
		this.labels[0].material = OMICRON.createLabel(this.value, _style_string);
	}
}
OMICRON.StringInput = StringInput;
StringInput.options = {
	meshes:  [_mesh],
	outputs: [{type: "string", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
StringInput.className = "StringInput";
StringInput.blockName = "String Input";
