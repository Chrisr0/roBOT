const Discord = require('discord.js');

var autoSpoiler = new Set();

exports.autoSpoiler = autoSpoiler;

exports.toggle = function (message) {
    if (autoSpoiler.has(message.author.id)) {
        message.reply("AutoSpoiler: OFF");
        autoSpoiler.delete(message.author.id);
    } else {
        message.reply("AutoSpoiler: ON");
        autoSpoiler.add(message.author.id);
    }
}

function sendAll(wh, message){
    var counter = [];
    message.attachments.forEach(async(file) => {
        result = await wh.send({
            files:[{
                attachment: file.url,
                name: `SPOILER_FILE.${file.url.split(".").pop()}`
            }]
        });
        counter.push(result);
        if(counter.length === file.message.attachments.array().length){
            file.message.delete();
            wh.delete()
            .catch(error => console.log(error));
        }
    });
    return 1;
}

exports.exec = function (message) {
	let name = message.member.nickname || message.author.username;
    message.channel.createWebhook(name, message.author.avatarURL)
    .then(wh => wh.edit(name, message.author.avatarURL))
    .then(wh => sendAll(wh, message))
    .catch(error => console.log(error));
}