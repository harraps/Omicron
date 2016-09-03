// Array to store pin material based on types
var mats = OMICRON.pinMaterials = [];
mats[null] = new THREE.MeshBasicMaterial({});
mats["boolean"] = new THREE.MeshLambertMaterial({color: 0xE84646, emissive: 0x5C1313});
mats["number" ] = new THREE.MeshLambertMaterial({color: 0x478FF5, emissive: 0x0D2445});
mats["string" ] = new THREE.MeshLambertMaterial({color: 0x40DB67, emissive: 0x0D421A});
mats["array"  ] = new THREE.MeshLambertMaterial({color: 0xF2AC49, emissive: 0x543912});
mats["color"  ] = new THREE.MeshLambertMaterial({color: 0xffffff, emissive: 0x000000});

/**
Octahedron shaped input pin
@class InPin
*/
class InPin {

	/**
	Create a input pin
	@constructor
	@param {Block} block The Block on which this pin is attached
	@param {Object} params The parameters of the pin
	@param {String} params.type The type of the pin, can be a String or a Number,
	 must be the exact same value on the corresponding Output Pin
	@param {String} params.name The name of the pin
	@param {Vector3} params.position The position of the pin relative to the Block
	@param {Vector3} params.rotation The rotation of the pin relative to the Block
	@param {Number} params.highColor The color of the wire when active
	@param {Number} params.lowColor The color of the wire when inactive
	*/
	constructor(block, params){
		params = params || {};

		if(typeof block === "undefined") throw new Error("Input Pin not connected to any block");
		var type = params.type,
				pos  = params.position,
				rot  = params.rotation;
		if(typeof type  === "undefined") type = null;

		this.id = InPin.ID++;
		// if the id is not safe anymore
		if( !Number.isSafeInteger(InPin.ID) )
			InPin.ID = Number.MIN_SAFE_INTEGER;

		this.block = block; // the block
		this.type  = type;  // the type of the pin
		this.value = null;  // value of the pin

		var geometry = OMICRON.InPin.geometry,
				material = OMICRON.pinMaterials[this.type];
		if(material == null) material = OMICRON.pinMaterials[null];
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.name = params.name || ""; // name of the pin
		//add the pin mesh to the block object3D
		this.block.object.add(this.mesh);
		if(pos != null) this.mesh.position.copy(pos);
		if(rot != null) this.mesh.rotation.copy(rot);

		var min = new THREE.Vector3(-0.05,-0.05,-0.05),
				max = new THREE.Vector3( 0.05, 0.05, 0.05);
		this.box = new THREE.Box3(min, max);
		this.box.translate(this.mesh.getWorldPosition());

		// color of the wire
		this.highColor = params.highColor || 0xFFFFFF;
		this.lowColor  = params.lowColor  || 0x000000;

		// width of the wire
		this.highWidth = params.highWidth || 1;
		this.lowWidth  = params.lowWidth  || 0.1;

		// geometry and material of the wire
		var geoLine = new THREE.Geometry(),
				matLine = new THREE.LineBasicMaterial(
					{color: this.lowColor, linewidth: this.lowWidth}
				);
		geometry.vertices.push(
			new THREE.Vector3(0,0,0),
			new THREE.Vector3(0,0,0)
		);
		this.wire = new THREE.Line(geoLine, matLine);
		this.mesh.add(this.wire); // attach the wire to the input pin

		//only one output pin connected
		this.outpin = null;
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
		var mat = this.wire.material;
		if(isHigh){
			if(isHigh instanceof THREE.Color){
				mat.color = isHigh;
			}else{
				mat.color = this.highColor;
			}
			mat.linewidth = this.highWidth;
		}else{
			mat.color     = this.lowColor;
			mat.linewidth = this.lowWidth;
		}
	}

	destroy(){
		this.disconnect();
		//remove from board
	}

	toJSON(){
		// we recover the id of the connected pin
		var connected = null;
		if(this.outpin != null)
			connected = this.outpin.id;
		return {
			id: this.id,
			co: connected,
		};
	}
}
InPin.ID = 0;
// Octahedron shape
InPin.geometry = new THREE.OctahedronGeometry(0.05);
OMICRON.InPin = InPin;

/**
Cone shaped output pin
@class OutPin
*/
class OutPin {
	/**
	Create a output pin
	@constructor
	@param {Block} block The Block on which this pin is attached
	@param {Object} params The parameters of the pin
	@param {String} params.type The type of the pin, can be a String or a Number,
	 must be the exact same value on the corresponding Output Pin
	@param {String} params.name The name of the pin
	@param {Vector3} params.position The position of the pin relative to the Block
	@param {Vector3} params.rotation The rotation of the pin relative to the Block
	*/
	constructor(block, params){
		params = params || {};

		if(typeof block === "undefined") throw new Error("Output Pin not connected to any block");
		var type = params.type,
				pos  = params.position,
				rot  = params.rotation;
		if(typeof type  === "undefined") type = null;

		this.id = OutPin.ID++;
		// if the id is not safe anymore
		if( !Number.isSafeInteger(OutPin.ID) )
			OutPin.ID = Number.MIN_SAFE_INTEGER;

		this.block = block; // the block
		this.type  = type;  // the type of the pin
		this.value = null;  // value of the pin

		var geometry = OMICRON.OutPin.geometry,
				material = OMICRON.pinMaterials[this.type];
		if(material == null) material = OMICRON.pinMaterials[null];
		this.mesh = new THREE.Mesh(geometry, material);
		this.mesh.name = params.name || "";
		//add the pin mesh to the block object3D
		this.block.object.add(this.mesh);
		if(pos != null) this.mesh.position.copy(pos);
		if(rot != null) this.mesh.rotation.copy(rot);

		var min = new THREE.Vector3(-0.05,-0.05,-0.05),
				max = new THREE.Vector3( 0.05, 0.05, 0.05);
		this.box = new THREE.Box3(min, max);
		this.box.translate(this.mesh.getWorldPosition());

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

	toJSON(){
		return {
			id: this.id,

		};
	}

}
OutPin.ID = 0;
// Pyramid shape
OutPin.geometry = new THREE.ConeGeometry(0.05, 0.1, 4);
OMICRON.OutPin = OutPin;
