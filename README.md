ColourFinder
============

A small Javascript library that can extract the dominant colours from an image. Uses Prototype.js and Canvas.

Demo: http://www.craigmunro.net/ColourFinder

Usage:
```
<script>
// The image we'll be finding the palette for
var image = $("demo");

// Create a new instance of ColourFinder
var finder = new ColourFinder();

// Find the dominant colour in the image. Returns a single hex code, i.e: "0069ff".
dominant = finder.getDominant(image);

// Find the colour palette of the image. Returns an array of
// hex codes. Returns 10 colours by default.
// ["0069ff", "0069aa", "20ba20", etc]
palette = finder.getPalette(image, 10);

// Find the average colour of the image. Returns a single hex code, i.e. "00fa30".
average = finder.getAverage(image);
</script>
```
