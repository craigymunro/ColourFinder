<html>
<head>
	<title>ColourFinder</title>
	<script src="//ajax.googleapis.com/ajax/libs/prototype/1.7.1/prototype.js"></script>
	<script src="ColourFinder.js?v=<?=microtime(true)?>"></script>
</head>
<body>
	<style>
		* { box-sizing: border-box; }
		
		body
		{
			font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
			padding: 1.5em;
			color: #404040;
		}
		
		span
		{
			display: block;
			float: left;
			color: white;
			padding: .5em;
		}
		
		#debug,
		pre
		{
			clear: both;
			padding-top: 1em;
		}
		
		pre
		{
			background-color: #606060;
			color: white;
			font-family: monospace;
			padding: 1em;
		}
	</style>
	
	<h1>ColourFinder</h1>
	<p>Lightweight library to extract the dominant colour palette from an image. Uses Javascript and Canvas.</p>
	
	<? $image = $_GET["image"] ? $_GET["image"] : "http://www.craigmunro.net/ColourFinder/images/boston.gif"; ?>

	<form>
		<label>Enter an image URL:</label>
		<input name="image" placeholder="Select an image" value="<?=$image?>" style="width: 300px;"/>
		<button>Go</button>
	</form>
	
	<img src="<?=$image?>" height="400" id="demo"/>

	<div id="debug"></div>

<?
$usage = <<<USE
<script>
	var image = $("demo");

	var finder = new ColourFinder();
	dominant = finder.getDominant(image);
	palette = finder.getPalette(image, 8);
	average = finder.getAverage(image);	
</script>
USE;
?>

<h2>Usage:</h2>
<pre><?=htmlentities($usage);?></pre>

<?=$usage?>
</body>
</html>
