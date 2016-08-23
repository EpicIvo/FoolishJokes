<?php

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Foolish Jokes</title>
    <link href="style/style.css" type="text/css" rel="stylesheet">
</head>
<body>

<div class="logInContainer" id="logInContainer">
    <div class="logInFrame">

	<div class="fb-buttonContainer" id="fb-buttonContainer">
	
	<fb:login-button class="fb-button" scope="public_profile,email" data-size="xlarge" onlogin="checkLoginState();">
	</fb:loin-button>
	
	</div>
	
	<div class="status" id="status">
	</div>

    </div>
</div>

<div class="pageContainer">
    <div id='container' class="container">

        <div id='title' class="title">
            Foolish Jokes
        </div>

        <div class="likeImageContainer" id="likeImageContainer">
            <img class="likeImage" id="likeImage" src="media/graylike.png"/>
        </div>

        <div id="joke" class="joke">

        </div>

    </div>

    <div class="downImageContainer" id="downImageContainer">
        <img class='downImage' id="downImage" src="media/arrow.png">
    </div>

    <div class="uploadContainer" id="uploadContainer">

    </div>
</div>
<script src="js/main.js">
</script>
<script src="js/facebook.js">
</script>
</body>
</html>