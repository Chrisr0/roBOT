const music = require('../utility/music.js');

module.exports = {
    name: 'stop',
    description: 'Stop music from youtube <BETA>!',
    cooldown: 5,
    async execute(message, args) {
        console.log(message.member);
        if (message.member.voiceChannel) {
            music.queue.length = 0;
            music.connection[0].dispatcher.end();
            message.channel.send('Music stopped');
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};