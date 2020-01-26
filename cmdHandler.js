const Discord = require ('discord.js');

const FunModule = require('./modules/fun.js');
const LevelModule = require('./modules/levels.js');
const UtilityModule = require('./modules/utility.js');

exports.exec = function (message){
    var cmd = message.content.substring(2); //prefix.length
    var args = cmd.split(" ");
    cmd = args[0];
    args.shift();
    if (cmd === 'ping') {

       message.reply('pong');

       }
    if (cmd === 'cat') {

       FunModule.catSend(message);

    }
    if (cmd === 'dog') {

        FunModule.dogSend(message);

    }
    if (cmd === 'rank') {
        LevelModule.getLevel(message);
    }
    if (cmd === 'rank') {
        LevelModule.getRanking(message);
    }
    if (cmd === 'sauce'){
        FunModule.randSend(message);
    }
    if (cmd === 'anime') {
        FunModule.animeSend(message);
    }
    if (cmd === 'spoiler') {
        UtilityModule.toggle(message);
    }
    if (cmd === 'help'){
        message.reply('Pomoc:\n\nFun:\n-cat - losowe zdjęcie kota\n-dog - losowe zdjęcie psa\n-sauce - losowy numer z zakresu od 0 do 400 000 (Do celów naukowych)[przyp. ViaS]');
    }
}