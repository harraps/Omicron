// default style for labels
var _style = {
	fontFace: "monospace",
	fontColor:       "#ffffff",
	backgroundColor: "#00b400",
	borderColor:     "#ffffff",
};

var _default_1 = {
	meshes:  [_mesh],
	inputs:  [{type: "string", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "string", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
};

/**
CharAt Gate Block return a single character
from the string at the given position
@class CharAtGate
*/
class CharAtGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, CharAtGate.options);
		this.labels[0].material = CharAtGate.label;
	}

	getValue(outpin){
		var str = this.inputs[0].value;
		if(typeof str === "string"){
			// two output types:
			if      (outpin === this.outputs[0]){ //return character
				return str.charAt(this.inputs[1].value); //string
			}else if(outpin === this.outputs[1]){ //return charcode
				return str.charCodeAt(this.inputs[1].value); //number
			}
		}
		return null;
	}
}
OMICRON.CharAtGate = CharAtGate;
CharAtGate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // main string
		{type: "number", position:{x: 0.3, y:-0.36, z:-0.4}}, // position
	],
	outputs: [
		{type: "string", position:{x:-0.3, y:-0.36, z:0.4}}, // character
		{type: "number", position:{x: 0.3, y:-0.36, z:0.4}}, // charcode
	],
	labels:  [_label],
};
CharAtGate.label = OMICRON.createLabel("Character At", _style);

/**
Trim Gate Block return the string without whitesspace on both side
@class TrimGate
*/
class TrimGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, TrimGate.options);
		this.labels[0].material = TrimGate.label;
	}

	getValue(){
		var str = this.inputs[0].value;
		if(typeof str === "string"){
			return str.trim();
		}
		return null;
	}
}
OMICRON.TrimGate = TrimGate;
TrimGate.options = _default_1;
TrimGate.label = OMICRON.createLabel("Trim Space", _style);

/**
Replace Gate Block replace part of the string
@class ReplaceGate
*/
class ReplaceGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, ReplaceGate.options);
		this.labels[0].material = ReplaceGate.label;
	}

	getValue(){
		var a = this.inputs[0].value,
				b = this.inputs[1].value,
				c = this.inputs[2].value;
		if(typeof a === typeof b === typeof c === "string"){
			return a.replace(b,c);
		}
		return null;
	}
}
OMICRON.ReplaceGate = ReplaceGate;
ReplaceGate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x: 0  , y:-0.36, z:-0.4}}, // main string
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.2}}, // to replace
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.2}}, // replace with
	],
	outputs: [{type: "string", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
ReplaceGate.label = OMICRON.createLabel("Replace Sequence", _style);

/**
Repeat Gate Block return the string repeated multiple times
@class RepeatGate
*/
class RepeatGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, RepeatGate.options);
		this.labels[0].material = RepeatGate.label;
	}

	getValue(){
		var str = this.inputs[0].value;
		if(typeof str === "string"){
			return str.repeat(this.inputs[1].value);
		}
		return null;
	}
}
OMICRON.RepeatGate = RepeatGate;
RepeatGate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // sequence
		{type: "number", position:{x: 0.3, y:-0.36, z:-0.4}}, // repeat times
	],
	outputs: [{type: "string", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
RepeatGate.label = OMICRON.createLabel("Repeat Sequence", _style);

/**
Concat Gate Block with multiple inputs and one output
@class ConcatGate
*/
class ConcatGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, ConcatGate.options);
		this.labels[0].material = ConcatGate.label;
	}

	getValue(){
		var str = "";
		for(var i=0; i<this.inputs.length; ++i){
			var value = this.inputs[i].value;
			if(value != null) str += value;
		}
		return str;
	}
}
OMICRON.ConcatGate = ConcatGate;
ConcatGate.options = {
	meshes:  [_mesh],
	defaultType: "string",
	inputs:  _multipleInPins,
	outputs: [{type: "string", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
ConcatGate.label = OMICRON.createLabel("Concatenate", _style);

/**
SubString Gate Block with one string input,
two number inputs and one string output
@class SubStringGate
*/
class SubStringGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, SubStringGate.options);

		// default state of the block
		this.mod = false;
		this.fun = SubStringGate._f[false];
		this.labels[0].material = SubStringGate._l[false];
	}

	getValue(){
		var str = this.inputs[0].value;
		if(typeof text === "string"){
			return this.fun(str,
				this.inputs[1].value,
				this.inputs[2].value
			);
		}
		return null;
	}

	interact(){
		this.mod = !this.mod;
		this.fun = SubStringGate._f[this.mod];
		// update the label
		this.labels[0].material = SubStringGate._l[this.mod];
	}
}
OMICRON.SubstringGate = SubstringGate;
SubStringGate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // main string
		{type: "number", position:{x: 0.2, y:-0.36, z:-0.4}}, // start
		{type: "number", position:{x: 0.4, y:-0.36, z:-0.4}}, // end | length
	],
	outputs: [{type: "string", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
var _f = SubStringGate._f = []; // functions list
var _l = SubStringGate._l = []; //    labels list
_f[false] = function(str,a,b){ return str.substring(a,b); };
_f[true ] = function(str,a,b){ return str.substr   (a,b); };
_l[false] = OMICRON.createLabel("SubString Interval", _style);
_l[true ] = OMICRON.createLabel("SubString Length"  , _style);

/**
Includes Gate Block return true if string B appears in string A
@class IncludesGate
*/
class IncludesGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, IncludesGate.options);

		// default state of the block
		this.mod = 0;
		this.fun = IncludesGate._f[0];
		this.labels[0].material = IncludesGate._l[0];
	}

	getValue(){
		var a = this.inputs[0].value,
				b = this.inputs[1].value;
		if(typeof a === typeof b === "string"){
			return this.fun(a,b);
		}
		return false;
	}

	interact(){
		++this.mod;
		if(this.mod > 2) this.mod = 0;
		this.fun = IncludesGate._f[this.mod];
		// update the label
		this.labels[0].material = IncludesGate._l[this.mod];
	}
}
OMICRON.IncludesGate = IncludesGate;
IncludesGate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // main string
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.4}}, // sequence
	],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
