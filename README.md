ColourFinder
============

Lightweight Javascript library to extract the dominant colours from an image. Uses Prototype.js and Canvas.

Demo: http://www.craigmunro.net/ColourFinder/

Usage:
```
<script>
	var image = $("demo");

	// Create a new instance of ColourFinder
	var finder = new ColourFinder();
	
	// Find the dominant colour in the image. Returns a hex code, i.e: "0069ff".
	dominant = finder.getDominant(image);
	
	// Find the colour palette of the image. Returns an array of
	// hex codes and instances, i.e:
	// { "0069ff": 12, "0069aa": 14 }
	palette = finder.getPalette(image, 8);
	
	// Find the average colour of the image. Returns a hex code, i.e. "00fa30".
	average = finder.getAverage(image);	
</script>
```
