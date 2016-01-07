
var shape = require( '../shape' );
var dutil = require( '../util' );

exports.DiagramPart = DiagramPart;

exports.BottomRail = require( './bottom-rail' );
exports.Ground = require( './ground' );
exports.Node = require( './node' );
exports.Output = require( './output' );
exports.Resistor = require( './resistor' );
exports.TopRail = require( './top-rail' );



////////

function DiagramPart( name, options ) {
	this.name = name;

	this.transform = [];
	this.shapes = [];
}

DiagramPart.prototype.transform = null;
DiagramPart.prototype.shapes = null;
DiagramPart.prototype.anchors = {};

DiagramPart.prototype.drawToPaper = function drawToPaper( paper ) {
	var elements = this.shapes.forEach( function drawSingleShape( shape ) {
		return shape.draw( this, paper );
	}.bind( this ));
};

DiagramPart.prototype.joinTransform = function() {
	return dutil.stringifyCommandList( this.transform );
};

DiagramPart.prototype.getBoundingBox = function getBoundingBox() {
	// Get all non-Text shapes.
	// Path:
	// - Raphael.transformPath()
	// - Raphael.pathBBox()
	// Circle:
	// - Raphael.transformPath on proxy box.
	// - create BB from proxy. (make sure has width = 2*radius, centered on proxy box.)
	// Text:
	// - Ignore for our purposes.
};
