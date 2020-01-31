const sql = require('../utility/sql.js');
const { createCanvas } = require('canvas');

module.exports = {
    name: 'level',
    description: 'Wyświetla poziom gracza;',
    cooldown: 15,
    aliases: ['lvl'],
    execute(message, args) {
        sql.pool.query(sql.getScore, [message.author.id, message.guild.id], function (error, results, fields) {
            if (error) {
                return console.error(error.message);
            }
            //message.reply(`Masz ${results[0].exp} pd i ${results[0].level} poziom.`);
            let expNeeded = 5 * Math.pow(results[0].level, 2) + 50 * results[0].level + 100;
            let prc=results[0].exp/expNeeded;
            const canvas = createCanvas(300, 150)
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, 300, 150);
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.arc(40, 40, 20, Math.PI * 0.5, Math.PI * 1.5, false);
            ctx.moveTo(40, 60);
            ctx.lineTo(200, 60);
            ctx.arc(200, 40, 20, Math.PI * 0.5, Math.PI * 1.5, true);
            ctx.moveTo(200, 20);
            ctx.lineTo(40, 20);
            ctx.moveTo(40, 40);
            ctx.closePath();
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(160 * prc + 40, 20);
            ctx.lineTo(160 * prc + 40, 60);
            ctx.lineTo(40, 60);
            ctx.arc(40, 40, 20, Math.PI * 0.5, Math.PI * 1.5, false);
            ctx.lineTo(160 * prc + 40, 20);
            ctx.fill();

            ctx.font = '50px serif';
            ctx.fillText("#1", 240, 55, 50);

            ctx.font = '24px serif';
            ctx.fillText(message.author.username, 20, 110, 150);

            ctx.font = '30px serif';
            ctx.fillText(results[0].level, 200, 110, 50);
            ctx.fillText("lvl", 250, 110, 50);

            ctx.font = '20px serif';
            ctx.fillText(`${results[0].exp}/${expNeeded}`, 180, 130, 80);
            var w = ctx.measureText(`${results[0].exp}/${expNeeded}`);
            var t;
            if (w.width > 80) t = 80;
            else t = w.width;
            ctx.fillText("exp", 190 + t, 130, 20);
            message.channel.send({files: [canvas.toBuffer()]});
        });
    },
};