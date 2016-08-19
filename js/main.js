/**
 * Created by ivovanderknaap on 19/08/2016.
 */
window.addEventListener('load', init);

function init() {
    ajaxRequest();
}

function ajaxRequest() {

    var data = {};
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost/FoolishJokes/php/index.php', true);
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

    for(var i = 0; i < data.jokes.length; i++){
        
        var joke = document.getElementById('joke');

        var jokeTitle = document.createElement('div');
        jokeTitle.setAttribute('id', 'jokeTitle');
        jokeTitle.setAttribute('class', 'jokeTitle');
        jokeTitle.innerHTML = data.jokes[i].title;

        var jokeContent = document.createElement('div');
        jokeContent.setAttribute('id', 'jokeContent');
        jokeContent.setAttribute('class', 'jokeContent');
        jokeContent.innerHTML = data.jokes[i].content;

        var jokeAuthor = document.createElement('div');
        jokeAuthor.setAttribute('id', 'jokeAuthor');
        jokeAuthor.setAttribute('class', 'jokeAuthor');
        jokeAuthor.innerHTML = data.jokes[i].author;
        
        joke.appendChild(jokeTitle);
        joke.appendChild(jokeContent);
        joke.appendChild(jokeAuthor);


    }
    
    
}
