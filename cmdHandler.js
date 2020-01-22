const Discord = require ('discord.js');

const FunModule = require('./modules/fun.js');
const LevelModule = require('./modules/levels.js');

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
        LevelModule.getScore(message);
    }

}