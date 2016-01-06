exports.isParsable = function isParsable( string ) {
	return /^(\-?([0-9]+\.?|\.[0-9]+|[0-9]+\.[0-9]+))([eE](\-?[0-9]+))?$|^(\-?([0-9]+\.?|\.[0-9]+|[0-9]+\.[0-9]+))\s*(Y|Z|E|P|T|G|M|k|da|d|c|m|u|µ|n|p|f|a|z|y)?$/.test( string );
}

exports.parseScalar = function parseScalar( string ) {
	var string = exports.stripUnit( string.replace( /^\s+|\s+$/g, '' ) );

	if( /[0-9\.][Ee][0-9]/.test( string ) ) {
		return exports.parseEngineering( string );
	}
	else {
		return exports.parseMetric( string );
	}
}

exports.parseEngineering = function parseEngineering( string ) {
	var matches = string.match( /^(\-?([0-9]+\.?|\.[0-9]+|[0-9]+\.[0-9]+))([eE](\-?[0-9]+))?$/ );

	var numeric = parseFloat( matches[ 1 ] );
	var factor = parseFloat( matches[ 4 ] || '0' );

	return numeric * Math.pow( 10, factor );
};

exports.parseMetric = function parseMetric( string ) {
	var matches = string.match( /^(\-?([0-9]+\.?|\.[0-9]+|[0-9]+\.[0-9]+))\s*(Y|Z|E|P|T|G|M|k|da|d|c|m|u|µ|n|p|f|a|z|y)?$/ );

	var numeric = parseFloat( matches[ 1 ] );
	var factor = factorOfMetricPrefix( matches[ 3 ] || '' );

	return numeric * Math.pow( 10, factor );
};

function factorOfMetricPrefix( unit ) {
	if( ! unit ) return 0;

	return {
		'Y': 24,
		'Z': 21,
		'E': 18,
		'P': 15,
		'T': 12,
		'G': 9,
		'M': 6,
		'k': 3,
		'da': 1,
		'd': -1,
		'c': -2,
		'm': -3,
		'u': -6,
		'µ': -6,
		'n': -9,
		'p': -12,
		'f': -15,
		'a': -18,
		'z': -21,
		'y': -24
	}[ unit ] || NaN;
}

exports.stripUnit = function stripUnit( string ) {
	return string.replace( /(Y|Z|E|P|T|G|M|k|da|d|c|m|u|µ|n|p|f|a|z|y)?[a-zA-ZΩ]*$/, '$1' );
};
