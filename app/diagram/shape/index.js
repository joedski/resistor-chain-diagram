
var dutil = require( '../util' );

exports.path = function createPath( pathCommands, options ) {
	return new Path( pathCommands, options );
};

exports.text = function createText( location, options ) {
	return new Text( location, options );
};

exports.circle = function createText( location, options ) {
	return new Circle( location, options );
};



////////

exports.Path = Path;
function Path( pathCommands, options ) {
	this.pathCommands = pathCommands;

	options = options || {};

	this.strokeWidth = (options.hasOwnProperty( 'strokeWidth' ) ? options.strokeWidth : 2);
	this.stroke = options.stroke || 'black';
	this.fill = options.fill || '';
}

Path.prototype.draw = function( part, paper ) {
	var stringifiedCommands = dutil.stringifyCommandList( this.pathCommands );

	var element = paper.path( stringifiedCommands );

	element.attr({
		'stroke-width': this.strokeWidth,
		'stroke-linejoin': 'round',
		'stroke-linecap': 'round',
		'fill': this.fill
	});

	element.transform( part.joinTransform() );

	return element;
};



////////

exports.Text = Text;
function Text( location, options ) {
	this.location = location;

	this.size = options.size || '12';
	this.align = options.align || 'start';
	this.fontFamily = options.fontFamily || 'sans-serif';
	this.text = options.text || '';
}

Text.prototype.draw = function( part, paper ) {
	var element = paper.text( this.location[ 0 ], this.location[ 1 ], this.text );

	element.attr({
		'text-anchor': this.align,
		'font-size': this.size,
		'font-family': this.fontFamily
	});

	element.transform( part.joinTransform() );

	return element;
};



////////

exports.Circle = Circle;
function Circle( location, options ) {
	this.location = location;

	this.radius = options.radius || NaN;
}

Circle.prototype.draw = function( part, paper ) {
	var element = paper.circle( this.location[ 0 ], this.location[ 1 ], this.radius );

	element.attr({
		'stroke-width': 2,
		'fill': 'black'
	});

	element.transform( part.joinTransform() );

	return element;
};
