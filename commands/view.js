const sql = require('../utility/sql.js');
const util = require('util');
const { createCanvas, loadImage } = require('canvas');
const request = require('request');

const query = util.promisify(sql.pool.query).bind(sql.pool);
const arequest = util.promisify(request);

module.exports = {
    name: 'view',
    description: 'View waifu!',
    args: true,
    usage: '<id>',
    async execute(message, args) {

        let result = await query(sql.getCharacter, args[0]);
        
        if(result[0].owner_id != `${message.guild.id}-${message.author.id}`){
            return message.reply("Nie posiadasz postaci o takim id");
        }

        const canvas = createCanvas(225, 350);
        var ctx = canvas.getContext('2d');
        let img = await arequest(`https://script.google.com/macros/s/AKfycbxaHN3LvcMLBPt-eScm3VrtmaiMPNxDrILX51qU0u3WJPT5UGIh/exec?q=${result[0].gid}`);
        img = JSON.parse(img.body).image;
        let buff = new Buffer.from(img, 'base64');
        var img1 = await loadImage(buff);
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
                    },
                    {
                        "name": "HP",
                        "value": "hp"
                    },
                    {
                        "name": "DMG",
                        "value": "dmg"
                    },
                    {
                        "name": "SPD",
                        "value": "spd",
                        "inline": true
                    },
                    {
                        "name": "EVA",
                        "value": "eva",
                        "inline": true
                    },
                    {
                        "name": "DEF",
                        "value": "def",
                        "inline": true
                    },
                    {
                        "name": "LVL",
                        "value": "lvl",
                        "inline": true
                    },
                    {
                        "name": "EXP",
                        "value": "exp/100",
                        "inline": true
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

        if(result[0].is_gold){
            embed.embed.fields[0].value = 'Legendary';
            embed.embed.color = 16759808;
        }

        let name = result[0].name;
        let surname = result[0].surname;
        name = name[0].toUpperCase() + name.slice(1);
        if(surname){
            surname = surname[0].toUpperCase() + surname.slice(1);
            name = name + " " + surname;
        }
        
        embed.embed.title = name;
        embed.embed.fields[1].value = result[0].HP;
        embed.embed.fields[2].value = result[0].DMG;
        embed.embed.fields[3].value = result[0].SPD;
        embed.embed.fields[4].value = result[0].EVA;
        embed.embed.fields[5].value = result[0].DEF;
        embed.embed.fields[6].value = result[0].lvl;
        embed.embed.fields[7].value = result[0].exp + "/100";
        
        message.channel.send(embed);
    }


}