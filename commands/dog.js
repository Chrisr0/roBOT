const request = require('request');
const querystring = require('querystring');

const dogApiUrl = 'https://api.thedogapi.com/v1/images/search';

module.exports = {
    name: 'dog',
    description: 'Losowe zdjęcie pieseła!',
    cooldown: 30,
    execute(message, args) {
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
    },
};