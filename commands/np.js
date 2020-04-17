const music = require('../utility/music.js');


module.exports = {
    name: 'np',
    description: 'Show current playing song <BETA>!',
    cooldown: 5,
    async execute(message, args) {
        if (message.member.voiceChannel) {
           
            let song = music.song[0];

            embed.embed.title = song.vid.title;
            embed.embed.description = song.vid.desc;
            embed.embed.url = song.vid.url;
            embed.embed.timestamp = song.vid.time;
            embed.embed.thumbnail.url = song.vid.thumb;
            embed.embed.author.name = song.cha.title;
            embed.embed.author.url = song.cha.url;
            embed.embed.author.icon_url = song.cha.thumb;

            message.channel.send("Now playing:");
            message.channel.send(embed);
        }     
    }
};
