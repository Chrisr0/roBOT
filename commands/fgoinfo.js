const request = require('request');
const Discord = require('discord.js');
const apiUrl = 'https://www.mitsunee.com/fgo/time/assets/events.json';

module.exports = {
    name: 'fgoinfo',
    description: 'Info about FGO events.',
    cooldown: 30,
    execute(message, args) {

        request(apiUrl, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

            let embed = new Discord.MessageEmbed();
            let res = JSON.parse(body);
            embed.setColor('#0068ff');
            embed.setTitle(res.mainName);
            let desc = res.notice.replace(/<br>/g, "\n");;
            desc = desc.replace(/<[^>]*>/g, "");
            embed.setDescription(desc);
            embed.setTimestamp();
            sortArrayByValueInObject(res.events, "time");
            let column1 = "";
            let column2 = "";
            for (let i = 0; i < res.events.length; i++) {
                let event = res.events[i];
                column1 += `${event.text}\n`;
                let d = new Date(event.time * 1000).toString().substr(0, 21);
                column2 += `${d}\n`;
            }
            embed.addField('Event', column1, true);
            embed.addField('Time', column2, true);
            embed.setImage("https://www.mitsunee.com/fgo/time/assets/img/banners/"+res.mainBanner);
            message.reply(embed);
        });
    },
};

function sortArrayByValueInObject(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}