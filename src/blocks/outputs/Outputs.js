// todo boolean display

/**
Allow to display the value of the number
@class NumberOutput
*/
class NumberOutput extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		// we display the value asigned to the block
		this.value = 0;
		this.labels[0].material = OMICRON.createLabel("0", _style_number);
	}

	update(){
		// display interaction menu
		var value = this.inputs[0].value || 0;
		// update the value displayed
		this.labels[0].material = OMICRON.createLabel(""+value, _style_number);
	}
}
OMICRON.NumberOutput = NumberOutput;
NumberOutput.options = {
	meshes:  [_mesh],
	inputs: [{type: "number", position:{x:0, y:-0.36, z:-0.4}}],
	labels:  [_label],
};
NumberOutput.className = "NumberOutput";
NumberOutput.blockName = "Number Output";

/**
Allow to display the value of the string
@class StringOutput
*/
class StringOutput extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		// we display the value asigned to the block
		this.value = "";
		this.labels[0].material = OMICRON.createLabel("", _style_string);
	}

	update(){
		// display interaction menu
		var value = this.inputs[0].value || "";
		// update the value displayed
		this.labels[0].material = OMICRON.createLabel(value, _style_string);
	}
}
OMICRON.StringOutput = StringOutput;
StringOutput.options = {
	meshes:  [_mesh],
	inputs: [{type: "string", position:{x:0, y:-0.36, z:-0.4}}],
	labels:  [_label],
};
StringOutput.className = "StringOutput";
StringOutput.blockName = "String Output";
