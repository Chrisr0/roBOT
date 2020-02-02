const request = require('request');

const sauceApiUrl = 'https://saucenao.com/search.php';
//const sauceApiUrl = 'https://postb.in/1580654936168-5989540589507';

module.exports = {
    name: 'source',
    description: 'Znajdź informacje o obrazie!',
    cooldown: 60,
    args: true,
    usage: '<image url>',
    execute(message, args) {

        let options = {
            output_type: '2',
            api_key: process.env.SOURCEAPI_KEY,
            db: '999',
            numres: 1,
            url: args[0]
        };

        let embed = {
            "embed": {
                "title": "",    //Title\Source\Material
                "description": "",
                "url": "",
                "color": 16374921,
                "footer": {
                    "text": "Similarity: "
                },
                "image": {
                    "url": ""   //result picture
                },
                "fields": []
            }
        };

        embed.embed.title = "test";

        request.post(sauceApiUrl, {form: options}, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            if (!JSON.parse(body).results) return message.reply("Nie znaleziono!");
            console.log(JSON.parse(body).results[0]);
            result = JSON.parse(body).results[0];
            embed.embed.title = result.data.source || result.data.title || "";
            embed.embed.url = result.data.ext_urls[0] || "";
            embed.embed.footer.text += ((result.header.similarity || "Error") + " %");
            embed.embed.image.url = result.header.thumbnail || "";
            if (result.data.creator || result.data.member_name || result.data.pawoo_user_display_name) embed.embed.fields.push({ "name": "Twórcy:", "value": (result.data.creator || result.data.member_name || result.data.pawoo_user_display_name), "inline": "true" });
            if (result.data.characters) embed.embed.fields.push({ "name": "Postacie:", "value": result.data.characters, "inline": "true" });
            if (result.data.material) embed.embed.fields.push({ "name": "Materiał:", "value": result.data.material, "inline": "true" });
            if (result.data.part) embed.embed.fields.push({ "name": "Część:", "value": result.data.part,"inline": "true"});
            if (result.data.year) embed.embed.fields.push({ "name": "Rok:", "value": result.data.year, "inline": "true" });
            if (result.data.est_time) embed.embed.fields.push({ "name": "Przybliżony czas:", "value": result.data.est_time, "inline": "true" });
            message.reply(embed);
            //message.reply({ files: [JSON.parse(body)[0].url] });
        });
    },
};