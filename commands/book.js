const got = require('got');
const querystring = require('querystring');

const booksApiUrl = 'https://www.googleapis.com/books/v1/volumes';

module.exports = {
    name: 'book',
    description: 'Show info about book',
    args: true,
    usage: '<title>',
    cooldown: 15,
    execute(message, args) {
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
            }if (book.volumeInfo.authors) {
                embed.embed.fields.push({
                    "name": "Author:",
                    "value": book.volumeInfo.authors[0],
                    "inline": true
                });
            }
            message.channel.send(embed);
            });
    },
};