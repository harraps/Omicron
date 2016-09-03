// http://www.w3schools.com/jsref/jsref_obj_string.asp

// default string gate definition
var _default_1 = {
	meshes:  [_mesh],
	inputs:  [{type: "string", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "string", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
};

/**
Return true if both strings are equals
@class ComparatorProc
*/
class ComparatorProc extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		return this.fun(
			this.inputs[0].value,
			this.inputs[1].value
		);
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.ComparatorProc = ComparatorProc;
ComparatorProc.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}},
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.4}},
	],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
ComparatorProc.className = "ComparatorProc";
ComparatorProc.blockName = "Comparator Processor";
var _f = ComparatorProc._f = [];
var _l = ComparatorProc._l = [];
_f[false] = function(a,b){ return a == b; };
_f[true ] = function(a,b){ return a != b; };
_l[false] = OMICRON.createLabel("Equals"   , _style_string);
_l[true ] = OMICRON.createLabel("Different", _style_string);

/**
CharAt Processor Block return a single character
from the string at the given position
@class CharAtProc
*/
class CharAtProc extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(outpin){
		var str = this.inputs[0].value;
		if(typeof str === "string"){
			// two output types:
			if      (outpin === this.outputs[0]){ //return character
				return str.charAt    (this.inputs[1].value); //string
			}else if(outpin === this.outputs[1]){ //return charcode
				return str.charCodeAt(this.inputs[1].value); //number
			}
		}
		return null;
	}
}
OMICRON.CharAtProc = CharAtProc;
CharAtProc.options = {
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
CharAtProc.className = "CharAtProc";
CharAtProc.blockName = "Character At";
CharAtProc.label = OMICRON.createLabel("Char At", _style_string);

/**
Trim Processor Block return the string without whitesspace on both side
@class TrimProc
*/
class TrimProc extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var str = this.inputs[0].value;
		if(typeof str === "string"){
			return str.trim();
		}
		return null;
	}
}
OMICRON.TrimProc = TrimProc;
TrimProc.options = _default_1;
TrimProc.className = "TrimProc";
TrimProc.blockName = "Trim Spaces";
TrimProc.label = OMICRON.createLabel("Trim", _style_string);

