
var part = require( './part' );
var util = require( './util' );



// model: { resistorValues, voltageValues }

exports.drawDiagram = drawDiagram;
function drawDiagram( paper, model ) {
	var drawing = createDrawing( model );
	arrangeDrawing( drawing );
	drawToPaper( paper, drawing );

	return paper;
}



////////
/// Drawing Parts

function createDrawing( model ) {
	var drawing = {
		parts: [],
		arrangements: []
	};

	var resistorValues = model.resistorValues;
	var voltageValues = model.voltageValues.slice( 0, model.voltageValues.length - 1 );
	var bottomRailVoltageValue = model.voltageValues[ model.voltageValues.length - 1 ];

	var vi = 0, vlength = 0;

	addTopRail( drawing, voltageValues[ 0 ] );

	for( vi = 0, vlength = resistorValues.length; vi < vlength; ++vi ) {
		addVoltageLevelAndResistor( drawing, voltageValues[ vi ], resistorValues[ vi ], vi + 1 );
	}

	addBottomRail( drawing, bottomRailVoltageValue );

	return drawing;
}

function addTopRail( drawing, voltage ) {
	drawing.parts.push( new part.TopRail( 'V+', {
		voltage: voltage
	}) );
}

function addVoltageLevelAndResistor( drawing, voltage, resistance, humanReadableIndex ) {
	// Previous Shapes
	var previousPart = lastRailOrResistor( drawing.parts );
	var previousPartAnchor = (part instanceof part.Resistor) ? 'b' : 'a';

	// Shapes to add
	var indexString = String( humanReadableIndex );
	var voltageOutput = new part.Output( 'V' + indexString, { voltage: voltage } );
	var resistor = new part.Resistor( 'R' + indexString, { resistance: resistance } );
	var node = new part.Node( 'N' + indexString );

	drawing.parts.push( voltageOutput );
	drawing.parts.push( resistor );
	drawing.parts.push( node );

	drawing.arrangements.push([
		{ part: previousPart, anchor: previousPartAnchor },
		{ part: node, anchor: 'a' },
	]);
	drawing.arrangements.push([
		{ part: node, anchor: 'a' },
		{ part: resistor, anchor: 'a' },
	]);
	drawing.arrangements.push([
		{ part: node, anchor: 'a' },
		{ part: voltageOutput, anchor: 'a' },
	]);
}

function addBottomRail( drawing, voltage ) {
	// Previous Shapes
	var previousPart = lastRailOrResistor( drawing.parts );
	var previousPartAnchor = (part instanceof part.Resistor) ? 'b' : 'a';

	var bottomRail;

	if( voltage === 0 ) {
		bottomRail = new part.Ground( 'V-', {} );
	}
	else {
		bottomRail = new part.BottomRail( 'V-', { voltage: voltage } );
	}

	drawing.parts.push( bottomRail );

	drawing.arrangements.push([
		{ part: previousPart, anchor: previousPartAnchor },
		{ part: bottomRail, anchor: 'a' }
	]);
}

function lastRailOrResistor( parts ) {
	var onlyTopRailOrResistors = parts.filter( function isRailOrResistor( part ) {
		return (part instanceof part.TopRail) || (part instanceof part.Resistor);
	});

	return onlyTopRailOrResistors[ onlyTopRailOrResistors.length - 1 ];
}



////////
/// Arrangement

/*
An arrangement is an array with two objects,
one the originating piece, and one the piece to be moved.

Both objects have two properties:
- part :Part referencing the Part.
- anchor :String naming the anchor on the Part.

```js
[
	{ part: Part, anchor: String },
	{ part: Part, anchor: String }
]
```

 */

function arrangeDrawing( drawing ) {
	drawing.arrangements.forEach( applyArrangement );
}

function applyArrangement( arrangement ) {
	var destination = arrangement[ 0 ];
	var arrangee = arrangement[ 1 ];

	var destinationAnchorLocation = destination.part.anchors[ destination.anchor ]
	var destinationAnchorTransformed =
		util.transformPoint( destination.part.transform, destinationAnchorLocation );

	var arrangeeAnchorLocation = arrangee.part.anchors[ arrangee.anchor ];
	var arrangeeAnchorTransformed =
		util.transformPoint( arrangee.part.transform, arrangeeAnchorLocation );

	var delta = [
		destinationAnchorTransformed[ 0 ] - arrangeeAnchorTransformed[ 0 ],
		destinationAnchorTransformed[ 1 ] - arrangeeAnchorTransformed[ 1 ]
	];

	arrangee.part.transform.push( [ 'T' ].concat( delta ) );

	return delta;
}



////////
/// Draw to Paper

function drawToPaper( paper, drawing ) {
	// Get bounding box of paths
	// Add transform (to each part) to center bounding box
	// Draw paths to drawing

	var boundingBoxes = drawing.parts
		.map( function boundingFoxesForPart( part ) {
			return part.getBoundingBox();
		})
		.filter( function onlyNonNull( boundingBox ) {
			return !! boundingBox;
		})
		;

	var combinedBoundingBox = util.boundingBoxEncompassing( boundingBoxes );

	if( ! combinedBoundingBox ) {
		console.warn( "Drawing generated no bounding box!  It may be composed entirely of text." );

		combinedBoundingBox = { width: 0, height: 0 };
	}

	// Most accurate instantaneous view box is this, I think,
	// though this isn't identical to svgEl.viewBox.baseVal.width and height.
	// Those are 0 when nothing is in the svg Element.
	var viewBox = {
		x: paper.canvas.x.baseVal,
		y: paper.canvas.y.baseVal,
		width: paper.width,
		height: paper.height
	};

	var targetOrigin = {
		x: viewBox.width  - combinedBoundingBox.width,
		y: viewBox.height  - combinedBoundingBox.height
	};

	var translation = [
		'T',
		targetOrigin.x - (('x' in combinedBoundingBox) ? combinedBoundingBox.x : targetOrigin.x),
		targetOrigin.y - (('y' in combinedBoundingBox) ? combinedBoundingBox.y : targetOrigin.y)
	];

	drawing.parts.forEach( function addTranslation( part ) {
		part.transform.push( translation );
	});

	var elements = drawing.parts
		.map( function drawPartToPaper( part ) {
			return part.drawToPaper( paper );
		})
		.reduce( function concatDrawnElements( allElements, elementsList ) {
			return elements.concat( elementsList );
		}, [] )
		;

	return elements;
}
