require("dotenv").config();
var keys = require("./keys.js");
var spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var bandsintown = require("bandsintown");


var command = process.argv[2];
var searchVal = process.argv[3];


for (var i = 4; i < process.argv.length; i++) {
    searchVal += process.argv[i] + "+";
};

//Spotify - Struggling to get the whole thing to work.

function searchSpotify() {
    if (song == "") {
        song = "The Sign Ace of Base"
    }

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err)
        }

        //var spotify = new Spotify(keys.spotify);

        var song = data.tracks.items[0];

        console.log("------Artists-----");
        for (i = 0; i < song.artists.length; i++) {
            console.log(song.artists[i].name);
        }

        console.log("------Song Name-----");
        console.log(song.name);

        console.log("-------Preview Link-----");
        console.log(song.preview_url);

        console.log("-------Album-----");
        console.log(song.album.name);

    });

}

//OMDB API - Struggling to get the default to work.

function omdbSearch() {

    var movieName = "";
    var nodeArgs = process.argv;

        for (var i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                movieName = movieName + "+" + nodeArgs[i];
            } else {
                movieName += nodeArgs[i]
            }
        }
    

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=dec2caeb";


    axios.get(queryUrl).then(
        function (response) {
            console.log("--------Title-----------");
            console.log(response.data.Title);

            console.log("--------Year -----------");
            console.log(response.data.Year);

            console.log("--------Rotten Tomato Rating-----------");
            console.log(response.data.Ratings[1]);

            console.log("--------IMDB Rating-----------");
            console.log(response.data.imdbRating);

            console.log("--------Country Produced-----------");
            console.log(response.data.Country);

            console.log("--------Languages-----------");
            console.log(response.data.Language);

            console.log("--------Plot----------------");
            console.log(response.data.Plot);

            console.log("--------Actors-----------");
            console.log(response.data.Actors);
        });

}

//Bands in Town API

function concertSearch() {
    var artist = "";
    var nodeArgs = process.argv;

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i];
        } else {
            artist += nodeArgs[i]
        }
    }
    
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    

    console.log(queryUrl);

}

//Switch Line

switch (command) {
    case "spotify-this-song":
        searchSpotify();
        break;
    case "movie-this":
    if (searchVal === undefined){
        movieName == "Mr. Nobody"
    } else {
        omdbSearch();
    }
        break;
    case "concert-this":
        concertSearch();
        break;
}