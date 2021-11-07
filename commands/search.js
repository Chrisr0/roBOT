const request = require('request');
const querystring = require('querystring');
const anime = require('@freezegold/anime.js');
const got = require('got');
const { env } = require('process');

const rawgApiUrl = 'https://api.rawg.io/api/games';
const tmdbApiUrl = 'https://api.themoviedb.org/3/search/movie';
const booksApiUrl = 'https://www.googleapis.com/books/v1/volumes';


module.exports = {
    name: 'search',
    description: 'Show info about media:\n\tgame\n\tbook\n\tmovie\n\tanime\n\tmanga',
    args: true,
    usage: '<media type> <title>',
    cooldown: 15,
    execute(message, args) {
        let media = args.shift();
        switch (media) {
            case "game":
                getGame(message, args);
                break;
            case "book":
                getBook(message, args);
                break;
            case "movie":
                getMovie(message, args);
                break;
            case "anime":
                getAnime(message, args);
                break;
            case "manga":
                getManga(message, args);
                break;
            default:
                message.channel.send("Invalid media type");
                break;
        }
    },
};

function getGame(message, args) {
    let string = args.join();
    string = string.toString();

    string = string.replace(" ", "+");

    const query_params = {
        'search': string,
        'key': env.RAWG_KEY
    }
    let queryString = querystring.stringify(query_params);
    console.log(queryString);
    const options = {
        url: rawgApiUrl + `?${queryString}`,
    }

    let embed = {
        "embed": {
            "title": "tytul",
            "description": "opis",
            "url": "https://discordapp.com",
            "timestamp": "1111-11-11T11:11:11.111Z",
            "color": 12811819,
            "footer": {
                "text": "Source: rawg.io"
            },
            "image": {
                "url": "okladka"
            },
            "fields": []
        }
    }

    request(options, function (error, response, body) {
        console.error('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (!JSON.parse(body).results || JSON.parse(body).count == 0) return message.reply(`No results`);
        let game = JSON.parse(body).results[0];
        request(rawgApiUrl + "/" + game.id + "?key="+env.RAWG_KEY, function (error, response, body) {
            if (!JSON.parse(body).id) return message.reply(`No results`);
            let game = JSON.parse(body);
            embed.embed.title = game.name;
            embed.embed.description = game.description_raw;
            embed.embed.url = game.website;
            embed.embed.timestamp = game.updated;
            embed.embed.image.url = game.background_image;
            if (game.released) {
                embed.embed.fields.push({
                    "name": "Release date:",
                    "value": game.released,
                    "inline": true
                });
            }
            //embed.embed.fields[0].value = game.released;
            let tmp = "";
            game.platforms.forEach(element => {
                tmp += `${element.platform.name}, `;
            });
            if (tmp) {
                embed.embed.fields.push({
                    "name": "Platforms:",
                    "value": tmp,
                    "inline": true
                });
            }
            tmp = "";
            game.stores.forEach(element => {
                tmp += `[${element.store.name}](${element.url}), `;
            });
            if (tmp) {
                embed.embed.fields.push({
                    "name": "Stores:",
                    "value": tmp,
                    "inline": true
                });
            }
            tmp = "";
            game.genres.forEach(element => {
                tmp += `${element.name}, `;
            });
            if (tmp) {
                embed.embed.fields.push({
                    "name": "Genres:",
                    "value": tmp,
                    "inline": true
                });
            }
            tmp = "";
            game.developers.forEach(element => {
                tmp += `${element.name}, `;
            });
            if (tmp) {
                embed.embed.fields.push({
                    "name": "Developers:",
                    "value": tmp,
                    "inline": true
                });
            }
            tmp = "";
            game.publishers.forEach(element => {
                tmp += `${element.name}, `;
            });
            if (tmp) {
                embed.embed.fields.push({
                    "name": "Publishers:",
                    "value": tmp,
                    "inline": true
                });
            }
            message.channel.send(embed);
        });
    });
}

function getBook(message, args) {
    let string = args.join();
    string = string.toString();

    const query_params = {
        'q': string,
        'key': process.env.YT_KEY
    }
    let queryString = querystring.stringify(query_params);

    let url = booksApiUrl + `?${queryString}`;

    let embed = {
        "embed": {
            "title": "tytul",
            "description": "opis",
            "url": "url",
            "color": 12811819,
            "footer": {
                "text": "Source: Google Books"
            },
            "image": {
                "url": "okladka"
            },
            "fields": []
        }
    }

    got(url)
        .then(response => {
            const [book] = JSON.parse(response.body).items;
            console.log(url);
            //if (!JSON.parse(body).results[0]) return message.reply(`No results`);
            //let movie = JSON.parse(body).results[0];
            embed.embed.title = book.volumeInfo.title;
            embed.embed.description = book.volumeInfo.description;
            embed.embed.url = book.volumeInfo.infoLink;
            embed.embed.image.url = `http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api`;
            if (book.volumeInfo.publishedDate) {
                embed.embed.fields.push({
                    "name": "Publish date:",
                    "value": book.volumeInfo.publishedDate,
                    "inline": true
                });
            } if (book.volumeInfo.authors) {
                embed.embed.fields.push({
                    "name": "Author:",
                    "value": book.volumeInfo.authors[0],
                    "inline": true
                });
            }
            message.channel.send(embed);
        });
}

function getMovie(message, args) {
    let string = args.join();
    string = string.toString();

    string = string.replace(" ", "+");

    const query_params = {
        'query': string,
        'api_key': process.env.TMDB_KEY
    }
    let queryString = querystring.stringify(query_params);

    const options = {
        url: tmdbApiUrl + `?${queryString}`,
    }

    let embed = {
        "embed": {
            "title": "tytul",
            "description": "opis",
            "url": "url",
            "color": 12811819,
            "footer": {
                "text": "Source: themoviedb.org"
            },
            "image": {
                "url": "okladka"
            },
            "fields": [
                {
                    "name": "Release date:",
                    "value": "data"
                }
            ]
        }
    }

    request(options, function (error, response, body) {
        if (error) console.error('error:', error); // Print the error if one occurred
        if (!JSON.parse(body).results[0]) return message.reply(`No results`);
        let movie = JSON.parse(body).results[0];
        embed.embed.title = movie.title;
        embed.embed.description = movie.overview;
        embed.embed.url = "https://www.themoviedb.org/movie/" + movie.id;
        embed.embed.image.url = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
        embed.embed.fields[0].value = movie.release_date;
        message.channel.send(embed);
    });
}

function getAnime(message, args) {
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

    anime.searchAnime(string, 1)
        .then(response => {
            const [ani] = response;
            //console.log(r);
            //if (!JSON.parse(body).results[0]) return message.reply(`No results`);
            //let movie = JSON.parse(body).results[0];
            embed.embed.title = ani.titles.romaji;
            embed.embed.description = ani.synposis;
            embed.embed.url = 'https://kitsu.io/anime/' + ani.id;
            embed.embed.image.url = ani.posterImage.medium;
            if (ani.averageRating) {
                embed.embed.fields.push({
                    "name": "Rating:",
                    "value": ani.averageRating + '%',
                    "inline": true
                });
            } if (ani.popularityRank) {
                embed.embed.fields.push({
                    "name": "Popularity:",
                    "value": ani.popularityRank,
                    "inline": true
                });
            } if (ani.startDate) {
                embed.embed.fields.push({
                    "name": "Start date:",
                    "value": ani.startDate,
                    "inline": true
                });
            } if (ani.endDate) {
                embed.embed.fields.push({
                    "name": "End date:",
                    "value": ani.endDate,
                    "inline": true
                });
            } if (ani.subType) {
                embed.embed.fields.push({
                    "name": "Type:",
                    "value": ani.subType,
                    "inline": true
                });
            } if (ani.episodeCount) {
                embed.embed.fields.push({
                    "name": "Episode count:",
                    "value": ani.episodeCount,
                    "inline": true
                });
            } if (ani.episodeLength) {
                embed.embed.fields.push({
                    "name": "Episode length:",
                    "value": ani.episodeLength,
                    "inline": true
                });
            }
            message.channel.send(embed);
        });
}

function getManga(message, args) {
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
            embed.embed.url = 'https://kitsu.io/anime/' + ani.id;
            embed.embed.image.url = ani.posterImage.medium;
            if (ani.averageRating) {
                embed.embed.fields.push({
                    "name": "Rating:",
                    "value": ani.averageRating + '%',
                    "inline": true
                });
            } if (ani.popularityRank) {
                embed.embed.fields.push({
                    "name": "Popularity:",
                    "value": ani.popularityRank,
                    "inline": true
                });
            } if (ani.startDate) {
                embed.embed.fields.push({
                    "name": "Start date:",
                    "value": ani.startDate,
                    "inline": true
                });
            } if (ani.endDate) {
                embed.embed.fields.push({
                    "name": "End date:",
                    "value": ani.endDate,
                    "inline": true
                });
            } if (ani.chapterCount) {
                embed.embed.fields.push({
                    "name": "Chapter count:",
                    "value": ani.chapterCount,
                    "inline": true
                });
            } if (ani.volumeCount) {
                embed.embed.fields.push({
                    "name": "Volume count:",
                    "value": ani.volumeCount,
                    "inline": true
                });
            }
            message.channel.send(embed);
        });
}