const sql = require('../utility/sql.js');

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
            message.reply(`Masz ${results[0].exp} pd i ${results[0].level} poziom.`);
        });
    },
};