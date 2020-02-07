const request = require('request');
const querystring = require('querystring');

const rawgApiUrl = 'https://api.rawg.io/api/games';

module.exports = {
    name: 'game',
    description: 'Informacje na temat gry!',
    args: true,
    usage: '<"title">',
    cooldown: 15,
    execute(message, args) {
        let string = message.content.match(/".*?"/).toString();
        if (!string) return message.reply("Musisz podać tytuł w cudzysłowach");

        string = string.replace(" ", "+");
 
        const query_params = {
            'search': string,
        }
        let queryString = querystring.stringify(query_params);

        const options = {
            url: rawgApiUrl + `?${queryString}`,
        }

        let embed = {
            "embed": {
                "title": "tytul",
                "description": "TODO opis",
                //"url": "TODO url",
                "color": 12811819,
                "footer": {
                    "text": "Źródło: rawg.io"
                },
                "image": {
                    "url": "okladka"
                },
                "fields": [
                  {
                      "name": "Data premiery:",
                      "value": "data",
                      "inline": "true"
                  },
                  {
                      "name": "Platformy:",
                      "value": "TODO platformy",
                      "inline": "true"
                  },
                  {
                      "name": "Gatunki:",
                      "value": "TODO gatunki",
                      "inline": "true"
                  },
                  {
                      "name": "Deweloperzy:",
                      "value": "TODO deweloperzy",
                      "inline": "true"
                  },
                  {
                      "name": "Wydawcy:",
                      "value": "TODO wydawcy",
                      "inline": "true"
                  }
                ]
            }
        }

        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (!JSON.parse(body).results) message.reply(`Brak wyników`);
            let game = JSON.parse(body).results[0];
            embed.embed.title = game.name;
            //embed.embed.description = movie.overview;
            //embed.embed.url = "https://www.themoviedb.org/movie/" + movie.id;
            embed.embed.image.url = game.background_image;
            embed.embed.fields[0].value = game.released;
            message.channel.send(embed);
        });
    },
};