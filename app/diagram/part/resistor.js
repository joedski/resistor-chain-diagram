var DiagramPart = require( '.' ).DiagramPart;
var shape = require( '../shape' );
var dutil = require( '../util' );

module.exports = Resistor;
function Resistor( name, options ) {
	DiagramPart.apply( this, arguments );

	this.resistance = options.resistance;

	this.shapes = [
		shape.path([
			[ 'M', 0, 0 ],
			[ 'L',
				0, 20,
				5, 25,
				-5, 35,
				5, 45,
				-5, 55,
				0, 60,
				0, 80
			]
		]),
		shape.text( [ -10, 35 ], {
			size: 15,
			// Note: This is one case where having 'left' and 'right' would actually be better.
			// This is because the text is always positioned to the left of the shape,
			// thus right-anchored text rather than end-anchored text
			// would guarantee not overlapping the shape.  Alas.
			align: 'end',
			// TODO: Use proper SI prefix (and show limited decimals) instead of using just ohms.
			text: this.name + '\n' + String( this.resistance ) + 'Ω'
		})
	];
}

Resistor.prototype = new DiagramPart( '', {} );

Resistor.prototype.anchors = {
	'a': [ 0, 0 ],
	'b': [ 0, 80 ]
};
