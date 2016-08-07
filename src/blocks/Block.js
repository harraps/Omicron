class Block {
	/**
	Create a new block in the world
	*/
	constructor(name, position, orientation){
		this.inputs  = [];
		this.outputs = [];
		this.labels  = [];
		this.inters  = [];

		// place block in the world
		this.isDestroy = false;
	}

	update(){

	}

	getValue(outpin){

	}

	interact(inter){

	}

	destroy(){
		//remove block from board
		var i;
		// unregister the pins
		for(i=0; i<this.inputs .length; ++i) this.inputs [i].destroy();
		for(i=0; i<this.outputs.length; ++i) this.outpins[i].destroy();
		// unregister the interactibles
		for(i=0; i<this.inters.length; ++i); //remove from world
	}

}
OMICRON.Block = Block;
