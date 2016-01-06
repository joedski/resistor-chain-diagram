var DiagramPart = require( '.' ).DiagramPart;
var shape = require( '../shape' );
var dutil = require( '../util' );

module.exports = Node;
function Node( name, options ) {
	DiagramPart.apply( this, arguments );

	this.shapes = [
		shape.circle( [ 0, 0 ], {
			radius: 3
		})
	];
}

Node.prototype = new DiagramPart( '', {} );

Node.prototype.anchors = {
	'a': [ 0, 0 ]
};
