
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
	var elements = this.shapes.map( function drawSingleShape( shape ) {
		return shape.draw( this, paper );
	}.bind( this ));

	return elements;
};

DiagramPart.prototype.joinTransform = function() {
	return dutil.stringifyCommandList( this.transform );
};

DiagramPart.prototype.getBoundingBox = function getBoundingBox() {
	var boundingBoxes = this.shapes
		.map( function( shape ) { return shape.boundingBox( this ); }.bind( this ))
		.filter( function( box ) { return !! box; })
		;

	if( boundingBoxes.length ) {
		return dutil.boundingBoxEncompassing( boundingBoxes );
	}
	else {
		return null;
	}
};
