const request = require('request');

const booruApi = 'https://danbooru.donmai.us/tags.json';

module.exports = {
    name: 'btag',
    description: 'Wyszukaj tag z danbooru!',
    usage: '<tag>',
    cooldown: 10,
    execute(message, args) {

        const options = {
            url: booruApi + `?commit=Search&search[hide_empty]=yes&search[order]=count&search[name_matches]=${args[0]}`,
        }

        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            tags = JSON.parse(body);
            let msg = "";
            console.log(options.url);
            tags.forEach(element => {
                msg += `\n\`${element.name}\``;
            });
            message.reply(msg);
        });
    },
};