# liri-bot

The Liri Bot is a command line application that allows the user to search for songs, movies, and concerts. The Liri Bot utilizes the Spotify API to search for music, the OMDB API to search for movies, and the Bands in Town API to search for touring bands.

To use the application, the user will have to install Node.js (if it is not already installed), and then using his/her terminal, navigate to the folder where the liri.js file resides. Once there, the user can enter one of the following commands: spotify-this-song, movie-this, concert-this, or do-what-it-says.

spotify-this-song (name of a song):
This command will pull information for the user's song choice from Spotify's API and print it out to the terminal.It will return the name of the song, the artist, a link to a sample of the song, and finally what album the song appears on. If the user chooses not to enter a song title, the program will automatically search for Back in Black by AC/DC. It is important to note that the user will have to supply his/her own spotify ID and spotify SECRET. The user can obtain these by following the directions in this link: https://developer.spotify.com/documentation/general/guides/authorization-guide/

movie-this (name of a movie):
This command will pull information for the user's movie choice from the OMDB API and print it out to the terminal.It will return the name of the movie, the year it was made, the Rotten Tomato rating, the IMDB rating, the country it was produced in, its languages, the plot and a list of the actors that appear in the movie. If the user chooses not to enter a movie title, the program will automatically search for Mr. Nobody. It is important to note that the user may need to supply an API key to access the OMDB API. The user can obtain that by going to this link: http://www.omdbapi.com/apikey.aspx

concert-this (name of an artist/band):
This command will pull information for the user's artist/band choice from the Bands in Town API and print it out to the terminal.It will return the venue of the event, the location of the venue, and the date/time of the event. The date/time of the event is printed out to the terminal with the help of the moment package. Without the moment package, the date/time would be printed out in such a way where the user would have a tough time reading it.

do-what-it-says:
Using the fs package this command will read from a file called "random.txt". The user can enter any one of the commands that he/she wants in the random.txt file in the following way - "command, name of song/movie/band". It is important for the user to put a comma between the command and the name of the song/movie/band. The program will then read the command as well as the name of the song/movie/band and return the information that the user requested in the random.txt file. 

The biggest challenge that I experienced with this program was making the do-what-it-says commands to work as intended. There was a lot of trial and error as well as research that went into finding the right way to code that part of the program. With a little persistance and hard work, I was finally able to get it to work as intended.

If you would like to see a short demo of how the program works in your terminal, please copy and paste this link into your favorite web browser: https://drive.google.com/file/d/1HE7LSUHBvAcCg830WpAHrZYyHbWPpP_H/view
