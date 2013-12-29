ColourFinder = new Class.create({
	
	initialize: function(args)
	{
		this.canvas = args.canvas;
		this.debug = $("debug");
		this.results = {};
		this.image = args.image;
		
		this.maxW = 640;
		this.maxH = 480;

		this.run();
	},
	
	run: function()
	{
		var img = new Image();
		new Event.observe(img, "load", this.loaded.bind(this));
		img.src = "proxy.php?t=" + this.image;
	},
	
	loaded: function(e)
	{
		var w = Math.min(this.maxW, e.target.width);
		var h = Math.min(this.maxH, e.target.height);

		this.canvas.width = w;
		this.canvas.height = h;

	    var ctx = this.canvas.getContext('2d');
	    ctx.drawImage(e.target, 0, 0, w, h);

		// Find pixels
		var pix = ctx.getImageData(0, 0, w, h).data;
		
		// accuracy level for colour groupings
		var acc = 25;
		
		// Loop over each pixel and find the colour.
		for (var i = 0, n = pix.length; i < n; i += 4)
		{
			var hex = this.rgbToHex(
				Math.round(pix[i] / acc) * acc,
				Math.round(pix[i+1] / acc) * acc,
				Math.round(pix[i+2] / acc) * acc
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
			if(i < 8)
			{
				new Insertion.Bottom(this.debug, new Element("span", { style: "background-color: #" + sortable[i][0] }).update("#" + sortable[i][0]));
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