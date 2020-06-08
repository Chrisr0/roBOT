const music = require('../utility/music.js');


module.exports = {
    name: 'np',
    description: 'Show current playing song <BETA>!',
    cooldown: 5,
    async execute(message, args) {
           
            let song = music.song[0];

            let embed = {
                "embed": {
                    "title": "title",
                    "description": "description",
                    "url": "https://youtube.com",
                    "color": 10473177,
                    "timestamp": "2001-01-01T01:01:01.001Z",
                    "thumbnail": {
                        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    },
                    "author": {
                        "name": "author name",
                        "url": "https://youtube.com",
                        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
                    }
                }
            };

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
};
