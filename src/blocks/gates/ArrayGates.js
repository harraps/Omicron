/**
Array Length Block return the length of the array
@class ArrayLength
*/
class ArrayLength extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var array = this.inputs[0].value;
		if(array != null) return array.length;
		return null;
	}
}
OMICRON.ArrayLength = ArrayLength;
ArrayLength.options = {
	meshes:  [_mesh],
	inputs:  [{type: "array" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "number", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ArrayLength.className = "ArrayLength";
ArrayLength.blockName = "Array Length";
ArrayLength.label = OMICRON.createLabel("Array Length", _style_array);

/**
Abstract class which implement the method get value
@class JoinToArray
*/
class JoinToArray extends Block {
	getValue(){
		// recover the other array or create a new one
		var array = this.inputs[0].value.slice(0) || [];
		// following inputs are values
		for(var i=1; i<this.inputs.length; ++i){
			var value = this.inputs[i].value;
			if(value != null){
				array[array.length] = value;
			}
		}
		return array;
	}
}
OMICRON.JoinToArray = JoinToArray;

/**
Create a array of boolean
@class JoinBooleans
*/
class JoinBooleans extends JoinToArray {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.JoinBooleans = JoinBooleans;
JoinBooleans.options = {
	meshes: [_mesh],
	defaultType: "boolean",
	inputs: [
		{type: "array", position:{x:0, y:-0.36, z:0}},
		..._multipleInPins,
	],
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
JoinBooleans.className = "JoinBooleans";
JoinBooleans.blockName = "Join Booleans";
JoinBooleans.label = OMICRON.createLabel("Join Booleans", _style_array);

/**
Create a array of numbers
@class JoinNumbers
*/
class JoinNumbers extends JoinToArray {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.JoinNumbers = JoinNumbers;
JoinNumbers.options = {
	meshes: [_mesh],
	defaultType: "number",
	inputs: [
		{type: "array", position:{x:0, y:-0.36, z:0}},
		..._multipleInPins,
	],
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
JoinNumbers.className = "JoinNumbers";
JoinNumbers.blockName = "Join Numbers";
JoinNumbers.label = OMICRON.createLabel("Join Numbers", _style_array);

/**
Create a array of strings
@class JoinStrings
*/
class JoinStrings extends JoinToArray {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.JoinStrings = JoinStrings;
JoinStrings.options = {
	meshes: [_mesh],
	defaultType: "string",
	inputs: [
		{type: "array", position:{x:0, y:-0.36, z:0}},
		..._multipleInPins,
	],
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
JoinStrings.className = "JoinStrings";
JoinStrings.blockName = "Join Strings";
JoinStrings.label = OMICRON.createLabel("Join Strings", _style_array);

/**
Abstract class which implement the method get value
@class DisjoinArray
*/
class DisjoinArray extends Block {
	update(){
		var array = this.inputs[0].value;
		if(array != null){
			// we store the array in the block
			this.values = [];
			this.remain = [];
			var i; // we keep track of were we ended up
			// as long as i is lower than array length and outputs length
			for(i=0; i<array.length && i<this.outputs.length-1; ++i){
				var value = this.inputs[i].value;
				// if the value is of the right type
				if(typeof value === this.class.type){
					this.values[this.values.length] = value;
				}else{ // otherwise add it to the remaining array
					this.remain[this.remain.length] = value;
				}
			}
			// if there is still elements in the array
			if(i<array.length){
				this.remain.push(...array.slice(i));
			}
		}
	}

	getValue(outpin){
		// if the array exists
		if(this.values != null){
			// recover the index of the pin
			var index = this.outputs.indexOf(outpin);
			// if index is valid
			if(index == 0){ // first is remaining array
				return this.remain;
			}else if(0 < index && index < this.values.length){
				return this.values[index-1];
			}
		}
		return null;
	}
}
OMICRON.DisjoinArray = DisjoinArray;

/**
Extract booleans from an array
@class DisjoinBooleans
*/
class DisjoinBooleans extends DisjoinArray {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.DisjoinBooleans = DisjoinBooleans;
DisjoinBooleans.options = {
	meshes:  [_mesh],
	defaultType: "boolean",
	inputs:  [{type: "array" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [
		{type: "array", position:{x:0, y:-0.36, z:0}},
		_multipleOutPins,
	],
	labels:  [_label],
};
DisjoinBooleans.className = "DisjoinBooleans";
DisjoinBooleans.blockName = "Disjoin Booleans";
DisjoinBooleans.type  = "boolean";
DisjoinBooleans.label = OMICRON.createLabel("Disjoin Booleans", _style_array);

/**
Extract numbers from an array
@class DisjoinNumbers
*/
class DisjoinNumbers extends DisjoinArray {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.DisjoinNumbers = DisjoinNumbers;
DisjoinNumbers.options = {
	meshes:  [_mesh],
	defaultType: "number",
	inputs:  [{type: "array" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [
		{type: "array", position:{x:0, y:-0.36, z:0}},
		_multipleOutPins,
	],
	labels:  [_label],
};
DisjoinNumbers.className = "DisjoinNumbers";
DisjoinNumbers.blockName = "Disjoin Numbers";
DisjoinNumbers.type  = "number";
DisjoinNumbers.label = OMICRON.createLabel("Disjoin Numbers", _style_array);

/**
Extract strings from an array
@class DisjoinStrings
*/
class DisjoinStrings extends DisjoinArray {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}
}
OMICRON.DisjoinStrings = DisjoinStrings;
DisjoinStrings.options = {
	meshes:  [_mesh],
	defaultType: "string",
	inputs:  [{type: "array" , position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [
		{type: "array", position:{x:0, y:-0.36, z:0}},
		_multipleOutPins,
	],
	labels:  [_label],
};
DisjoinStrings.className = "DisjoinStrings";
DisjoinStrings.blockName = "Disjoin Strings";
DisjoinStrings.type  = "string";
DisjoinStrings.label = OMICRON.createLabel("Disjoin Strings", _style_array);

/**
Concat arrays into one
@class MergeArrays
*/
class MergeArrays extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var result = [];
		// for each input
		for(var i=0; i<this.inputs.length; ++i){
			// if the array is not null, add it to main array
			var array = this.inputs[i].value;
			if(array != null) result.concat(array);
		}
		return result;
	}
}
OMICRON.MergeArrays = MergeArrays;
MergeArrays.options = {
	meshes:  [_mesh],
	defaultType: "array",
	inputs:  _multipleInPins,
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
MergeArrays.className = "MergeArrays";
MergeArrays.blockName = "Merge Arrays";
MergeArrays.label = OMICRON.createLabel("Merge Arrays", _style_array);

/**
Slice array into multiple arrays
@class SliceArray
*/
class SliceArray extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var array = this.inputs[0].value;
		if(array != null){
			return array.slice(
				this.inputs[1].value, // start of slice
				this.inputs[2].value  // end   of slice
			);
		}
		return null;
	}
}
OMICRON.SliceArray = SliceArray;
SliceArray.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "array" , position:{x:-0.3, y:-0.36, z:-0.4}}, // main array
		{type: "number", position:{x: 0.2, y:-0.36, z:-0.4}}, // start
		{type: "number", position:{x: 0.4, y:-0.36, z:-0.4}}, // end
	],
	outputs: [{type: "array", position:{x:-0.3, y:-0.36, z:0.4}}],
	labels:  [_label],
};
SliceArray.className = "SliceArray";
SliceArray.blockName = "Slice Array";
SliceArray.label = OMICRON.createLabel("Slice Array", _style_array);
