const sql = require('../utility/sql.js');

module.exports = {
    name: 'ranking',
    description: 'Show server ranking',
    cooldown: 15,
    aliases: ['rank'],
    execute(message, args) {
        sql.pool.query(sql.getRanking, [message.guild.id], function (error, results, fields) {
            if (error) {
                return console.error(error.message);
            }
            let ranking = "";
            let counter = 0;
            results.forEach(async(result) => {
                let user = await message.client.fetchUser(result.user);
                console.log(user);
                let member = await message.guild.fetchMember(user);
                console.log(member);
                let name = member.nickname || user.username;
                ranking += `${counter + 1}. ${name} Level: ${result.level}\n`;
                counter++;
                if(counter === results.length){
                    message.channel.send(ranking);
                }
            });
        });
    },
};
