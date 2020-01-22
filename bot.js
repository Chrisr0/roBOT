const Discord = require('discord.js');

const CmdHandler = require('./cmdHandler.js');
const GreetModule = require('./modules/greeting.js')

const prefix = 't.';

console.log('Start');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {
    if (message.isMentioned(client.user)) message.reply('My prefix: ' + prefix);
    if (!message.content.startsWith(prefix)) return;
    CmdHandler.exec(message);
});

client.on('guildMemberAdd', member => {
    GreetModule.send(member);
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
