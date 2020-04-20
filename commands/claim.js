const spawner = require('../utility/waifuspawner.js');
const sql = require('../utility/sql.js');
const util = require('util');

const query = util.promisify(sql.pool.query).bind(sql.pool);

module.exports = {
    name: 'claim',
    description: 'Claim waifu!',
    args: true,
    usage: '<name> <surname>*',
    async execute(message, args) {
        if(spawner.lastSpawn[0]){
            if(spawner.lastSpawn[0].name != args[0].toLowerCase()){
                return message.reply("Nieprawidłowe imie\\nazwisko");
            }
            if(spawner.lastSpawn[0].surname && spawner.lastSpawn[0].surname != args[1].toLowerCase()){
                return message.reply("Nieprawidłowe imie\\nazwisko");
            }
                let character = spawner.lastSpawn[0];
                spawner.lastSpawn[0] = null;
                await query(sql.claimCharacter, [character.name, character.surname, character.gid, character.HP, character.DMG, character.SPD, character.EVA, character.DEF, character.is_gold, `${message.guild.id}-${message.author.id}`]);
                message.reply(`Złapano: ${character.name} ${character.surname}`);
        }
        else{
            message.reply("Brak postaci do złapania");
        }
    },
};