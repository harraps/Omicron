// todo boolean display

/**
Allow to display the boolean as a led
@class Diode
*/
class Diode extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	setState(state){
		// change the state of the led (on or off)
		this.meshes[1].material = this.class._m[state];
	}

	update(){
		this.setState(this.inputs[0].value || false);
	}
}
var _m = Diode._m = []; // LED materials
_m[false] = new THREE.MeshBasicMaterial({color: 0x000000}); // OFF
_m[true ] = new THREE.MeshBasicMaterial({color: 0xffffff}); // ON
OMICRON.Diode = Diode;
Diode.options = {
	meshes: [_mesh, {
		geometry: new THREE.SphereGeometry(0.4),
		material: _m[false], // default state is OFF
	}],
	inputs: [{type: "boolean", position:{x:0, y:-0.36, z:-0.4}}],
};
Diode.className = "Diode";
Diode.blockName = "Light Emitting Diode";

/**
Allow to display the value of the number
@class NumberOutput
*/
class NumberOutput extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
	}

	setState(state){
		// change the value displayed
		this.labels[0].material = OMICRON.createLabel(""+state, _style_number);
	}

	update(){
		this.setState(this.inputs[0].value || 0);
	}
}
OMICRON.NumberOutput = NumberOutput;
NumberOutput.options = {
	meshes: [_mesh],
	inputs: [{type: "number", position:{x:0, y:-0.36, z:-0.4}}],
	labels: [_label],
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
		this.setState("");
	}

	setState(state){
		// change the text displayed
		this.labels[0].material = OMICRON.createLabel(state, _style_string);
	}

	update(){
		this.setState(this.inputs[0].value || "");
	}
}
OMICRON.StringOutput = StringOutput;
StringOutput.options = {
	meshes: [_mesh],
	inputs: [{type: "string", position:{x:0, y:-0.36, z:-0.4}}],
	labels: [_label],
};
StringOutput.className = "StringOutput";
StringOutput.blockName = "String Output";
