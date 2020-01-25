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

exports.exec = function (message) {
    message.channel.createWebhook(message.member.nickname,message.user.avatarURL)
    .then(wh => wh.edit(message.member.nickname,message.user.avatarURL))
    .then(wh => {
        message.attachments.forEach(function (attachments) {
            wh.send({
                files: [{
                    attachment: attachments.url,
                    name: `SPOILER_FILE.${attachments.url.split(".").pop()}`
                }]
            });
        });
    })
    message.delete(3);
    
}