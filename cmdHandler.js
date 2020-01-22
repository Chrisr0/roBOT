const Discord = require ('discord.js');

const CatModule = require('./modules/cat.js');

exports.exec = function (message){
    var cmd = message.content.substring(2); //prefix.length
    var args = cmd.split(" ");
    cmd = args[0];
    args.shift();
    if (cmd === 'ping') {

       message.reply('pong');

       }
    if (cmd === 'cat') {

       CatModule.send(message);

       }
}