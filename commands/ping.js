module.exports = {
    name: 'ping',
    description: 'Ping!',
    cooldown: 5,
    aliases: ['p'],
    execute(message, args) {
        message.channel.send('Pong.');
    },
};