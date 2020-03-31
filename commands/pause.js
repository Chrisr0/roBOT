const ytdl = require('ytdl-core');

module.exports = {
    name: 'pause',
    description: 'Pause music from youtube <BETA>!',
    args: false,
    cooldown: 5,
    async execute(message, args) {
        console.log(message.member);
        if (message.member.voiceChannel) {
            const dispatcher = message.client.connection.dispatcher;
            dispatcher.pause();
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};
