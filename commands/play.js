const ytdl = require('ytdl-core');
const YouTube = require('simple-youtube-api');
const ytapi = new YouTube(process.env.YT_KEY);
const music = require('../utility/music.js');


module.exports = {
    name: 'play',
    description: 'Play music from youtube <BETA>!',
    args: true,
    usage: '<url>',
    cooldown: 5,
    async execute(message, args) {
        if (message.member.voiceChannel) {
            var result;
            if(ytdl.validateURL(args[0])||ytdl.validateID(args[0])){
                url = args[0];
            }else{
                let string = message.content.match(/".*?"/);
                if (!string) return message.reply("Musisz podać tytuł w cudzysłowach");
                result = await ytapi.searchVideos(string.toString(),1);
                url = result[0].url;
            }
            //const connection = await message.member.voiceChannel.join();
            let vidInfo = await ytapi.getVideo(url);
            let chaInfo = await ytapi.getChannelByID(vidInfo.channel.id);
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
            embed.embed.title = vidInfo.title;
            embed.embed.description = vidInfo.description.substring(0, 200)+' ...',
            embed.embed.url = 'https://www.youtube.com/watch?v=' + vidInfo.id;
            embed.embed.timestamp = vidInfo.publishedAt;
            embed.embed.thumbnail.url = vidInfo.thumbnails.default.url;
            embed.embed.author.name = chaInfo.title;
            embed.embed.author.url = 'https://www.youtube.com/channel/' + chaInfo.id;
            embed.embed.author.icon_url = chaInfo.thumbnails.default.url;
            message.channel.send("Added to queue:");
            message.channel.send(embed);

            if(!music.connection[0] || music.connection[0].status == 4){
                let connection = await message.member.voiceChannel.join();
                music.connection[0] = connection;
            }
            music.queue.push({
                "vid":{
                    "title":vidInfo.title,
                    "desc":vidInfo.description.substring(0, 200)+' ...',
                    "url":"https://www.youtube.com/watch?v=" + vidInfo.id,
                    "time":vidInfo.publishedAt,
                    "thumb":vidInfo.thumbnails.default.url
                },
                "cha":{
                    "title":chaInfo.title,
                    "url":"https://www.youtube.com/channel/" + chaInfo.id,
                    "thumb":chaInfo.thumbnails.default.url
                },
                "channel":message.channel
            });
            if(!music.connection[0].dispatcher || music.connection[0].dispatcher.destroyed){
                //music.connection = 'test';
                music.play();
            }
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
};
