const Discord = require('discord.js');
const request = require('request');
const querystrong = require('querystring');

var catApiUrl = 'https://api.thecatapi.com/v1/images/search';
var dogApiUrl = 'https://api.thedogapi.com/v1/images/search';

exports.catSend = function (message) {
    const query_params = {
        'mime_types': 'jpg,png',
        'size': 'small',
        'sub_id': message.author.username,
        'limit': 1
    }
    let queryString = querystring.stringify(query_params);

    const options = {
        url: catApiUrl + '?${queryString}',
        headers: {
            'x-api-key': process.env.CATAPI_KEY
        }
    }

    request(options, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    message.reply({files:[JSON.parse(body)[0].url]});
    });
}
