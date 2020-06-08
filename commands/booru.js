const request = require('request');

const booruApi = 'https://danbooru.donmai.us/posts/random.json';

module.exports = {
    name: 'booru',
    description: 'Random image from booru!\n\nRating:\n\t-s (Safe)\n\t-q (Questionable)\n\t-e (Explicit)',
    usage: '<rating>* <tag>*',
    cooldown: 10,
    execute(message, args) {
        let r = "s";
        if (args) {
            if (args[0] == "q" || args[0] == "e" || args[0] == "s") {
                if (!message.channel.nsfw) return message.reply('This is not NSFW channel');
                r = args[0];
                if (args[1]) r = r + "+" + args[1];
            } else {
                r = r + "+" + args[0];
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
            if (JSON.parse(body).success != null && JSON.parse(body).success == false) return message.reply("Not found");
            let img = JSON.parse(body).file_url || JSON.parse(body).source;
            message.reply({ files: [img] });
        });
    },
};