const Discord = require('discord.js');
const fs = require('fs');

//require('dotenv').config();

const level = require('./utility/levels.js');
const spoiler = require('./utility/spoiler.js');
const music = require('./utility/music.js');
const spawner = require('./utility/waifuspawner.js');

const prefix = 't.';

console.log('Start');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


const talkedRecently = new Set();
const cooldowns = new Discord.Collection();





client.on('ready', () => {

    console.log('I am ready!');
    client.user.setPresence({ status: 'online', game: { name: 't.help' } });
});

client.on('message', message => {
    if (message.author.bot) return;
    if (!talkedRecently.has(message.author.id)) {
        if(message.channel.id == 664443994272563203){
            spawner.spawn(message);
        }
        level.addLevel(message);
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 60000);
    }

    if (message.isMentioned(client.user)) message.reply('My prefix: ' + prefix);

    if (!message.content.startsWith(prefix)) {
        if (spoiler.autoSpoiler.has(message.author.id) && message.attachments.array().length) {
            spoiler.exec(message);
        } else {
            return;
        }
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    if (!command) return;

    if (command.args && !args.length) {
        let reply = `This command requires arguments, ${message.author}!`;
        
        if (command.usage) {
            reply += `\nUżycie: \`${prefix}${command.name} ${command.usage}\``;
        }
        
        return message.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`Wait ${timeLeft.toFixed(1)} seconds before using this command again \`${command.name}\`.`);
        }
    }

    if(message.author.id != 323059628558516225){
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Error ocured!');
    }

    //CmdHandler.exec(message,client);
});

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === '💬');

    // Do nothing if the channel wasn't found on this server
    if (!channel) return;

    // Send the message, mentioning the member
    channel.send(`Hello ${member}, have a nice game :tada::hugging: !`);
});


client.login(process.env.BOT_TOKEN);






process.on('uncaughtException', function (err) {
    console.error("\x1b[31m",(new Date).toLocaleTimeString('pl-PL') + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
})
