const music = require('../utility/music.js');

module.exports = {
    name: 'pause',
    description: 'Pause music from youtube <BETA>!',
    args: false,
    cooldown: 5,
    async execute(message, args) {
        console.log(message.member);
        if (message.member.voiceChannel) {
            music.connection[0].dispatcher.pause();
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};
