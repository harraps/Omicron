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

		this.object = new THREE.Object3D();
		this.object.name = name || "";
		if(position    != null) this.object.position.copy(position);
		if(orientation != null) this.object.rotateZ(orientation);

		var min = new THREE.Vector3(-0.5,-0.5,-0.5),
				max = new THREE.Vector3( 0.5, 0.5, 0.5);
		this.box = new THREE.Box3(min, max);
		this.box.translate(this.object.getWorldPosition());

		var i,
		mshOpt = options.meshes,
		typOpt = options.defaultType,
		inpOpt = options.inputs,
		outOpt = options.outputs,
		labOpt = options.labels,
		intOpt = options.interactibles;

		// generate the meshes representing the block
		if(mshOpt != null){
			for(i=0; i<mshOpt.length; ++i){
				var geometry = mshOpt.geometry,
						material = mshOpt.material,
						position = mshOpt.position,
						rotation = mshOpt.rotation;
				if(geometry != null && material != null){
					var mesh = new THREE.Mesh(geometry, material);
					this.object.add(mesh);
					if(position != null) mesh.position.copy(position);
					if(rotation != null) mesh.rotation.copy(rotation);
				}
			}
		}

		// generate the inputs pins
		if(inpOpt != null){
			for(i=0; i<inpOpt.length; ++i){
				var opt = inpOpt[i];
				// if the type of the input is not defined use, the default one
				if(opt.type == null) opt.type = typOpt || "boolean";
				var inpin = new OMICRON.InPin(this, opt);
				this.inputs.push(inpin);
			}
		}

		// generate the outputs pins
		if(outOpt != null){
			for(i=0; i<outOpt.length; ++i){
				var opt = outOpt[i];
				// if the type of the input is not defined use, the default one
				if(opt.type == null) opt.type = typOpt || "boolean";
				var outpin = new OMICRON.OutPin(this, opt);
				this.outputs.push(outpin);
			}
		}

		// generate the labels
		if(labOpt != null){
			for(i=0; i<labOpt.length; ++i){
				var opt   = labOpt[i],
						label = new THREE.Sprite();
				this.object.add(label);
				if(opt.position != null) label.position.copy(opt.position);
				this.labels.push(label);
			}
		}

		// generate the interactible parts
		if(intOpt != null){
			for(i=0; i<intOpt.length; ++i){
				var opt = intOpt[i];
				// default values
				var min = new THREE.Vector3(-0.1,-0.1,-0.1),
				    max = new THREE.Vector3( 0.1, 0.1, 0.1),
						pos = new THREE.Vector3();
				// values given by the options
				if(opt.min      != null) min.copy(opt.min);
				if(opt.max      != null) max.copy(opt.max);
				if(opt.position != null) pos.copy(opt.position);
				var inter = new THREE.Box3(min, max);
				inter.translate(pos);                            // local  position
				inter.translate(this.object.getWorldPosition()); // global position
				this.inters.push(inter);
			}
		}

		// place block in the world
		this.isDestroy = false;
	}

	update(){

	}

	getValue(outpin){}

	interact(inter){}

	destroy(){
		//remove block from board
		var i;
		// unregister the pins
		for(i=0; i<this.inputs .length; ++i) this.inputs [i].destroy();
		for(i=0; i<this.outputs.length; ++i) this.outpins[i].destroy();
		// unregister the interactibles
		//for(i=0; i<this.inters.length; ++i); //remove from world
	}

}
OMICRON.Block = Block;

// default mesh for blocks
var _mesh = {
	geometry: new THREE.BoxGeometry(1,0.1,1),
	material: new THREE.MeshLambertMaterial({color: 0xffcccc}),
	position: {x:0, y:-0.45, z:0},
};
// default label position
var _label = {
	position: {x:0, y:-0.25, z:0},
};
// default interaction zone
var _interactible = {
	min:      {x:-0.3, y:-0.14, z:-0.3},
	max:      {x: 0.3, y: 0.14, z: 0.3},
	position: {x: 0  , y:-0.25, z: 0  },
};

var _multipleInPins = [
	//top raw
	{position:{x:-0.3, y:-0.36, z:-0.2}},
	{position:{x:-0.1, y:-0.36, z:-0.2}},
	{position:{x: 0.1, y:-0.36, z:-0.2}},
	{position:{x: 0.3, y:-0.36, z:-0.2}},
	// bottom raw
	{position:{x:-0.3, y:-0.36, z:-0.4}},
	{position:{x:-0.1, y:-0.36, z:-0.4}},
	{position:{x: 0.1, y:-0.36, z:-0.4}},
	{position:{x: 0.3, y:-0.36, z:-0.4}},
];

var _multipleOutPins = [
	//top raw
	{position:{x:-0.3, y:-0.36, z:0.4}},
	{position:{x:-0.1, y:-0.36, z:0.4}},
	{position:{x: 0.1, y:-0.36, z:0.4}},
	{position:{x: 0.3, y:-0.36, z:0.4}},
	// bottom raw
	{position:{x:-0.3, y:-0.36, z:0.2}},
	{position:{x:-0.1, y:-0.36, z:0.2}},
	{position:{x: 0.1, y:-0.36, z:0.2}},
	{position:{x: 0.3, y:-0.36, z:0.2}},
];
