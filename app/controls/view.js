
module.exports = Marionette.ItemView.extend({
	template: false,

	// Not necessary but doing it anyway.
	ui: {
		'chainResistanceInput': '#inputChainResistanceValue',
		'voltageStepsInput': '#inputVoltageValues'
	},

	// yay I used the ui hash yay
	events: {
		'change @ui.chainResistanceInput': 'triggerUpdateChainResistance',
		// 'keydown @ui.chainResistanceInput': 'triggerUpdateChainResistance',
		'paste @ui.chainResistanceInput': 'triggerUpdateChainResistance',
		'input @ui.chainResistanceInput': 'triggerUpdateChainResistance',
		'change @ui.voltageStepsInput': 'triggerUpdateVoltageSteps',
		// 'keydown @ui.voltageStepsInput': 'triggerUpdateVoltageSteps',
		'paste @ui.voltageStepsInput': 'triggerUpdateVoltageSteps',
		'input @ui.voltageStepsInput': 'triggerUpdateVoltageSteps',
	},

	triggerUpdateVoltageSteps: function() {
		this.triggerMethod( 'update:voltagesteps', this.$( this.ui.voltageStepsInput ).val() );
	},

	triggerUpdateChainResistance: function() {
		this.triggerMethod( 'update:chainresistance', this.$( this.ui.chainResistanceInput ).val() );
	},
});
