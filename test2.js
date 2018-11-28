var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "79c8d24104ff4d41b11d421e62bf09da",
  secret: "6fdf07dfe1a3489b82adec8d9bfed430"
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});