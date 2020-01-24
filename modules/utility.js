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