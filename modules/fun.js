const Discord = require('discord.js');
const request = require('request');
const querystring = require('querystring');
const randomPuppy = require('random-puppy');

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

exports.dogSend = function (message) {
    const query_params = {
        'mime_types': 'jpg,png',
        'size': 'small',
        'sub_id': message.author.username,
        'limit': 1
    }
    let queryString = querystring.stringify(query_params);

    const options = {
        url: dogApiUrl + '?${queryString}',
        headers: {
            'x-api-key': process.env.DOGAPI_KEY
        }
    }

    request(options, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        message.reply({ files: [JSON.parse(body)[0].url] });
    });
}

exports.randSend = function (message){
    message.reply(`Twój numer to ${Math.floor(Math.random() * (400000 - 0 + 1) + 0)}`);
}

exports.animeSend = function(message){
    randomPuppy('Animewallpaper')
    .then(url => {
        message.reply({ files: [url]});
    })
}

exports.hentaiSend = function (message) {
    console.log(message.channel.name);
    console.log(message.channel.nsfw);
    if (!message.channel.nsfw) {
        message.reply('Ten kanał nie jest NSFW');
    } else {
        randomPuppy('hentai')
        .then(url => {
            message.reply({ files: [url] });
        })
    }
}