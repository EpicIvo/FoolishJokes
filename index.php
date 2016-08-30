<?php

?>

<!doctype html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=0.4, maximum-scale=0.4, user-scalable=no" />
    <meta charset="UTF-8">
    <title>Foolish Jokes Development phase</title>
    <link href="style/style.css" type="text/css" rel="stylesheet">
</head>
<body>
<div id="likeStatus">
</div>

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
            <div class='betaText'><i>Development phase</i></div>
        </div>

        <div class="likeImageContainer" id="likeImageContainer">
            <img class="likeImage" id="likeImage" src="media/graylike.png"/>
        </div>

        <div id="joke" class="joke">

        </div>
        
        <div class="likesForm">
        	<form class="postLikes" id="postLikes" name="postLikes" method="post" action="<?= $_SERVER['REQUEST_URI']; ?>" >
        		<input id="jokeId" class="jokeId" name="jokeId" type="number" />
        		<input id="likesInput" class="likesInput" name="likesInput" type="number" />
        		<input type="hidden" name="form" value="selectForm" />
        	</form>
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