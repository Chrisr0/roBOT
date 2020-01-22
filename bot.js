const Discord = require('discord.js');

const CatModule = require('./modules/cat.js');
const GreetModule = require('./modules/greeting.js')

const prefix = 't.';

console.log('Start');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return;
    var cmd = message.content.substring(prefix.length);
    var args = cmd.split(" ");
    cmd = args[0];
    args.shift();
    if (cmd === 'ping') {

       message.reply('pong');

       }
    if (cmd === 'cat') {

       CatModule.send(message);

       }

});

client.on('guildMemberAdd', member => {
    GreetModule.send(member);
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
