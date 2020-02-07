const request = require('request');
const querystring = require('querystring');

const catApiUrl = 'https://api.thecatapi.com/v1/images/search';

module.exports = {
    name: 'cat',
    description: 'Losowe zdjęcie koteła!',
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
            url: catApiUrl + `?${queryString}`,
            headers: {
                'x-api-key': process.env.CATAPI_KEY
            }
        }

        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            message.reply({ files: [JSON.parse(body)[0].url] });
        });
    },
};