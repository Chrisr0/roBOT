const anime = require('@freezegold/anime.js');

module.exports = {
    name: 'manga',
    description: 'Show info about manga',
    args: true,
    usage: '<title>',
    cooldown: 15,
    execute(message, args) {
        let string = args.join(' ');
        string = string.toString();

        let embed = {
            "embed": {
                "title": "tytul",
                "description": "opis",
                "url": "url",
                "color": 12811819,
                "footer": {
                    "text": "Source: Kitsu.io"
                },
                "image": {
                    "url": "okladka"
                },
                "fields": []
            }
        }

        anime.searchManga(string, 1)
		    .then(response => {
            const [ani] = response;
            //console.log(r);
            //if (!JSON.parse(body).results[0]) return message.reply(`No results`);
            //let movie = JSON.parse(body).results[0];
            embed.embed.title = ani.titles.enJp;
            embed.embed.description = ani.synposis;
            embed.embed.url = 'https://kitsu.io/anime/'+ani.id;
            embed.embed.image.url = ani.posterImage.medium;
            if (ani.averageRating) {
                embed.embed.fields.push({
                    "name": "Rating:",
                    "value": ani.averageRating + '%',
                    "inline": true
                });
            }if (ani.popularityRank) {
                embed.embed.fields.push({
                    "name": "Popularity:",
                    "value": ani.popularityRank,
                    "inline": true
                });
            }if (ani.startDate) {
                embed.embed.fields.push({
                    "name": "Start date:",
                    "value": ani.startDate,
                    "inline": true
                });
            }if (ani.endDate) {
                embed.embed.fields.push({
                    "name": "End date:",
                    "value": ani.endDate,
                    "inline": true
                });
            }if (ani.chapterCount) {
                embed.embed.fields.push({
                    "name": "Chapter count:",
                    "value": ani.chapterCount,
                    "inline": true
                });
            }if (ani.volumeCount) {
                embed.embed.fields.push({
                    "name": "Volume count:",
                    "value": ani.volumeCount,
                    "inline": true
                });
            }
            message.channel.send(embed);
            });
    },
};