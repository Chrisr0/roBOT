const request = require('request');

const apiUrl = 'https://api.covid19api.com/live/country/poland/status/status';

module.exports = {
    name: 'corona',
    description: 'Informacje na temat wirusa w Polsce.',
    cooldown: 30,
    execute(message, args) {

        request(apiUrl, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

            let embed = {
                "embed": {
                    "title": "**COVID-19 Obecny stan w Polsce:**",
                    "color": 13632027,
                    "timestamp": "2001-01-01T01:01:01.001Z",
                    "fields": [
                      {
                          "name": "Potwierdzone:",
                          "value": "milion"
                      },
                      {
                          "name": "Zgony: (lol)",
                          "value": "milion"
                      },
                      {
                          "name": "Wyleczone:",
                          "value": "zero"
                      },
                      {
                          "name": "Aktywne:",
                          "value": "nikt nie przezyl"
                      }
                    ]
                }
            };
            let res = JSON.parse(body)[0];
            embed.embed.timestamp = res.Date;
            embed.embed.fields[0].value = res.Confirmed;
            embed.embed.fields[1].value = res.Deaths;
            embed.embed.fields[2].value = res.Recovered;
            embed.embed.fields[3].value = res.Active;
            message.reply(embed);
        });
    },
};