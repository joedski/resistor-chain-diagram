var DiagramPart = require( '.' ).DiagramPart;
var shape = require( '../shape' );
var dutil = require( '../util' );

module.exports = BottomRail;
function BottomRail( name, options ) {
	DiagramPart.apply( this, arguments );

	this.voltage = options.voltage;

	this.shapes = [
		shape.path([
			[ 'M', 0, 0 ],
			[ 'L', 0, 20 ],
			[ 'M', -20, 20 - railWidth / 2 ],
			[ 'L',
				-20, 20 + railWidth / 2,
				20, 20 + railWidth / 2,
				20, 20 - railWidth / 2
			],
			[ 'Z' ]
		], {
			fill: 'black'
		}),
		shape.text( [ 0, 32.5 ], {
			size: 15,
			align: 'middle',
			text: String( this.voltage ) + 'V'
		})
	];
}

BottomRail.prototype = new DiagramPart( '', {} );

BottomRail.prototype.anchors = {
	'a': [ 0, 0 ]
};
