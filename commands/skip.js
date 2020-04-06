const ytdl = require('ytdl-core');
const music = require('../utility/music.js');

module.exports = {
    name: 'skip',
    description: 'Skip music from youtube <BETA>!',
    cooldown: 5,
    async execute(message, args) {
        console.log(message.member);
        if (message.member.voiceChannel) {
            music.connection[0].dispatcher.end();
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};