/**
Replace Processor Block replace part of the string
@class ReplaceProc
*/
class ReplaceProc extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
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
OMICRON.ReplaceProc = ReplaceProc;
ReplaceProc.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x: 0  , y:-0.36, z:-0.4}}, // main string
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.2}}, // to replace
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.2}}, // replace with
	],
	outputs: [{type: "string", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
ReplaceProc.className = "ReplaceProc";
ReplaceProc.blockName = "Replace Sequence";
ReplaceProc.label = OMICRON.createLabel("Replace", _style_string);

/**
Repeat Processor Block return the string repeated multiple times
@class RepeatProc
*/
class RepeatProc extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
	}

	getValue(){
		var str = this.inputs[0].value;
		if(typeof str === "string"){
			return str.repeat(this.inputs[1].value);
		}
		return null;
	}
}
OMICRON.RepeatProc = RepeatProc;
RepeatProc.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // sequence
		{type: "number", position:{x: 0.3, y:-0.36, z:-0.4}}, // repeat times
	],
	outputs: [{type: "string", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
RepeatProc.className = "RepeatProc";
RepeatProc.blockName = "Repeat Sequence";
RepeatProc.label = OMICRON.createLabel("Repeat", _style_string);

/**
Concatenation Processor Block with multiple inputs and one output
@class ConcatProc
*/
class ConcatProc extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
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
OMICRON.ConcatProc = ConcatProc;
ConcatProc.options = {
	meshes:  [_mesh],
	defaultType: "string",
	inputs:  _multipleInPins,
	outputs: [{type: "string", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
ConcatProc.className = "ConcatProc";
ConcatProc.blockName = "Concatenate";
ConcatProc.label = OMICRON.createLabel("Concat", _style_string);

/**
SubString Processor Block with one string input,
two number inputs and one string output
@class SubStringProc
*/
class SubStringProc extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
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
		this.setState(!this.mod);
	}
}
OMICRON.SubStringProc = SubStringProc;
SubStringProc.options = {
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
SubStringProc.className = "SubStringProc";
SubStringProc.blockName = "SubString";
var _f = SubStringProc._f = []; // functions list
var _l = SubStringProc._l = []; //    labels list
_f[false] = function(str,a,b){ return str.substring(a,b); };
_f[true ] = function(str,a,b){ return str.substr   (a,b); };
_l[false] = OMICRON.createLabel("SubString Interval", _style_string);
_l[true ] = OMICRON.createLabel("SubString Length"  , _style_string);

/**
Includes Processor Block return true if string B appears in string A
@class IncludesProc
*/
class IncludesProc extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(0);
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
		var state = this.mod+1;
		if(state > 2) state = 0;
		this.setState(state);
	}
}
OMICRON.IncludesProc = IncludesProc;
IncludesProc.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // main string
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.4}}, // sequence
	],
	outputs: [{type: "boolean", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
IncludesProc.className = "IncludesProc";
IncludesProc.blockName = "Includes";
var _f = IncludesProc._f = []; // functions list
var _l = IncludesProc._l = []; //    labels list
_f[0] = function(a,b){ return a.includes  (b); };
_f[1] = function(a,b){ return a.startsWith(b); };
_f[2] = function(a,b){ return a.endsWith  (b); };
_l[0] = OMICRON.createLabel("Includes"   , _style_string);
_l[1] = OMICRON.createLabel("Starts With", _style_string);
_l[2] = OMICRON.createLabel("Ends With"  , _style_string);

/**
IndexOf Processor Block return the index of
the first or last occurence of the given sequence
@class IndexOfProc
*/
class IndexOfProc extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
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
		this.setState(!this.mod);
	}
}
OMICRON.IndexOfProc = IndexOfProc;
IndexOfProc.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // main string
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.4}}, // sequence
	],
	outputs: [{type: "number", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
IndexOfProc.className = "IndexOfProc";
IndexOfProc.blockName = "Index of Sequence";
var _f = IndexOfProc._f = []; // functions list
var _l = IndexOfProc._l = []; //    labels list
_f[false] = function(a,b){ return a.indexOf    (b); };
_f[true ] = function(a,b){ return a.lastIndexOf(b); };
_l[false] = OMICRON.createLabel("First Occurence", _style_string);
_l[true ] = OMICRON.createLabel( "Last Occurence", _style_string);

/**
Change Case Processor Block change the case of the text
@class ChangeCaseProc
*/
class ChangeCaseProc extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		var str = this.inputs[0].value;
		if(typeof str === "string"){
			return this.fun(str);
		}
		return null;
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.ChangeCaseProc = ChangeCaseProc;
ChangeCaseProc.options = _default_1;
ChangeCaseProc.className = "ChangeCaseProc";
ChangeCaseProc.blockName = "Change Case";
var _f = ChangeCaseProc._f = []; // functions list
var _l = ChangeCaseProc._l = []; //    labels list
_f[false] = function(str){ return str.toLowerCase(); };
_f[true ] = function(str){ return str.toUpperCase(); };
_l[false] = OMICRON.createLabel("To Lower Case", _style_string);
_l[true ] = OMICRON.createLabel("To Upper Case", _style_string);

/**
Split Processor Block return a array of strings cutted based on the separator
@class SplitProc
*/
class SplitProc extends Block {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.labels[0].material = this.class.label;
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
OMICRON.SplitProc = SplitProc;
SplitProc.options = {
	meshes:  [_mesh],
	inputs:  [
		{type: "string", position:{x:-0.3, y:-0.36, z:-0.4}}, // main string
		{type: "string", position:{x: 0.3, y:-0.36, z:-0.4}}, // sequence
	],
	outputs: [{type: "array", position:{x:0, y:-0.36, z:0.4}}],
	labels:  [_label],
};
SplitProc.className = "SplitProc";
SplitProc.blockName = "Split";
SplitProc.label = OMICRON.createLabel("Split Text", _style_string);

/**
Sort Processor Block return the sorted array based on alphabetical order
@class SortProc
*/
class SortProc extends MutableBlock {
	constructor(position, orientation){
		super(this.__proto__, position, orientation);
		this.setState(false);
	}

	getValue(){
		var array = this.inputs[0].value;
		if(array != null){
			var result = []; // our result array
			for(var i=0; i<array.length; ++i){
				var str = array[i]; // recover the value in the array
				if(typeof str === "string"){ // if it's a string
					result[result.length] = str; // add it to the result
				}
			}
			return this.fun(result); // sort the array
		}
		return null
	}

	interact(){
		this.setState(!this.mod);
	}
}
OMICRON.SortProc = SortProc;
SortProc.options = {
	meshes:  [_mesh],
	inputs:  [{type: "array", position:{x:0, y:-0.36, z:-0.4}}],
	outputs: [{type: "array", position:{x:0, y:-0.36, z: 0.4}}],
	labels:  [_label],
	interactibles: [_interactible],
};
SortProc.className = "SortProc";
SortProc.blockName = "Sort";
var _f = SortProc._f = []; // functions list
var _l = SortProc._l = []; //    labels list
_f[false] = function(a){ a.sort();              return a };
_f[true ] = function(a){ a.sort(); a.reverse(); return a };
_l[false] = OMICRON.createLabel("Sort"        , _style_string);
_l[true ] = OMICRON.createLabel("Reverse Sort", _style_string);
