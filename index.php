<html>
<head>
	<title>ColourFinder</title>
	<script src="//ajax.googleapis.com/ajax/libs/prototype/1.7.1/prototype.js"></script>
	<script src="ColourFinder.js?v=<?=microtime(true)?>"></script>
</head>
<body>
	<style>
		span
		{
			display: block;
			float: left;
			color: white;
			padding: .5em;
		}
		
		canvas
		{
			clear: both;
		}
		
		#debug
		{
			padding-top: 1em;
		}
	</style>
	
	<h1>ColourFinder</h1>
	<p>Lightweight library to extract the dominant colour palette from an image. Uses Javascript and Canvas.</p>
	
	<? $demo = "http://www.craigmunro.net/ColourFinder/images/boston.gif"; ?>

	<form>
		<label>Enter an image URL:</label>
		<input name="image" placeholder="Select an image" value="<?=$demo?>" style="width: 300px;"/>
		<button>Go</button>
	</form>

	<canvas id="output"></canvas>

	<div id="debug"></div>

	<script>
		var colourfinder = new ColourFinder(
			{
				canvas: $("output"),
				image: "<?=$_GET["image"] ? $_GET["image"] : $demo ?>"
			}
		);
	</script>
</body>
</html>
