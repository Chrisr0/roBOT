const music = require('../utility/music.js');

module.exports = {
    name: 'remove',
    description: 'Remove music from queue <BETA>!',
    usage: '<song_id>',
    cooldown: 3,
    async execute(message, args) {
        if (message.member.voice.channel) {
            if(music.connection[0]){
                if(args[0] > music.queue.length-1){
                    return message.reply('Song in queue not found');
                }

                let song = music.queue.splice(args[0],1); 

                return message.channel.send("Removed: " + args[0] + "| " + song[0].vid.title);

            }else{
                message.reply('Bot is not connected to voicechat!');
            }
        } else {
            message.reply('You need to join a voice channel first!');
        }
    },
};