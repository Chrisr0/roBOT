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
    let content = {
        files: []
    };
    message.attachments.forEach(attachmentOld => {
        let attachmentNew = {
            attachment: attachmentOld.url,
            name: `SPOILER_FILE.${attachmentOld.url.split(".").pop()}`
        };
        content.files.push(attachmentNew);
    });
    message.channel.createWebhook(message.member.nickname, message.author.avatarURL)
    .then(wh => wh.edit(message.member.nickname, message.author.avatarURL))
    .then(wh => wh.send(content))
    .then(wh => wh.delete())
    .then(() => message.delete(3));
    
}