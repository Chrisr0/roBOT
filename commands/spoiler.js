const spoiler = require('../utility/spoiler.js');

module.exports = {
    name: 'spoiler',
    description: 'Add spoiler tag to every image',
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