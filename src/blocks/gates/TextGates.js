/**
Concat Gate Block with multiple inputs and one output
@class ConcatGate
*/
class ConcatGate extends Block {
	/**
	@constructor
	*/
	constructor(name, position, orientation){
		super(name, position, orientation);

		//create the input and output
	}

	getValue(){
		var text = "";
		for(var i=0; i<this.inputs.length; ++i){
			var value = this.inputs[i].value;
			if(value != null) text += value;
		}
		return text;
	}

}
