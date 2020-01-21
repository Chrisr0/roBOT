const Discord = require('discord.js');

const CatModule = require('./modules/cat.js');

console.log('Start');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');

});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }
    if (message.content === 'cat') {

       CatModule.send(message);

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
