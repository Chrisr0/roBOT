const Discord = require('discord.js');

const CmdHandler = require('./cmdHandler.js');
const GreetModule = require('./modules/greeting.js');
const LevelModule = require('./modules/levels.js');

const prefix = 't.';

console.log('Start');

const client = new Discord.Client();
const talkedRecently = new Set();


client.on('ready', () => {

    console.log('I am ready!');
    client.user.setPresence({ status: 'online', game: { name: 't.help' } });
    LevelModule.init();

});

client.on('message', message => {
    console.log(message.attachments);
    if (message.author.bot) return;
    if (!talkedRecently.has(message.author.id)) {
        // the user can type the command ... your command code goes here :)
        LevelModule.addLevel(message);

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            // Removes the user from the set after a minute
            talkedRecently.delete(message.author.id);
        }, 60000);
    }
    if (message.isMentioned(client.user)) message.reply('My prefix: ' + prefix);
    if (!message.content.startsWith(prefix)) return;
    CmdHandler.exec(message);
});

client.on('guildMemberAdd', member => {
    GreetModule.send(member);
});


client.login(process.env.BOT_TOKEN);
