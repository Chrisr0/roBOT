const Discord = require('discord.js');

exports.send = function(member){

  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'ogólny');

  // Do nothing if the channel wasn't found on this server
  if (!channel) return;

  // Send the message, mentioning the member
  channel.send(`Witaj ${member}, życzymy miłej gry :tada::hugging: !`);
}
