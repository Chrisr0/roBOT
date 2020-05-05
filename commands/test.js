const { createCanvas, loadImage } = require('canvas');

module.exports = {
    name: 'test',
    description: 'KOMENDA DO TESTOW',
    usage: 'NIE',
    args: false,
    async execute(message, args) {
        if (message.author.id != 323059628558516225) return;
        console.log(Math.random());
        try {
            let obj = "";
        } catch (err) {
            message.channel.send("error: " + err);
        }
    },
};