const sql = require('../utility/sql.js');
const util = require('util');

const query = util.promisify(sql.pool.query).bind(sql.pool);

let invite = [null];

module.exports = {
    invite: invite,
    name: 'fight',
    description: 'Challange user!',
    args: true,
    usage: '<opponent> <id>',
    async execute(message, args) {

        let result = await query(sql.getCharacter, args[1]);
        
        if(result[0].owner_id != `${message.guild.id}-${message.author.id}`){
            return message.reply("Nie posiadasz postaci o takim id");
        }

//TODO sprawdzac czy znaleziono postac o id

        if(!message.mentions.users.first().id || message.mentions.users.first().id == message.author.id)

        if(message.mentions.users.first()){
            invite[0] = {id: message.mentions.users.first().id, char: result[0]};
        }
        message.channel.send(`${message.mentions.users.first()} zostałeś wyzwany przez ${message.author} użyj komendy \`\`\`t.accept <id_postaci>\`\`\` aby przyjąć wyzwanie`);
    }


}