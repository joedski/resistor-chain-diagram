var DiagramPart = require( '.' ).DiagramPart;
var shape = require( '../shape' );
var dutil = require( '../util' );

module.exports = Output;
function Output( name, options ) {
	DiagramPart.apply( this, arguments );

	this.voltage = options.voltage;

	this.shapes = [
		shape.path([
			[ 'M', 0, 0 ],
			[ 'L', 20, 0 ],
			[ 'M', 20, 10 ],
			[ 'L',
				40, 0,
				20, -10
			],
			[ 'Z' ]
		]),
		shape.text( [ 45, 0 ], {
			size: 15,
			align: 'start',
			text: String( this.voltage ) + 'V'
		})
	];
}

Output.prototype = new DiagramPart( '', {} );

Output.prototype.anchors = {
	'a': [ 0, 0 ]
};
