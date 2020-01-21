const Discord = require('discord.js');

const CatModule = require('./modules/cat.js');

console.log('Start');

const client = new Discord.Client();

 

client.on('ready', () => {

    console.log('I am ready!');
console.log(CatModule.getUrl());
});

 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }
    if (message.content === 'cat') {

       message.reply({files:['http://www.dnnsoftware.com/Content/Dnn.Platform/Documentation/Resources/Images/Admin/AdvURLManagement/AdvURLManagement_TestURL_650x374.png']});

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
