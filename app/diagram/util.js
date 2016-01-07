
/*
Transform a command in the form of [ name, args ] into 'nameA,A,A,A...'.
 */
exports.stringifyCommand = stringifyCommand;
function stringifyCommand( svgCommand ) {
	var name = svgCommand[ 0 ];
	var args = svgCommand.slice( 1 );

	// I don't know that shortening ",-" to just "-" is necessary
	// but it shows up that way everywhere I've looked so oh well.
	args = args
		.join( ',' )
		.replace( /,-/g, '-' )
		;

	return (name + args);
}

/*
Transform a list o commands each in the form of [ name, args ] into 'nameA,AnameA,A...'
 */
exports.stringifyCommandList = stringifyCommandList;
function stringifyCommandList( svgCommandList ) {
	var commandString = svgCommandList
		.map( stringifyCommand )
		.join( '' )
		;

	return commandString;
}

exports.pointLocalToGlobal = exports.transformPoint = transformPoint;
function transformPoint( transform, point, contextPath ) {
	contextPath = contextPath || [];

	var matrix = Raphael.toMatrix( contextPath, transform );

	return [
		matrix.x( point[ 0 ], point[ 1 ] ),
		matrix.y( point[ 0 ], point[ 1 ] )
	];
}

exports.pointGlobalToLocal = exports.untransformPoint = untransformPoint;
function untransformPoint( transform, point, contextPath ) {
	contextPath = contextPath || [];

	var matrix = Raphael.toMatrix( contextPath, transform );
	var inverseMatrix = matrix.invert();

	return [
		inverseMatrix.x( point[ 0 ], point[ 1 ] ),
		inverseMatrix.y( point[ 0 ], point[ 1 ] )
	];
}

exports.boundingBoxEncompassing = boundingBoxEncompassing;
function boundingBoxEncompassing( boundingBoxList ) {
	var firstBox = boundingBoxList[ 0 ];
	var restBoxes = boundingBoxList.slice( 1 );

	return restBoxes.reduce( function combineBoxes( combined, smaller ) {
		var newCombined = {
			x: Math.min( combined.x, smaller.x ),
			y: Math.min( combined.y, smaller.y ),
			x2: Math.max( combined.x2, smaller.x2 ),
			y2: Math.max( combined.y2, smaller.y2 )
		};

		newCombined.width = Math.abs( newCombined.x2 - newCombined.x );
		newCombined.height = Math.abs( newCombined.y2 - newCombined.y );

		return newCombined;
	}, firstBox );
}
