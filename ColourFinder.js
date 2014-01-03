ColourFinder = new Class.create({
	
	initialize: function()
	{	
		this.maxW = 1024;
		this.canvas = document.createElement("canvas");
		this.results = {};

		return;
	},

	getDominant: function(image)
	{
		this.getPalette(image, 1);
	},

	getAverage: function(image)
	{	
		var w = 1;
		var h = 1;

		this.canvas.width = w;
		this.canvas.height = h;
		
	    var ctx = this.canvas.getContext('2d');
	    ctx.drawImage(image, 0, 0, w, h);

		// Find pixels
		var pix = ctx.getImageData(0, 0, w, h).data;
						
		var hex = this.rgbToHex(
			pix[0],
			pix[1],
			pix[2]
		);
		
		return hex;
	},
	
	getPalette: function(image, size)
	{
		var size = size ? size : 10;
		
		var aspect = image.width / image.height;
		var w = Math.min(this.maxW, image.width);
		var h = Math.floor(w * aspect);
		
		this.canvas.width = w;
		this.canvas.height = h;

	    var ctx = this.canvas.getContext('2d');
	    ctx.drawImage(image, 0, 0, w, h);

		// Find pixels
		var pix = ctx.getImageData(0, 0, w, h).data;
		
		// accuracy level for colour groupings
		var accuracy = 35;
		
		// Loop over each pixel and find the colour.
		for (var i = 0, n = pix.length; i < n; i += 4)
		{
			var r = pix[i];
			var g = pix[i+1];
			var b = pix[i+2];
									
			var hex = this.rgbToHex(
				Math.round(r / accuracy) * accuracy,
				Math.round(g / accuracy) * accuracy,
				Math.round(b / accuracy) * accuracy
			);
			
			var hsl = this.rgbToHsl(r, g, b);
			var score = hsl[1];
			
			this.results[hex] ? this.results[hex] += score : this.results[hex] = score;
		}

		// Sort results by highest-first
		var sortable = [];
		for(hash in this.results)
		{
			sortable.push([hash, this.results[hash]])
		}
		sortable.sort(function(a, b) { return b[1] - a[1] });
		
		var returner = []
		
		if(size == 1)
		{
			return sortable[0][0];
		}
		
		for(i = 0; i < sortable.length; i++)
		{
			if(i < size)
			{
				returner.push(sortable[i][0]);
			}
		}
		
		return returner;
	},

	componentToHex: function(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	},
	
	rgbToHex: function(r, g, b) {
	    return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
	},

	// http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
	rgbToHsl: function(r, g, b) {	

	    r /= 255, g /= 255, b /= 255;
	    var max = Math.max(r, g, b), min = Math.min(r, g, b);
	    var h, s, l = (max + min) / 2;
	
	    if(max == min){
	        h = s = 0; // achromatic
	    } else {
	        var d = max - min;
	        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	        
	        switch(max) {
	            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	            case g: h = (b - r) / d + 2; break;
	            case b: h = (r - g) / d + 4; break;
	        }
	        h /= 6;
	    }
	
	    return [h, s, l];
	}
});