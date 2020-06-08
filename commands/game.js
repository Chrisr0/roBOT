const request = require('request');
const querystring = require('querystring');

const rawgApiUrl = 'https://api.rawg.io/api/games';

module.exports = {
    name: 'game',
    description: 'Show info about game',
    args: true,
    usage: '<title>',
    cooldown: 15,
    execute(message, args) {
        let string = args.join();
        string = string.toString();

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
                    "text": "Source: rawg.io"
                },
                "image": {
                    "url": "okladka"
                },
                "fields": []
            }
        }

        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (!JSON.parse(body).results || JSON.parse(body).count == 0) return message.reply(`No results`);
            let game = JSON.parse(body).results[0];
            request(rawgApiUrl + "/" + game.id, function (error, response, body) {
                if (!JSON.parse(body).id) return message.reply(`No results`);
                let game = JSON.parse(body);
                embed.embed.title = game.name;
                embed.embed.description = game.description_raw;
                embed.embed.url = game.website;
                embed.embed.timestamp = game.updated;
                embed.embed.image.url = game.background_image;
                if (game.released) {
                    embed.embed.fields.push({
                        "name": "Release date:",
                        "value": game.released,
                        "inline": "true"
                    });
                }
                //embed.embed.fields[0].value = game.released;
                let tmp = "";
                game.platforms.forEach(element => {
                    tmp += `${element.platform.name}, `;
                });
                if (tmp) {
                    embed.embed.fields.push({
                        "name": "Platforms:",
                        "value": tmp,
                        "inline": "true"
                    });
                }
                tmp = "";
                game.stores.forEach(element => {
                    tmp += `[${element.store.name}](${element.url}), `;
                });
                if (tmp) {
                    embed.embed.fields.push({
                        "name": "Stores:",
                        "value": tmp,
                        "inline": "true"
                    });
                }
                tmp = "";
                game.genres.forEach(element => {
                    tmp += `${element.name}, `;
                });
                if (tmp) {
                    embed.embed.fields.push({
                        "name": "Genres:",
                        "value": tmp,
                        "inline": "true"
                    });
                }
                tmp = "";
                game.developers.forEach(element => {
                    tmp += `${element.name}, `;
                });
                if (tmp) {
                    embed.embed.fields.push({
                        "name": "Developers:",
                        "value": tmp,
                        "inline": "true"
                    });
                }
                tmp = "";
                game.publishers.forEach(element => {
                    tmp += `${element.name}, `;
                });
                if (tmp) {
                    embed.embed.fields.push({
                        "name": "Publishers:",
                        "value": tmp,
                        "inline": "true"
                    });
                }
                message.channel.send(embed);
            });
        });
    },
};