module.exports = {
    name: 'ping',
    description: 'Ping!',
    args: true,
    usage: '<test>',
    cooldown: 5,
    aliases: ['p'],
    execute(message, args) {
        message.channel.send('Pong.');
    },
};