const Discord = require('discord.js');
const request = require('request');

var catApiUrl = 'https://api.thecatapi.com/v1/images/search';

exports.send = function(message) {
    request(catApiUrl, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    message.reply({files:[JSON.parse(body)[0].url]});
    });
}
