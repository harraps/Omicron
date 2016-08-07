class Block {
	/**
	Create a new block in the world
	@constructor
	@param {String} name Name of the Block
	@param {Vector3} position Position of the Block in space
	@param {Number} orientation Orientation of the Block
	@param {Object} options Options regarding the creation of the Block
	@param {Geometry} options.geometry Geometry of the Block
	@param {Material} options.material Material of the Block
	@param {Array} options.inputs  Inputs  name, type, position and rotation
	@param {Array} options.outputs Outputs name, type, position and rotation
	@param {Array} options.labels Labels text, position, and rotation, is a interactible ?
	@param {Array} options.interactibles Interactibles geometry, material, position and rotation
	*/
	constructor(name, position, orientation, options){
		options = options || {};
		this.inputs  = [];
		this.outputs = [];
		this.labels  = [];
		this.inters  = [];

		var geometry = options.geometry,
				material = options.material;
		// if geometry or material are not set
		if(geometry == null) geometry = new THREE.BoxGeometry(1, 1, 1);
		if(material == null) material = new THREE.MeshLambertMaterial({});
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.name = name || "";
		if(position    != null) this.mesh.position.copy(position);
		if(orientation != null) this.mesh.rotateZ(orientation);

		var i;
		var inOpt  = options.inputs ,
				outOpt = options.outputs,
				labOpt = options.labels ,
				intOpt = options.interactibles;
		if(inOpt != null){
			for(i=0; i<inOpt.length; ++i){
				var inpin = new OMICRON.InPin(this, inOpt[i]);
				this.mesh.add(inpin.mesh);
				this.inputs.push(inpin);
			}
		}
		if(outOpt != null){
			for(i=0; i<outOpt.length; ++i){
				var outpin = new OMICRON.OutPin(this, outOpt[i]);
				this.mesh.add(outpin.mesh);
				this.outputs.push(outpin);
			}
		}
		if(labOpt != null){
			for(i=0; i<labOpt.length; ++i){
				var label = labOpt[i];
				// label can also be an interactible
				if(label.isInteractible) this.inters.push(label);
				this.labels.push(label);
			}
		}
		if(intOpt != null){
			for(i=0; i<intOpt.length; ++i){
				var interact = intOpt[i];

				this.inters.push(interact);
			}
		}

		// place block in the world
		this.isDestroy = false;
	}

	update(){

	}

	getValue(outpin){}

	interact(inter){}

	get Box(){
		var min = Util.cloneVector(this.mesh.position, -0.5),
				max = Util.cloneVector(this.mesh.position, +0.5);
		return new THREE.Box3(min, max);
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
