const Discord = require('discord.js');

exports.autoSpoiler = new Set();

exports.toggle = function (message) {
    if (autoSpoiler.has(message.author.id)) {
        autoSpoiler.delete(message.author.id);
    } else {
        autoSpoiler.add(message.author.id);
    }
}