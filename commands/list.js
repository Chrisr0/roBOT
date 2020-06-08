const spawner = require('../utility/waifuspawner.js');
const sql = require('../utility/sql.js');
const util = require('util');

const query = util.promisify(sql.pool.query).bind(sql.pool);

module.exports = {
    name: 'list',
    description: 'List waifu\'s!',
    usage: '<page>',
    async execute(message, args) {
        let page = (args[0]||0) * 10;
        let results = await query(sql.listCharacters,[`${message.guild.id}-${message.author.id}`,page]);
        let embed = {
            "embed": {
                "title": "Character list",
                "description": ""
            }
        }
        console.log(results);
        let tmp = "";
        for(i = 0; i < results.length; i++){
            tmp = tmp + results[i].id + "| " + results[i].name;
            if(results[i].middlename){
                tmp += " " + results[i].middlename;
            }
            if(results[i].surname){
                tmp += " " + results[i].surname;
            }
            tmp += "\n";
        }
        embed.embed.description = tmp;
        message.reply(embed);
    },
};