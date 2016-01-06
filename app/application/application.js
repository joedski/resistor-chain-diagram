var View = require( './view' );
var units = require( 'util/units' );
var resistorChain = require( 'util/resistor-chain' );

module.exports = Marionette.Application.extend({
	viewEvents: {
		'update:chainresistance': function( chainResistanceText ) {
			var chainResistance = units.parseScalar( chainResistanceText );

			this.model.set( 'chainResistance', chainResistance );
			this.updateResistors();
		},
		'update:voltagesteps': function( voltageStepsText ) {
			var voltageSteps = voltageStepsText
				.split( ',' )
				.map( function( string ) { return string.replace( /^\s*|\s*$/g, '' ); })
				.filter( units.isParsable )
				.map( units.parseScalar )
				;

			this.model.set( 'voltageSteps', voltageSteps );
			this.updateResistors();
		}
	},

	start: function( options ) {
		// ...

		this.model = new Backbone.Model({
			chainResistance: 10e3,
			voltageSteps: [ 5, 2, 1, 0 ],
			resistors: []
		});

		this.updateResistors();

		// For now the view is static so it fills in its own regions
		// using existing HTML.
		this.view = new View({
			el: '#application',
			model: this.model
		});

		this.bindEntityEvents( this.view, this.viewEvents );

		// this.view.triggerMethod( 'before:show' );
		this.view.render();
	},

	updateResistors: function() {
		var chainResistance = this.model.get( 'chainResistance' ),
			voltageSteps = this.model.get( 'voltageSteps' ),
			resistors = resistorChain( chainResistance, voltageSteps );

		this.model.set( 'resistors', resistors );
	},
});
