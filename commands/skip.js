const ytdl = require('ytdl-core');
const music = require('../utility/music.js');

module.exports = {
    name: 'skip',
    description: 'Skip music from youtube <BETA>!',
    cooldown: 5,
    async execute(message, args) {
        if (message.member.voiceChannel) {
            if(music.connection[0]){
                if(music.connection[0].dispatcher){
                    music.connection[0].dispatcher.end();
                }else{
                    message.reply('Nothing is playing!');
                }
            }else{
                message.reply('Bot is not connected to voicechat!');
            }
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};