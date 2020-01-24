const Discord = require('discord.js');
const mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'remotemysql.com',
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: '5Av8ACI1s1'
});

exports.init = function () {
    console.log('INITLEVEL');
}

var getScore = "SELECT * FROM scores WHERE user = ? AND guild = ?";
var setScore = "INSERT INTO scores (id,user,guild,exp,level) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE exp = ?, level = ?";

exports.addLevel = function (message) {
    pool.query(getScore, [message.author.id, message.guild.id], function (error, results, fields) {
        if (error) {
            return console.error(error.message);
        }
        let score = results[0];
        if (!score) {
            score = {
                id: `${message.guild.id}-${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
                exp: 0,
                level: 0
            }
        }
        score.exp += Math.floor(Math.random() * (25 - 15 + 1) + 15);
        let expNeeded = 5 * Math.pow(score.level, 2) + 50 * score.level + 100;
        console.log(expNeeded);
        if (score.exp >= expNeeded) {
            score.exp -= expNeeded;
            score.level++;
            const gg = message.guild.emojis.find(emoji => emoji.name === "gg");
            message.channel.send(`${gg} ${message.member} wbił/a ${score.level} poziom!`);
        }
        pool.query(setScore, [score.id, score.user, score.guild, score.exp, score.level, score.exp, score.level], function (error, results, fields) {
            if (error) {
                return console.error(error.message);
            }
        });
    });
}

exports.getLevel = function (message) {
	pool.query(getScore, [message.author.id, message.guild.id], function (error, results, fields) {
	    if (error) {
	        return console.error(error.message);
	    }
	    message.reply(`Masz ${results[0].exp} pd i ${results[0].level} poziom.`);
	});
}