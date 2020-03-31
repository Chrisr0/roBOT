const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Play music from youtube <BETA>!',
    args: true,
    usage: '<url>',
    cooldown: 5,
    async execute(message, args) {
        console.log(message.member);
        if (message.member.voiceChannel) {
            const connection = await message.member.voiceChannel.join();
            connection.playStream(ytdl(args[0]));
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};
