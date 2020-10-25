const ytdl = require('ytdl-core');

let queue = []
let connection = [null];
let song = [];
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

    song[0] = queue.shift();

    embed.embed.title = song[0].vid.title;
    embed.embed.description = song[0].vid.desc;
    embed.embed.url = song[0].vid.url;
    embed.embed.timestamp = song[0].vid.time;
    embed.embed.thumbnail.url = song[0].vid.thumb;
    embed.embed.author.name = song[0].cha.title;
    embed.embed.author.url = song[0].cha.url;
    embed.embed.author.icon_url = song[0].cha.thumb;
    song[0].channel.send("Playing now:");
    song[0].channel.send(embed);
    let stream = ytdl(song[0].vid.url, {
        highWaterMark: 1 << 25,
        requestOptions: {
            headers: {
                'X-Youtube-Identity-Token': process.env.xyit,
                'Cookie': 'SID='+process.env.sid+'; HSID='+process.env.hsid+'; SSID='+process.env.ssid
            }
        }
    });
    let dispatcher = connection[0].playStream(stream);
    dispatcher.on('end', () => {
        console.log("END: " + queue.length);
        play();
    });
}

module.exports = {
    connection: connection,
    queue: queue,
    song: song,
    play: play
}