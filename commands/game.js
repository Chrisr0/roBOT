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
                "description": "opis",
                "url": "https://discordapp.com",
                "timestamp": "1111-11-11T11:11:11.111Z",
                "color": 12811819,
                "footer": {
                    "text": "Źródło: rawg.io"
                },
                "image": {
                    "url": "okladka"
                },
                "fields": [ //TODO add field if info present
                  {
                      "name": "Data premiery:",
                      "value": "data",
                      "inline": "true"
                  },
                  {
                      "name": "Platformy:",
                      "value": "platformy",
                      "inline": "true"
                  },
                  {
                    "name": "Sklepy:",
                    "value": "sklepy",
                    "inline": "true"
                  },
                  {
                      "name": "Gatunki:",
                      "value": "gatunki",
                      "inline": "true"
                  },
                  {
                      "name": "Deweloperzy:",
                      "value": "deweloperzy",
                      "inline": "true"
                  },
                  {
                      "name": "Wydawcy:",
                      "value": "wydawcy",
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
            request(rawgApiUrl + "/" + game.id, function (error, response, body) {
                if (!JSON.parse(body).id) message.reply(`Brak wyników`);
                let game = JSON.parse(body);
                embed.embed.title = game.name;
                embed.embed.description = game.description_raw;
                embed.embed.url = game.website;
                embed.embed.timestamp = game.updated;
                embed.embed.image.url = game.background_image;
                embed.embed.fields[0].value = game.released;
                let tmp = "";
                game.platforms.forEach(element => {
                    tmp += `${element.platform.name}, `;
                });
                embed.embed.fields[1].value = tmp;
                tmp = "";
                game.stores.forEach(element => {
                    tmp += `[${element.store.name}](${element.url}), `;
                });
                embed.embed.fields[2].value = tmp;
                tmp = "";
                game.genres.forEach(element => {
                    tmp += `${element.name}, `;
                });
                embed.embed.fields[3].value = tmp;
                tmp = "";
                game.developers.forEach(element => {
                    tmp += `${element.name}, `;
                });
                embed.embed.fields[4].value = tmp;
                tmp = "";
                game.publishers.forEach(element => {
                    tmp += `${element.name}, `;
                });
                embed.embed.fields[5].value = tmp;
                message.channel.send(embed);
            });
        });
    },
};