var _f = IncludesGate._f = []; // functions list
var _l = IncludesGate._l = []; //    labels list
_f[0] = function(a,b){ return a.includes  (b); };
_f[1] = function(a,b){ return a.startsWith(b); };
_f[2] = function(a,b){ return a.endsWith  (b); };
_l[0] = OMICRON.createLabel("Includes"   , _style);
_l[1] = OMICRON.createLabel("Starts With", _style);
_l[2] = OMICRON.createLabel("Ends With"  , _style);

/**
IndexOf Gate Block return the index of
the first or last occurence of the given sequence
@class IndexOfGate
*/
class IndexOfGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, IndexOfGate.options);

		// default state of the block
		this.mod = false;
		this.fun = IndexOfGate._f[false];
		this.labels[0].material = IndexOfGate._l[false];
	}

	getValue(){
		var a = this.inputs[0].value,
				b = this.inputs[1].value;
		if(typeof a === typeof b === "string"){
			return this.fun(a,b);
		}
		return null;
	}

	interact(){
		this.mod = !this.mod;
		this.fun = IndexOfGate._f[this.mod];
		// update the label
		this.labels[0].material = IndexOfGate._l[this.mod];
	}
}
OMICRON.IndexOfGate = IndexOfGate;
IndexOfGate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // main string
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.4}}, // sequence
	],
	outputs: [{type: "number", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
var _f = IndexOfGate._f = []; // functions list
var _l = IndexOfGate._l = []; //    labels list
_f[false] = function(a,b){ return a.indexOf    (b); };
_f[true ] = function(a,b){ return a.lastIndexOf(b); };
_l[false] = OMICRON.createLabel("First Occurence", _style);
_l[true ] = OMICRON.createLabel( "Last Occurence", _style);

/**
ChangeCase Gate Block change the case of the text
@class ChangeCaseGate
*/
class ChangeCaseGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, ChangeCaseGate.options);

		// default state of the block
		this.mod = false;
		this.fun = ChangeCaseGate._f[false];
		this.labels[0].material = ChangeCaseGate._l[false];
	}

	getValue(){
		var str = this.inputs[0].value;
		if(typeof str === "string"){
			return this.fun(str);
		}
		return null;
	}

	interact(){
		this.mod = !this.mod;
		this.fun = ChangeCaseGate._f[this.mod];
		var text = ChangeCaseGate._l[this.mod];
		//set text for the label
		this.labels[0].setText(text);
	}
}
OMICRON.ChangeCaseGate = ChangeCaseGate;
ChangeCaseGate.options = _default_1;
var _f = ChangeCaseGate._f = []; // functions list
var _l = ChangeCaseGate._l = []; //    labels list
_f[false] = function(str){ return str.toLowerCase(); };
_f[true ] = function(str){ return str.toUpperCase(); };
_l[false] = OMICRON.createLabel("To Lower Case", _style);
_l[true ] = OMICRON.createLabel("To Upper Case", _style);

/**
Split Gate Block return a array of strings cutted based on the separator
@class SplitGate
*/
class SplitGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation, SplitGate.options);
		this.labels[0].material = SplitGate.label;
	}

	getValue(){
		var a = this.inputs[0].value,
				b = this.inputs[1].value;
		if(typeof a === typeof b === "string"){
			return a.split(b);
		}
		return null;
	}
}
OMICRON.SplitGate = SplitGate;
SplitGate.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // main string
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.4}}, // sequence
	],
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
SplitGate.label = OMICRON.createLabel("Split Text", _style);
