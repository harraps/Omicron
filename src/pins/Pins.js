/**
Squared shaped input pin
@class InPin
*/
class InPin {

	/**
	Create a input pin
	@constructor
	@param {Block} block The Block on which this pin is attached
	@param {Any} type The type of the pin, can be a String or a Number,
	 must be the exact same value on the corresponding Output Pin
	@param {Object} options Options regarding the pin
	*/
	constructor(block, type, options){
		options = options || {};

		if(typeof block === "undefined") throw new Error("Input Pin not connected to any block");
		if(typeof type  === "undefined") throw new Error("Input Pin has no type declared !");

		this.block = block; // the block
		this.type  = type;  // the type of the pin
		this.value = null;  // value of the pin

		// color of the pin and the wire if any
		this.highColor = options.highColor || 0xFFFFFF;
		this.lowColor  = options.lowColor  || 0x000000;

		//only one output pin connected
		this.outpin = null;
		// create wire if needed
	}

	update(){
		// reset the value
		this.value = null;
		// if connected, set the value
		if(this.outpin !== null)
			this.value = this.outpin.value;
		this.setWireColor(this.value);
	}

	/**
	Connect the pin to the given output pin
	*/
	connect(outpin){
		if(outpin instanceof OutPin){
			if(outpin.type === this.type){
				this.outpin = outpin;
				this.outpin.inpins.push(this);

				// draw the wire
			}
		}
	}

	/**
	Disconnect the pin from any output pin connected
	*/
	disconnect(){
		if(this.outpin !== null){
			Util.listRemove(this.outpin.inpins, this);
			this.outpin = null;

			//disable wire draw
		}
	}

	setWireColor(isHigh){
		var color = isHigh ? this.highColor : this.lowColor;
		//set wire color
	}

	destroy(){
		this.disconnect();
		//remove from board
	}
}
OMICRON.InPin = InPin;

/**
Arrow shaped output pin
@class OutPin
*/
class OutPin {
	/**
	Create a output pin
	@constructor
	@param {Block} block The Block on which this pin is attached
	@param {Any} type The type of the pin, can be a String or a Number,
	 must be the exact same value on the corresponding Input Pin
	@param {Object} options Options regarding the pin
	*/
	constructor(block, type, options){
		options = options || {};

		if(typeof block === "undefined") throw new Error("Output Pin not connected to any block");
		if(typeof type  === "undefined") throw new Error("Output Pin has no type declared !");

		this.block = block; // the block
		this.type  = type;  // the type of the pin
		this.value = null;  // value of the pin

		// color of the pin and the wire if any
		this.highColor = options.highColor || 0xFFFFFF;
		this.lowColor  = options.lowColor  || 0x000000;

		// multiple input pins connected
		this.inpins = [];
	}

	update(){
		// we recover the value from the block
		this.value = this.block.getValue(this);
	}

	connect(inpin){
		if(inpin instanceof InPin){
			// we connect the input pin to the output pin
			// and not the other way arround
			if(inpin.type === this.type)
				inpin.connect(this);
		}
	}

	disconnect(inpin){
		if(inpin.outpin === this)
			inpin.disconnect();
	}

	disconnectAll(){
		for(var i=0; i<this.inpins.length; ++i){
			this.inpins[i].disconnect();
		}
	}

	destroy(){
		this.disconnectAll();
		//remove from board
	}

}
OMICRON.OutPin = OutPin;
