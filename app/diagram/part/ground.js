var DiagramPart = require( '.' ).DiagramPart;
var shape = require( '../shape' );
var dutil = require( '../util' );

module.exports = Ground;
function Ground( name, options ) {
	DiagramPart.apply( this, arguments );

	this.shapes = [
		shape.path([
			[ 'M', 0, 0 ],
			[ 'L', 0, 20 ],
			[ 'M', -20, 20 ],
			[ 'L', 20, 20 ],
			[ 'M', -12.5, 30 ],
			[ 'L', 12.5, 30 ],
			[ 'M', -5, 40 ],
			[ 'L', 5, 40 ]
		])
	];
}

Ground.prototype = new DiagramPart( '', {} );

Ground.prototype.anchors = {
	'a': [ 0, 0 ]
};
