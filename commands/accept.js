const sql = require('../utility/sql.js');
const fight = require('./fight.js');
const util = require('util');

const query = util.promisify(sql.pool.query).bind(sql.pool);

module.exports = {
    name: 'accept',
    description: 'Accept fight!',
    args: true,
    usage: '<id>',
    async execute(message, args) {


        if(!fight.invite[0] || message.author.id != fight.invite[0].id){
            return message.reply("Nie zostałes wyzwany")
        }

        let result = await query(sql.getCharacter, args[0]);
        
        if(result[0].owner_id != `${message.guild.id}-${message.author.id}`){
            return message.reply("Nie posiadasz postaci o takim id");
        }

        let char1 = fight.invite[0].char;
        let char2 = result[0];

        fight.invite[0] = null;

        let turn = 1;
        if(char1.SPD < char2.SPD){
            turn = 2;
        }
        let log = "";
        log += "1: " + char1.id + "| " + char1.name + " " + char1.surname + "\n";
        log += "2: " + char2.id + "| " + char2.name + " " + char2.surname + "\n\n"
        while(char1.HP > 0 && char2.HP > 0){
            if(turn == 1){
                if(Math.random() <= (char2.EVA / 100)){
                    log += "1 Missed\n";
                }else{
                    let dmg = char1.DMG - (char1.DMG * (char2.DEF / 100))
                    log += "1 Dealt " + dmg + " dmg\n";
                    char2.HP -= dmg;
                }
                turn = 2
            }
            else if(turn == 2){
                if(Math.random() <= (char1.EVA / 100)){
                    log += "2 Missed\n";
                }else{
                    let dmg = char2.DMG - (char2.DMG * (char1.DEF / 100));
                    log += "2 Dealt " + dmg + " dmg\n";
                    char1.HP -= dmg;
                }
                turn = 1
            }
        }

        log += "\n1: " + char1.HP + " HP\n";
        log += "2: " + char2.HP + " HP";

        message.channel.send(log);
        if(char2.HP > 0){
            let exp = char2.exp + 10;
            let lvl = char2.lvl;
            if (exp > 100){
                exp -= 100;
                lvl++;
            }
            await query(sql.updateCharacterLevel,[exp,lvl,char2.id])
        }else{
            let exp = char2.exp + 5;
            let lvl = char2.lvl;
            if (exp > 100){
                exp -= 100;
                lvl++;
            }
            await query(sql.updateCharacterLevel,[exp,lvl,char2.id])
        }
        if(char1.HP > 0){
            let exp = char1.exp + 10;
            let lvl = char1.lvl;
            if (exp > 100){
                exp -= 100;
                lvl++;
            }
            await query(sql.updateCharacterLevel,[exp,lvl,char1.id])
        }else{
            let exp = char1.exp + 5;
            let lvl = char1.lvl;
            if (exp > 100){
                exp -= 100;
                lvl++;
            }
            await query(sql.updateCharacterLevel,[exp,lvl,char1.id])
        }
    }


}