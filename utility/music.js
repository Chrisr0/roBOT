const ytdl = require('ytdl-core');

let queue = []
let connection = [null];
function play() {

    if (!queue.length) return

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

    let song = queue.shift();

    embed.embed.title = song.vid.title;
    embed.embed.description = song.vid.desc;
    embed.embed.url = song.vid.url;
    embed.embed.timestamp = song.vid.time;
    embed.embed.thumbnail.url = song.vid.thumb;
    embed.embed.author.name = song.cha.title;
    embed.embed.author.url = song.cha.url;
    embed.embed.author.icon_url = song.cha.thumb;
    song.channel.send("Playing now:");
    song.channel.send(embed);
    let dispatcher = connection[0].playStream(ytdl(song.vid.url));
    dispatcher.on('end', () => {
        console.log("END: " + queue.length);
        play();
    });
}

module.exports = {
    connection: connection,
    queue: queue,
    play: play
}