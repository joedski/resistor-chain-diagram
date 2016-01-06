Resistor Chain Diagram
======================

Silly little project to learn Marionette and RaphaelJS.

Given the resistance of a whole chain of resistors and a series of voltage steps, find the values of each of the resistors between each step.  Some day, maybe it will even use values from a particular E-series.



Thoughts: Two Way Binding?
--------------------------

### Case 1: Freeform Input with Value After Parsing Stored to Model

Assume that the parsed value is derived in a regular manner from the form input.  The input should not mangle what the User is entering, even while updating the Model live.  However, if the Model is updated not by User Input, then the Input's Value should be updated to reflect the Model.

Example:
- A control which accepts a list of numbers.
	- Suppose it is "5, 2, 0"
- In the Model, these are stored as an Array.
	- Suppose it is `[5, 2, 0]`
- User adds another number to the end of the list in the control by entering ", -5"
	- The View will fire 4 change events: "," " " "-" and "5"
	- The Model, after parsing of the value, sees only one change:
		- Old: `[5, 2, 0]`
		- New: `[5, 2, 0, -5]`
- If the input is overwritten, the User may lose their editing state.
- But, if the Model is changed by, for example, loading a saved Model from the server, the input _should_ be overwritten by the Model update.

There are a couple ways I could think of to fix this.
- Tag events coming from User Input, and Model Update Events which result from those.
	- If the Tag indicates it came from the particular User Input Event, then that Input Control does not update from the model.
- Ignore Model Changes to the Value that is derived from the Input Control if the User is editing it.
	- This has the advantage of not needing additional wiring in the form of Tags which must be passed around to all the reactions.
	- This requires somehow checking if the Control is Active or otherwise the thing the user is currently editing.
		- For Text Inputs and Text Areas (and Anchors...) a comparison to `document.activeElement` can be used.

### Case 2: Three Interdependent Inputs

Suppose a form has three inputs, where changing one effects a change in one or both of the others.
