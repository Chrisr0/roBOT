const sql = require('../utility/sql.js');
const util = require('util');

const query = util.promisify(sql.pool.query).bind(sql.pool);

let invite = [null];

module.exports = {
    invite: invite,
    name: 'fight',
    description: 'Challenge user!',
    args: true,
    usage: '<opponent> <id>',
    async execute(message, args) {

        let result = await query(sql.getCharacter, args[1]);

        if(!result[0]){
            return message.reply("Character not found");
        }
        
        if(result[0].owner_id != `${message.guild.id}-${message.author.id}`){
            return message.reply("You're not the owner of this character");
        }

        if(!message.mentions.users.first() || message.mentions.users.first().id == message.author.id){
            return message.reply("You must mention your opponent");
        }

        if(message.mentions.users.first()){
            invite[0] = {id: message.mentions.users.first().id, char: result[0]};
        }
        message.channel.send(`${message.mentions.users.first()} you were challenged by ${message.author} use \`\`\`t.accept <character_id>\`\`\` to duel`);
    }


}