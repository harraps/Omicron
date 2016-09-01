/**
Save the selected array of blocks to a json file
@method saveToJSON
*/
OMICRON.saveToJSON = function(blocks){
	var array = [];
	// the boundaries of the zone of blocks we want to add
	var min = {x: Infinity, y: Infinity, z: Infinity};
	var max = {x:-Infinity, y:-Infinity, z:-Infinity};
	for(var i=0; i<blocks.length; ++i){
		var block = blocks[i];
		// min boundary update
		if(block.pos.x < min.x) min.x = block.pos.x;
		if(block.pos.y < min.y) min.y = block.pos.y;
		if(block.pos.z < min.z) min.z = block.pos.z;
		// max boundary update
		if(block.pos.x > max.x) max.x = block.pos.x;
		if(block.pos.y > max.y) max.y = block.pos.y;
		if(block.pos.z > max.z) max.z = block.pos.z;
		// add json objects to the array
		array[array.length] = block.toJSON();
	}
	return {
		blocks: array,
		min: min,
		max: max,
	};
};

/**
Load blocks from the given json file
@method loadFromJSON
*/
OMICRON.loadFromJSON = function(json){
	if(json == null) throw new Error("No JSON given, nothing to load");
	// if the json is not parsed yet
	if(typeof json === "string") json = JSON.parse(json);

	// we store the blocks we created in a array
	var blocks  = [],
			inputs  = [],
			outputs = [],
			defIns  = [];

	// for each block in the array
	for(var i=0; i<json.blocks.length; ++i){
		// we recover the definition of the block
		var def = json.blocks[i];
		// we create a new block based on the given class
		var block = new OMICRON[def.class](def.pos, def.orien);

		// we correct the ids based on the definition
		block.id = def.id;
		for(var j=0; j<def.ins.length && j<block.inputs.length; ++j){
			var input = block.inputs[j], // recover the input
					defin = def.ins[j];      // recover the definition of the input
			input.id  = defin.id;        // correct its id
			inputs[inputs.length] = input; // add the input to the array
			defIns[defIns.length] = defin; // add the definition to the array
		}
		for(var j=0; j<def.outs.length && j<block.outputs.length; ++j){
			var output = block.outputs[j]; // recover the output
			output.id  = def.outs[j].id;   // correct its id
			outputs[outputs.length] = output; // add the output to the array
		}
		// if the state of the block is set, the block is mutable
		if(def.state != null) block.setState(def.state);

		// add the block and its pins to the arrays
		blocks[blocks.length] = block;
	}

	// we loop over each block we just created
	for(var i=0; i<defIns.length && i<inputs.length; ++i){
		// we recover the input and its definition
		var defin = defIns[i],
				input = inputs[i];
		for(var j=0; j<outputs.length; ++j){
			var output = outputs[i]; // we recover the output
			// if the ids match, connect the pins
			if(output.id === defin.co) input.connect(output);
		}
	}

	return blocks;
};
