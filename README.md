ColourFinder
============

Lightweight Javascript library to extract the dominant colours from an image. Uses Prototype.js and Canvas.

Demo: http://www.craigmunro.net/ColourFinder/

Usage:
```
<script>
	var image = $("demo");

	var finder = new ColourFinder();
	dominant = finder.getDominant(image);
	palette = finder.getPalette(image, 8);
	average = finder.getAverage(image);	
</script>
```
