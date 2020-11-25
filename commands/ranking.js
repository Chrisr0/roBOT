const sql = require('../utility/sql.js');

module.exports = {
    name: 'ranking',
    description: 'Show server ranking',
    cooldown: 15,
    aliases: ['rank'],
    async execute(message, args) {
        sql.pool.query(sql.getRanking, [message.guild.id], function (error, results, fields) {
            if (error) {
                return console.error(error.message);
            }
            let ranking = "";
            let counter = 0;
            let i = 0;
            let j = 0;
            for(j; j < results.length; j++){
            let user = await message.client.fetchUser(result[j].user);
                let member;
                try{
                    member = await message.guild.fetchMember(user);
                }
                catch(e){
                }
                if (member){ 
                    let name = member.nickname || user.username;
                    ranking += `${i + 1}. ${name} Level: ${result[j].level}\n`;
                    i++;
                }
                counter++;
                if(counter === results.length){
                    message.channel.send(ranking);
                }
            }
        });
    },
};
