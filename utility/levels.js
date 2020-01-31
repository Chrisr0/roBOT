const sql = require('./sql.js');

exports.addLevel = function (message) {
    sql.pool.query(sql.getScore, [message.author.id, message.guild.id], function (error, results, fields) {
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
        sql.pool.query(sql.setScore, [score.id, score.user, score.guild, score.exp, score.level, score.exp, score.level], function (error, results, fields) {
            if (error) {
                return console.error(error.message);
            }
        });
    });
}