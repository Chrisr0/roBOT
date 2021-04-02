module.exports = {
    name: 'help',
    description: 'Command list or specific command info',
    aliases: ['h'],
    usage: '[nazwa komendy]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Command list:');
            data.push(commands.map(command => command.name).join('\n'));
            data.push(`\nSend \`${message.client.prefix}help [command]\` to get detailed information about command`);

            return message.channel.send(data, { split: true })
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Incorrect command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${message.client.prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} seconds`);

        message.channel.send(data, { split: true });
    },
};