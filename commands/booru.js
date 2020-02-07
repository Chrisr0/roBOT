const request = require('request');

const booruApi = 'https://danbooru.donmai.us/posts/random.json';

module.exports = {
    name: 'booru',
    description: 'Losowy obrazek z danbooru!\n\nRating:\n\t-s (Safe)\n\t-q (Questionable)\n\t-e (Explicit)',
    usage: '<rating>(optional)',
    cooldown: 10,
    execute(message, args) {
        let r = "s";
        if (args) {
            if (args[0] == "q" || args[0] == "e") {
                if (!message.channel.nsfw) return message.reply('To nie jest kanał NSFW');
                r = args[0];
            }
        }

        const options = {
            url: booruApi + `?tags=rating:${r}`,
        }

        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log("image_id:", JSON.parse(body).id);
            console.log(options.url);
            message.reply({ files: [JSON.parse(body).file_url] });
        });
    },
};