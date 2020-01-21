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

client.on('guildMemberAdd', member => {

  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'ogólny');

  // Do nothing if the channel wasn't found on this server
  if (!channel) return;

  // Send the message, mentioning the member
  channel.send(`Witaj ${member}, życzymy miłej gry :tada::hugging: !`);
});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
