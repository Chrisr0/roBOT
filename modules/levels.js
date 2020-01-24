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
var setScore = "INSERT INTO scores (id,user,guild,exp.level) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE exp = ?, level = ?";

exports.addLevel = function (message) {
	console.log('ADDLEVEL');
    //let score = getScore.get(message.author.id, message.guild.id);
	let score = null;
	if (!score) {
		score = {
			id: `${message.guild.id}-${message.author.id}`,
			user: message.author.id,
			guild: message.guild.id,
			exp: 0,
			level: 1
		}
	}
	score.exp += Math.floor(Math.random() * (25 - 15 + 1) + 15);
	let expNeeded = 5 * Math.pow(score.level) + 50 * score.level + 100;

	if (score.exp >= expNeeded) {
		score.exp -= expNeeded;
		score.level++;
		message.channel.send(`:gg: ${message.member} wbił/a ${score.level} poziom!`);
	}
	pool.query(setScore, [score.id, score.user, score.guild, score.exp, score.level, score.exp, score.level], function (error, results, fields) {
	    if (error) {
	        return console.error(error.message);
	    }
	});
}

exports.getLevel = function (message) {
	pool.query(getScore, [message.author.id, message.guild.id], function (error, results, fields) {
	    if (error) {
	        return console.error(error.message);
	    }
	    console.log(results);
	});
	//message.reply(`Masz ${score.exp} pd i ${score.level} poziom.`);
}