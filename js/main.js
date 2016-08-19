/**
 * Created by ivovanderknaap on 19/08/2016.
 */

//Container to click on
var container = document.getElementById('container');

//divs in the joke
var jokeContent = document.createElement('div');
var jokeAuthor = document.createElement('div');
var joke = document.getElementById('joke');

//data variable
var jokeData;

var jokeNumber = 0;

function divideHeight(div, n) {
    return document.getElementById(div).clientHeight / n;
}

function calcMargin() {
    var containerHeight = divideHeight('container', 2);
    var jokeHeight = divideHeight('joke', 2);
    var titleHeight = divideHeight('title', 1);

    var margin = containerHeight - jokeHeight - titleHeight;

    joke.style.marginTop = margin + 'px';
}

window.addEventListener('load', init);

function init() {
    ajaxRequest();
}

function ajaxRequest() {

    var data = {};
    var request = new XMLHttpRequest();
    request.open('GET', 'http://10.0.1.2/FoolishJokes/php/index.php', true);
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

function processData(data) {
    console.log(data);
    jokeData = data;

    jokeContent.setAttribute('id', 'jokeContent');
    jokeContent.setAttribute('class', 'jokeContent');
    jokeContent.innerHTML = jokeData.jokes[jokeNumber].content;

    jokeAuthor.setAttribute('id', 'jokeAuthor');
    jokeAuthor.setAttribute('class', 'jokeAuthor');
    jokeAuthor.innerHTML = jokeData.jokes[jokeNumber].author;

    joke.appendChild(jokeContent);
    joke.appendChild(jokeAuthor);

    //calc margin
    calcMargin();

}

container.addEventListener('click', jokeClick);

function jokeClick() {
    jokeNumber++;
    jokeContent.style.transform = 'scale(1.2)';
    setTimeout(textSmall, 700);

}

function textSmall() {
    jokeContent.style.transform = 'scale(0)';
    jokeAuthor.style.transform = 'scale(0)';
    setTimeout(deleteJoke, 700);
}

function deleteJoke() {
    jokeContent.innerHTML = '';
    jokeAuthor.innerHTML = '';
    newJoke();
}

function newJoke() {
    jokeContent.innerHTML = jokeData.jokes[jokeNumber].content;
    jokeAuthor.innerHTML = jokeData.jokes[jokeNumber].author;
    calcMargin();
    setTimeout(textBig, 1000);
}

function textBig() {
    jokeContent.style.transform = 'scale(1)';
    jokeAuthor.style.transform = 'scale(1)';
}
