require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");


var command = process.argv[2];
var searchVal = process.argv[3];
var searchItem = process.argv;


//Switch Line

switch (command) {
    case "spotify-this-song":
        searchSpotify(searchItem);
        break;
    case "movie-this":
        omdbSearch(searchItem);
        break;
    case "concert-this":
        concertSearch(searchItem);
        break;
    case "do-what-it-says":
        whatItSays();
        break;
};

//Spotify - Struggling to get the whole thing to work.

function searchSpotify(searchItem) {
    var song = ""
    var spotify = new Spotify(keys.spotify);

    if (searchVal === undefined) {
        song = "Back in Black"
    } else {
        for (var i = 3; i < searchItem.length; i++) {
            if (i > 2 && i < searchItem.length) {
                song = song + "+" + searchItem[i];
            } else {
                song += searchItem[i];
            }
        }
    }

    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log("Error occurred: " + err)
        }


        var response = data.tracks.items[0];

        console.log("------Artists-----");
        for (i = 0; i < response.artists.length; i++) {
            console.log(response.artists[i].name);
        }
        console.log("------Song Name-----");
        console.log(response.name);

        console.log("-------Preview Link-----");
        console.log(response.preview_url);

        console.log("-------Album-----");
        console.log(response.album.name);

    });

}

//OMDB API - Struggling to get the default to work.

function omdbSearch() {

    var movieName = "";
    var searchItem = process.argv;

    if (searchVal === undefined) {
        movieName = "Mr. Nobody"
    } else {
        for (var i = 3; i < searchItem.length; i++) {
            if (i > 3 && i < searchItem.length) {
                movieName = movieName + "+" + searchItem[i];
            } else {
                movieName += searchItem[i]
            }
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
    var searchItem = process.argv;

    for (var i = 3; i < searchItem.length; i++) {
        if (i > 3 && i < searchItem.length) {
            artist = artist + "+" + searchItem[i];
        } else {
            artist += searchItem[i]
        }
    }

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";


    axios.get(queryUrl).then(
        function (response) {
            console.log("--------Venue-----------");
            console.log(response.data[0].venue.name);

            console.log("--------Location-----------");
            console.log(response.data[0].venue.city);

            console.log("--------Date-----------");
            console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));

        });


}

function whatItSays() {

    fs.readFile("random.txt", "utf-8", function (err, data) {


        if (err) {
            return console.log("Error occurred: " + err)
        }

        var dataArr = data.split(',');
        var dataSearch = dataArr[1].split(' ');
        var bandSearch = dataArr[1].split('+');

        if (dataArr[0] === "spotify-this-song") {

            var spotify = new Spotify(keys.spotify);

            spotify.search({ type: 'track', query: dataSearch }, function (err, data) {
                if (err) {
                    return console.log("Error occurred: " + err)
                }

                var response = data.tracks.items[0];

                console.log("------Artists-----");
                for (i = 0; i < response.artists.length; i++) {
                    console.log(response.artists[i].name);
                }
                console.log("------Song Name-----");
                console.log(response.name);

                console.log("-------Preview Link-----");
                console.log(response.preview_url);

                console.log("-------Album-----");
                console.log(response.album.name);

            });

        } else if (dataArr[0] === "movie-this") {
            
            var queryUrl = "http://www.omdbapi.com/?t=" + dataSearch + "&y=&plot=short&apikey=dec2caeb";


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
        
        } else if (dataArr[0] === "concert-this") {

            var queryUrl = "https://rest.bandsintown.com/artists/"+bandSearch+"/events?app_id=codingbootcamp";

            axios.get(queryUrl).then(
                function (response) {
                    console.log(response.data);
                    console.log("--------Venue-----------");
                    console.log(response.data[0].venue.name);
        
                    console.log("--------Location-----------");
                    console.log(response.data[0].venue.city);
        
                    console.log("--------Date-----------");
                    console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
        
                });

        } else if (err) {
            return console.log(error)
        }

    })
}


// searchSpotify("back in black")