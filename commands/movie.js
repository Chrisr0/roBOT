const request = require('request');
const querystring = require('querystring');

const tmdbApiUrl = 'https://api.themoviedb.org/3/search/movie';

module.exports = {
    name: 'movie',
    description: 'Show info about movie',
    args: true,
    usage: '<title>',
    cooldown: 15,
    execute(message, args) {
        let string = args.join();
        string = string.toString();

        string = string.replace(" ", "+");
 
        const query_params = {
            'query': string,
            'api_key': process.env.TMDB_KEY
        }
        let queryString = querystring.stringify(query_params);

        const options = {
            url: tmdbApiUrl + `?${queryString}`,
        }

        let embed = {
            "embed": {
                "title": "tytul",
                "description": "opis",
                "url": "url",
                "color": 12811819,
                "footer": {
                    "text": "Source: themoviedb.org"
                },
                "image": {
                    "url": "okladka"
                },
                "fields": [
                  {
                      "name": "Release date:",
                      "value": "data"
                  }
                ]
            }
        }

        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (!JSON.parse(body).results) return message.reply(`No results`);
            let movie = JSON.parse(body).results[0];
            embed.embed.title = movie.title;
            embed.embed.description = movie.overview;
            embed.embed.url = "https://www.themoviedb.org/movie/" + movie.id;
            embed.embed.image.url = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
            embed.embed.fields[0].value = movie.release_date;
            message.channel.send(embed);
        });
    },
};