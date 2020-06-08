module.exports = {
    name: 'sauce',
    description: '( ͡° ͜ʖ ͡°)',
    cooldown: 5,
    execute(message, args) {
        message.reply(`Magic number: ${Math.floor(Math.random() * (400000 - 0 + 1) + 0)}`);
    },
};