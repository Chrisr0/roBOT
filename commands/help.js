module.exports = {
    name: 'help',
    description: 'Lista komend lub pomoc do konkretnej komendy.',
    aliases: ['h'],
    usage: '[nazwa komendy]',
    cooldown: 5,
    execute(message, args) {
        const prefix = 't.';
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Lista komend:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nWyślij \`${prefix}help [nazwa komendy]\` by uzyskać szczegółowe informacje o komendzie!`);

            return message.channel.send(data, { split: true })
        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Nieprawidłowa komenda!');
        }

        data.push(`**Nazwa:** ${command.name}`);

        if (command.aliases) data.push(`**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Opis:** ${command.description}`);
        if (command.usage) data.push(`**Użycie:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} sekund(y)`);

        message.channel.send(data, { split: true });
    },
};