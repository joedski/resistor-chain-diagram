var ControlsView = require( '../controls/view' );
var DiagramView = require( '../diagram/view' );

module.exports = Marionette.LayoutView.extend({
	template: false,

	regions: {
		controls: '#controls',
		diagram: '#diagram'
	},

	childEvents: {
		'update:chainresistance': function( controlsView, chainResistanceText ) {
			this.triggerMethod( 'update:chainresistance', chainResistanceText );
		},
		'update:voltagesteps': function( controlsView, voltageStepsText ) {
			this.triggerMethod( 'update:voltagesteps', voltageStepsText );
		},
	},

	onRender: function() {
		this.controls.show( new ControlsView({
			el: this.$( '#controls' ).children().first(),//.detach(),
			model: this.model
		}));

		this.diagram.show( new DiagramView({
			el: this.$( '#diagram' ).children().first(),//.detach(),
			model: this.model
		}));
	},
});
