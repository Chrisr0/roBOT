const Discord = require ('discord.js');

const FunModule = require('./modules/fun.js');

exports.exec = function (message){
    var cmd = message.content.substring(2); //prefix.length
    var args = cmd.split(" ");
    cmd = args[0];
    args.shift();
    if (cmd === 'ping') {

       message.reply('pong');

       }
    if (cmd === 'cat') {

       CatModule.catSend(message);

       }
}