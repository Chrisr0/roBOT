module.exports = {
    name: 'sauce',
    description: 'Jak wiesz to wiesz ( ͡° ͜ʖ ͡°)',
    cooldown: 5,
    execute(message, args) {
        message.reply(`Twój numer to ${Math.floor(Math.random() * (400000 - 0 + 1) + 0)}`);
    },
};