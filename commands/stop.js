const ytdl = require('ytdl-core');

module.exports = {
    name: 'stop',
    description: 'Stop music from youtube <BETA>!',
    cooldown: 5,
    async execute(message, args) {
        console.log(message.member);
        if (message.member.voiceChannel) {
            await message.member.voiceChannel.leave();
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};