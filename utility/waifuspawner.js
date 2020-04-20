const sql = require('./sql.js');
const util = require('util');
const { createCanvas, loadImage } = require('canvas');

const query = util.promisify(sql.pool.query).bind(sql.pool);

let lastSpawn = [null];

module.exports = {
    lastSpawn: lastSpawn,
    async spawn(message) {

        if(Math.random() > 0.2) return;
        let type = 0;
        if(Math.random() < 0.075){
            type = 1;
        }
        let result = await query(sql.getRandomCharacter, type);
        
        const canvas = createCanvas(225, 350);
        var ctx = canvas.getContext('2d');
        var img1 = await loadImage(`https://media.kitsu.io/characters/images/${result[0].gid}/original.jpg`);
        ctx.drawImage(img1, 0, 0);
        if(result[0].is_gold){
            var img2 = await loadImage("res/frame.png");
            ctx.drawImage(img2, 0, 0);
        }
        let embed = {
            "embed": {
                "title": "tytul",
                "color": 54271,
                "image": {
                    "url": "attachment://image.png"
                },
                "fields": [
                    {
                        "name": "Rarity",
                        "value": "Normal"
                    }
                ]
            },
            "files": [
                {
                    "attachment": canvas.toBuffer(),
                    "name": 'image.png'
                }
            ]
        }

        if(type){
            embed.embed.fields[0].value = 'Legendary';
            embed.embed.color = 16759808;
        }

        let name = result[0].name;
        let surname = result[0].surname;
        name = name[0].toUpperCase();
        if(surname){
            surname = surname[0].toUpperCase();
            name = name + " " + surname;
        }
        
        embed.embed.title = name;
        
        message.channel.send(embed);
        lastSpawn[0] = result[0];
    }


}