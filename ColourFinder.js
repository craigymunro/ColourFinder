ColourFinder = new Class.create({
	
	initialize: function()
	{	
		this.maxW = 1024;
		this.maxH = 480;
		this.canvas = document.createElement("canvas");
		this.debug = $("debug");
		this.results = {};

		return;
	},

	getDominant: function(image)
	{
		this.getPalette(image, 1);
	},

	getAverage: function(image)
	{	
		var img = new Image();
		new Event.observe(img, "load", this.processAverage.bind(this));
		img.src = image.src;
	},

	processAverage: function(e)
	{
		var image = e.target;
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

		new Insertion.Bottom(this.debug, new Element("span", { style: "background-color: #" + hex }).update("Average: #" + hex));
	},
	
	getPalette: function(image, size)
	{
		var size = size ? size : 8;
		
		var img = new Image();
		new Event.observe(img, "load", this.processPalette.bind(this, size));
		img.src = image.src;
	},
	
	processPalette: function(size, e)
	{
		var image = e.target;
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
		var accuracy = 60;
		
		// Loop over each pixel and find the colour.
		for (var i = 0, n = pix.length; i < n; i += 4)
		{
			var hex = this.rgbToHex(
				Math.round(pix[i] / accuracy) * accuracy,
				Math.round(pix[i+1] / accuracy) * accuracy,
				Math.round(pix[i+2] / accuracy) * accuracy
			);
			
			this.results[hex] ? this.results[hex]++ : this.results[hex] = 1;
		}

		// Sort results by highest-first
		var sortable = [];
		for(hash in this.results)
		{
			sortable.push([hash, this.results[hash]])
		}
		sortable.sort(function(a, b) { return b[1] - a[1] });
		
		for(i = 0; i < sortable.length; i++)
		{
			if(i < size)
			{
				new Insertion.Bottom(this.debug, new Element("span", { style: "background-color: #" + sortable[i][0] }).update((size > 1 ? (i+1) + ". " : "") + "#" + sortable[i][0]));
			}
		}
	},

	componentToHex: function(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	},
	
	rgbToHex: function(r, g, b) {
	    return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
	}	
});