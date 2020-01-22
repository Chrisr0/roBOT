const Discord = require('discord.js');
const SQLite = require("better-sqlite3");
const sql = new SQLite('./levels.sqlite');

var getScore;
var setScore;

exports.init = function () {
	const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
	if (!table['count(*)']) {
		// If the table isn't there, create it and setup the database correctly.
		sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, exp INTEGER, level INTEGER);").run();
		// Ensure that the "id" row is always unique and indexed.
		sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
		sql.pragma("synchronous = 1");
		sql.pragma("journal_mode = wal");
	}

	// And then we have two prepared statements to get and set the score data.
	getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
	setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, exp, level) VALUES (@id, @user, @guild, @exp, @level);");
}

exports.addLevel = function(message){
	let score = getScore.get(message.author.id, message.guild.id);
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
		message.channel.send(':gg: ${message.member} wbił/a ${score.level} poziom!');
	}
	setScore.run(score);
}

exports.getLevel = function (message) {
	let score = getScore.get(message.author.id, message.guild.id);
	if (!score) return;
	message.reply('Masz ${score.exp} pd i ${score.level} poziom.');
}