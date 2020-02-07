const spoiler = require('../utility/spoiler.js');

module.exports = {
    name: 'spoiler',
    description: 'Automatyczny spoiler tag do wysyłanych przez użytkownika zdjęć',
    cooldown: 5,
    execute(message, args) {
        if (spoiler.autoSpoiler.has(message.author.id)) {
            message.reply("AutoSpoiler: OFF");
            spoiler.autoSpoiler.delete(message.author.id);
        } else {
            message.reply("AutoSpoiler: ON");
            spoiler.autoSpoiler.add(message.author.id);
        }
    },
};