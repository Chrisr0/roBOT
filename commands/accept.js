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
            return message.reply("You weren't challenged")
        }

        let result = await query(sql.getCharacter, args[0]);
        
        if(result[0].owner_id != `${message.guild.id}-${message.author.id}`){
            return message.reply("You're not the owner of this character");
        }

        let char1 = fight.invite[0].char;
        let char2 = result[0];

        let hp1 = char1.HP;
        let hp2 = char2.HP;

        fight.invite[0] = null;

        let turn = 1;
        if(char1.SPD < char2.SPD){
            turn = 2;
        }
        let log = "";
        log += "1: " + char1.id + "| " + char1.name;
        if(char1.middlename){
            log += " " + char1.middlename;
        }
        if(char1.surname){
            log += " " + char1.surname;
        }
        log += "\n";
        log += "2: " + char2.id + "| " + char2.name;
        if(char2.middlename){
            log += " " + char2.middlename;
        }
        if(char2.surname){
            log += " " + char2.surname;
        }
        log += "\n\n";
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

        log += "\n1: " + (Math.round(char1.HP*10)/10).toFixed(1) + " HP\n";
        log += "2: " + (Math.round(char2.HP*10)/10).toFixed(1) + " HP";

        message.channel.send(log);
        let winner;
        let loser;
        if(char1.HP > 0){
            winner = char1;
            winner.HP = hp1;
            loser = char2;
            loser.HP = hp2;
        }else{
            winner = char2;
            winner.HP = hp2;
            loser = char1;
            loser.HP = hp1;
        }
//todo komunikat przy poziomie \ zaokraglanie damage
        winner.exp += 10;
        while (winner.exp > 100){
            winner.exp -= 100;
            winner.lvl++;
            winner.HP++;
            winner.DMG++;
            winner.SPD++;
            if(winner.EVA<50)
                winner.EVA++;
            if(winner.DEF<75)
                winner.DEF++;
        }
        console.log(winner);
        await query(sql.updateCharacterLevel,[winner.exp,winner.lvl,winner.HP,winner.DMG,winner.SPD,winner.EVA,winner.DEF,winner.id]);

        loser.exp += 5;
        while (loser.exp > 100){
            loser.exp -= 100;
            loser.lvl++;
            loser.HP++;
            loser.DMG++;
            loser.SPD++;
            if(loser.EVA<50)
                loser.EVA++;
            if(loser.DEF<75)
                loser.DEF++;
        }
        console.log(loser);
        await query(sql.updateCharacterLevel,[loser.exp,loser.lvl,loser.HP,loser.DMG,loser.SPD,loser.EVA,loser.DEF,loser.id]);

    }


}