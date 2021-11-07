const ytdl = require('ytdl-core');
const ytpl = require('ytpl');
const YouTube = require('simple-youtube-api');
const ytapi = new YouTube(process.env.YT_KEY);
const music = require('../utility/music.js');

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

async function start(message, url, member, channel){
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
    channel.send("Added to queue:");
    channel.send(embed);

    if(music.connection[0]){
        console.log(music.connection[0].status);
    }
    if(!music.connection[0] || music.connection[0].status == 4){
        let connection = await member.voice.channel.join();
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
        "channel":channel
    });
    if(!music.connection[0].dispatcher || music.connection[0].dispatcher.destroyed){
        //music.connection = 'test';
        console.log("Music.play");
        music.play();
    }
}

async function startP(message, videos, url, member, channel){
    let plaInfo = await ytapi.getPlaylist(url);
    let chaInfo = await ytapi.getChannelByID(plaInfo.channel.id);
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
    embed.embed.title = plaInfo.title;
    embed.embed.description = plaInfo.description.substring(0, 200)+' ...',
    embed.embed.url = plaInfo.url;
    embed.embed.timestamp = plaInfo.publishedAt;
    embed.embed.thumbnail.url = plaInfo.thumbnails.default.url;
    embed.embed.author.name = chaInfo.title;
    embed.embed.author.url = 'https://www.youtube.com/channel/' + chaInfo.id;
    embed.embed.author.icon_url = chaInfo.thumbnails.default.url;
    channel.send("Added " + videos.length + " videos to queue:");
    channel.send(embed);

    if(music.connection[0]){
        console.log(music.connection[0].status);
    }
    if(!music.connection[0] || music.connection[0].status == 4){
        let connection = await member.voice.channel.join();
        music.connection[0] = connection;
    }

    await asyncForEach(videos, async element => {
        let vidInfo = await ytapi.getVideo(element.url);
        let chaVInfo = await ytapi.getChannelByID(vidInfo.channel.id);
        music.queue.push({
            "vid":{
                "title":vidInfo.title,
                "desc":vidInfo.description.substring(0, 200)+' ...',
                "url":"https://www.youtube.com/watch?v=" + vidInfo.id,
                "time":vidInfo.publishedAt,
                "thumb":vidInfo.thumbnails.default.url
            },
            "cha":{
                "title":chaVInfo.title,
                "url":"https://www.youtube.com/channel/" + chaVInfo.id,
                "thumb":chaVInfo.thumbnails.default.url
            },
            "channel":message.channel
        });
    })

    if(!music.connection[0].dispatcher || music.connection[0].dispatcher.destroyed){
        //music.connection = 'test';
        console.log("Music.play");
        music.play();
    }
}

module.exports = {
    name: 'play',
    description: 'Play music from youtube <BETA>!',
    args: true,
    usage: '<url>',
    cooldown: 5,
    async execute(message, args) {
        let member = await message.guild.members.fetch(message.author);
        if (member.voice.channel) {
            var result;
            console.log(args[0]);
            if(ytdl.validateURL(args[0])/*||ytdl.validateID(args[0])*/){
                url = args[0];
                start(message, url, member, message.channel);
            }else if(ytpl.validateID(await ytpl.getPlaylistID(args[0]).catch(()=>{return "zzzzzzzzzzzzzz"}))){
                let res = await ytpl(args[0]);
                startP(message, res.items, args[0], member, message.channel);
            }else{
                let string = args.join();
                result = await ytapi.searchVideos(string.toString(),1);
                url = result[0].url;
                start(message, url, member, message.channel);
            }
            //const connection = await message.member.voiceChannel.join();
            
        } else {
            message.reply('You need to join a voice channel first!');
        }
    }
};
