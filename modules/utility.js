const Discord = require('discord.js');

var autoSpoiler = new Set();

exports.autoSpoiler = autoSpoiler;

exports.toggle = function (message) {
    if (autoSpoiler.has(message.author.id)) {
        autoSpoiler.delete(message.author.id);
    } else {
        autoSpoiler.add(message.author.id);
    }
}