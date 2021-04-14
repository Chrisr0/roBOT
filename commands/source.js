const request = require('request');

const sauceApiUrl = 'https://saucenao.com/search.php';

module.exports = {
    name: 'source',
    description: 'Find source of image',
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
            if (!JSON.parse(body).results) return message.reply("Not found!");
            console.log(JSON.parse(body).results[0]);
            result = JSON.parse(body).results[0];
            embed.embed.title = result.data.source || result.data.title || "";
            if (result.data.ext_urls) embed.embed.url = result.data.ext_urls[0] || "";
            embed.embed.footer.text += ((result.header.similarity || "Error") + " %");
            embed.embed.image.url = result.header.thumbnail || "";
            if (result.data.creator || result.data.member_name || result.data.pawoo_user_display_name) embed.embed.fields.push({ "name": "Creators:", "value": JSON.stringify(result.data.creator || result.data.member_name || result.data.pawoo_user_display_name), "inline": true });
            if (result.data.characters) embed.embed.fields.push({ "name": "Characters:", "value": JSON.stringify(result.data.characters), "inline": true });
            if (result.data.material) embed.embed.fields.push({ "name": "Material:", "value": JSON.stringify(result.data.material), "inline": true });
            if (result.data.part) embed.embed.fields.push({ "name": "Part:", "value": JSON.stringify(result.data.part), "inline": true });
            if (result.data.year) embed.embed.fields.push({ "name": "Year:", "value": JSON.stringify(result.data.year), "inline": true });
            if (result.data.est_time) embed.embed.fields.push({ "name": "Estimated timestamp:", "value": result.data.est_time, "inline": true });
            message.reply(embed);
            //message.reply({ files: [JSON.parse(body)[0].url] });
        });
    },
};