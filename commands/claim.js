const spawner = require('../utility/waifuspawner.js');
const sql = require('../utility/sql.js');
const util = require('util');

const query = util.promisify(sql.pool.query).bind(sql.pool);

module.exports = {
    name: 'claim',
    description: 'Claim waifu!',
    args: true,
    usage: '<name> <middlename>* <surname>*',
    async execute(message, args) {
        if(spawner.lastSpawn[0]){
            if(spawner.lastSpawn[0].name != args[0].toLowerCase()){
                return message.reply("Incorrect name");
            }
            if(spawner.lastSpawn[0].middlename && spawner.lastSpawn[0].middlename != args[1].toLowerCase()){
                return message.reply("Incorrect name");
            }
            let tmpSur = args[2] || args[1];
            if(spawner.lastSpawn[0].surname && spawner.lastSpawn[0].surname != tmpSur.toLowerCase()){
                return message.reply("Incorrect name");
            }
                let character = spawner.lastSpawn[0];
                spawner.lastSpawn[0] = null;
                await query(sql.claimCharacter, [character.name, character.middlename, character.surname, character.gid, character.HP, character.DMG, character.SPD, character.EVA, character.DEF, character.is_gold, `${message.guild.id}-${message.author.id}`]);
                message.reply(`Claimed: ${character.name} ${character.middlename} ${character.surname}`);
        }
        else{
            message.reply("No character to claim");
        }
    },
};