Math.PI2 = Math.PI*2;
Math.HPI = Math.PI*0.5;
Math.QPI = Math.PI*0.25;

OMICRON.Util = {
	/**
	Clone the vector
	*/
	cloneVector: function(vector, padding){
		return new THREE.Vector3(
			vector.x + padding,
			vector.y + padding,
			vector.z + padding
		);
	},
	/**
	Remove element from given list
	*/
	listRemove: function(list, element){
		var index = list.indexOf(element);
		if(index > -1) list.splice(index, 1);
		return list;
	},
	/**
	Return an angle value which is keep along the Z-axis or the X-axis
	*/
	clampAngle : function(angle){
		if(typeof angle !== "number") return null;
		// we use the sin and cos of the angle
		var sin = Math.sin(angle),
				cos = Math.cos(angle);
		// if sin is greater -> Z-axis
		if( Math.abs(sin) > Math.abs(cos) ){
			// if sin positive -> Z+, Z- otherwise
			if(sin > 0) return  Math.HPI;
			else 				return -Math.HPI;
		}else{ // cos is greater -> X-axis
			// if cos positive -> X+, X- otherwise
			if(cos > 0) return 0;
			else        return Math.PI;
		}
	},
};
