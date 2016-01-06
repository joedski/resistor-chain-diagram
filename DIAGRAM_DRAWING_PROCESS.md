Drawing Out Diagrams
====================

Major Steps:
- Create diagram logical parts
- Link logical parts together
- Convert logical parts into SVG shapes:
	- Convert each item into SVG shape.
	- Position each shape relative to the shapes of the items this one is linked to.
		- Since my diagram doesn't have to deal with cyclical links, I can use this:
			- Start at first part.
				- Draw part's shape.
				- Position part's shape relative to previous part's shape, according to archors.
					- First part has no previous part, therefore position it centered.
			- Second part.
				- Draw part's shape.
				- Position part's shape relative to previous part's shape, according to anchors.
			- And so on.
- In Raphael, shapes are already on the Paper and so do not need to be added.

It might be clearer to view this as a set of shapes and a set of linkages between them.  Like in a DB.  Curious how that keeps coming up.

So we'll have Parts:
- V+, #A: Positive Voltage Source
- N1, #A: Node 1
- OUT1, #A: Output 1
- R1, #A, #B: Resistor 1
- N2, #A: Node 2
- etc...

And Linkages:
- V+#A -- N1#A
- N1#A -- OUT1#A
- N1#A -- R1#A
- R1#B -- N2#A

Then, the processes of rendering and arranging could be done in two separate parts rather than interleaved.  Same effect either way.  Of course, there's no reason the linkages cannot be looked up between rendering parts to draw commands, it makes no difference there.

### Example:

Items:
- Positive Voltage Source: V+, #A
	- No previous connections.
- Node 1: N1, #A
	- #A = V+#A
- Output 1: OUT1, #A
	- #A = N1#A
- R1, #A, #B
	- #A = N1#A
- Node 2: N2, #A
	- #A = R1#B (Note here this connection to #B not #A)
- Output 2: OUT1, #A
	- #A = N2#A
- R2, #A, #B
	- #A = N2#A
- etc...

Drawing:
- VS is drawn first.
	- Nothing was drawn before VS, so VS is left at 0.
- N1 is drawn next.
	- VS was drawn previously, so N1 is positioned so its #A is at VS#A.
- OUT1 is drawn.
	- N1 is the previous...



Actual Drawing Process
----------------------

> Need to read up on moving entities around in Raphael, because that will determine how easy this is.
