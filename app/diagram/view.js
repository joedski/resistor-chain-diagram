
module.exports = Marionette.ItemView.extend({
	template: false,

	modelEvents: {
		change: 'render'
	},

	onRender: function() {
		console.log( 'diagram/view:', this.model.get( 'resistors' ));
	},
});
