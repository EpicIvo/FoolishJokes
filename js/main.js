/**
 * Created by ivovanderknaap on 19/08/2016.
 */

//Container to click on
var container = document.getElementById('container');

//divs in the joke
var jokeContent = document.createElement('div');
var jokeAuthor = document.createElement('div');
var jokeLikes = document.createElement('div');
var joke = document.getElementById('joke');
var button = document.getElementById('downImage');

//data variable
var jokeData;

// misc
var jokeNumber = 0;
var doubleClick = false;
var clicked = 0;
var alreadyClicked = false;

//like
var likeImage = document.getElementById('likeImage');
var liked = false;
var likesInput = document.getElementById('likesInput');
var jokeIdInput = document.getElementById('jokeId');
var postLikes = document.getElementById('postLikes');

//Login
var loggedIn = false;
var logIncontainer = document.getElementById('logInContainer');
var facebookButton = document.getElementById('fb-buttonContainer');

//Loop
var loopCounter = 0;
var secondClickListenerTimerID;

function divideHeight(div, n) {
    return document.getElementById(div).clientHeight / n;
}

window.addEventListener('load', init);

function init() {
    ajaxRequest();
}

function ajaxRequest() {

    var data = {};
    var request = new XMLHttpRequest();
    request.open('GET', 'http://www.foolishjokes.com/php/main.php', true);
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            console.log("Ajax request succes");
            data = JSON.parse(request.responseText);

            processData(data);

        } else {
            console.log("We reached our target server, but it returned an error")
        }
    };
    request.onerror = function () {
        console.log("There was a connection error of some sort");
    };
    request.send();

}

function calcMargin() {
    var containerHeight = divideHeight('container', 2);
    var jokeHeight = divideHeight('joke', 2);
    var titleHeight = divideHeight('title', 1);

    var margin = containerHeight - jokeHeight - titleHeight;

    joke.style.marginTop = margin + 'px';
}
function calcImageMargin() {

    var containerHeight = divideHeight('container', 2);
    var imageHeight = divideHeight('likeImage', 1);

    var imageMargin = containerHeight - imageHeight;

    likeImage.style.marginTop = imageMargin + 'px';

}

function processData(data) {
    console.log(data);
    jokeData = data;

    jokeContent.setAttribute('id', 'jokeContent');
    jokeContent.setAttribute('class', 'jokeContent');
    jokeContent.innerHTML = jokeData.jokes[jokeNumber].content;

    jokeAuthor.setAttribute('id', 'jokeAuthor');
    jokeAuthor.setAttribute('class', 'jokeAuthor');
    jokeAuthor.innerHTML = jokeData.jokes[jokeNumber].author;
    
    jokeLikes.setAttribute('id', 'jokeLikes');
    jokeLikes.setAttribute('class', 'jokeLikes');
    jokeLikes.innerHTML = jokeData.jokes[jokeNumber].likes;
	
    joke.appendChild(jokeContent);
    joke.appendChild(jokeAuthor);
    joke.appendChild(jokeLikes);

    //calc margin
    calcMargin();
    calcImageMargin();
}

container.addEventListener('click', clickDetected);

function clickDetected() {

    if (!alreadyClicked) {

        console.log("click");
        secondClickListenerTimerID = setInterval(secondClickListenerLoop, 200);

        function secondClickListenerLoop() {
            loopCounter++;
            if (loopCounter > 2) {
                console.log('next joke');
                clearInterval(secondClickListenerTimerID);
                loopCounter = 0;
                nextJoke();
                alreadyClicked = false;
            } else {
            }
        }

    }

    if (clicked == 1) {

        console.log('second click');

        loopCounter = 0;
        clearInterval(secondClickListenerTimerID);

        if (loopCounter < 2) {

            if (loggedIn) {
                console.log('you are now logged in');
	        facebookButton.style.display = 'none';
        	logIncontainer.style.visibility = 'hidden';
                like();
                container.removeEventListener('click', clickDetected);
                nextJoke();
                alreadyClicked = false;
                clearInterval(secondClickListenerTimerID);
                loopCounter = 0;
            }
            else {
            	facebookButton.style.display = 'block';
                logIncontainer.style.visibility = 'visible';
                loopCounter = 0;
                document.getElementById('status').innerHTML = 'Please log in to Facebook to like jokes!';
                
            }
        }
    } else {

        clicked += 1;
        alreadyClicked = true;
        jokeContent.style.transform = 'scale(1.2)';

        if (doubleClick) {

        } else {
            doubleClick = true;
        }
    }
}

function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function (response) {
        console.log('Successful login for: ' + response.name + ' id: ' + response.id + 'email: ' + response.email);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}

function like() {
    if (liked) {
        console.log("already liked");
    }
    else {
        console.log("like");
        jokeIdInput.value = jokeData.jokes[jokeNumber].id;
        likesInput.value = jokeData.jokes[jokeNumber].likes++;
        submitForm();
        liked = true;
        likeAnimation();
    }
}

function submitForm() {

    var http = new XMLHttpRequest();
    var params = "likes=" + jokeData.jokes[jokeNumber].likes + "&jokeId=" + jokeData.jokes[jokeNumber].id;
    http.open("POST", "/php/like.php", true);
    http.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
	    if(http.readyState == 4 && http.status == 200) {
		    var returnData = http.responseText;
	    }
    }
    http.send(params);
    http.onload = function() {
    }
    
    jokeIdInput.value = "";
    likesInput.value = "";
    liked = false;
}

function likeAnimation() {
    likeImage.style.transform = 'scale(40)';
    likeImage.style.opacity = '0';	
}

function nextJoke() {
    jokeNumber++;
    setTimeout(textSmall, 700);
}

function textSmall() {
    jokeContent.style.transform = 'scale(0)';
    jokeAuthor.style.transform = 'scale(0)';
    jokeLikes.style.transform = 'scale(0)';
    setTimeout(deleteJoke, 700);
}

function deleteJoke() {
    jokeContent.innerHTML = '';
    jokeAuthor.innerHTML = '';
    jokeLikes.innerHTML = '';
    clicked = 0;
    doubleClick = false;
    liked = false;
    likeImage.style.transform = 'scale(0)';
    newJoke();
}

function newJoke() {
    jokeContent.innerHTML = jokeData.jokes[jokeNumber].content;
    jokeAuthor.innerHTML = jokeData.jokes[jokeNumber].author;
    jokeLikes.innerHTML = jokeData.jokes[jokeNumber].likes;
    calcMargin();
    calcImageMargin();
    setTimeout(textBig, 1000);
}

function textBig() {
    jokeContent.style.transform = 'scale(1)';
    jokeAuthor.style.transform = 'scale(1)';
    jokeLikes.style.transform = 'scale(1)';
    likeImage.style.transform = 'scale(0)';
    setTimeout(newListener, 500);
}
function newListener(){
    container.addEventListener('click', clickDetected);
    likeImage.style.opacity = '1';
}