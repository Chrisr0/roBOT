const { MessageEmbedField } = require('discord.js');
const request = require('request');

const trackerApiUrl = "https://public-api.tracker.gg/v2/apex/standard/profile/origin/";



module.exports = {
    name: 'apex',
    description: 'Random dog picture!',
    hidden: true,
    cooldown: 30,
    execute(message, args) {
       
        let embed = {
            "embed": {
                "title": "tytul",
                "description": "opis",
                "color": 12811819,
                "footer": {
                    "text": "Source: themoviedb.org"
                },
                "thumbnail": {
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


        const options = {
            url: trackerApiUrl + args[0],
            headers: {
                'TRN-Api-Key': process.env.TRACKERAPI_KEY
            }
        }

        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            //message.reply({ files: [JSON.parse(body)[0].url] });
            let data = JSON.parse(body).data;
            embed.embed.title = data.platformInfo.platformUserId;
            embed.embed.thumbnail.url = data.platformInfo.avatarUrl;
            message.channel.send(embed);
        });
    },
};