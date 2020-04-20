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
            const canvas = createCanvas(225, 350);
            var ctx = canvas.getContext('2d');
            var img1 = await loadImage('res/original.jpg');
            var img2 = await loadImage("res/frame.png");
            ctx.drawImage(img1, 0, 0);
            ctx.drawImage(img2, 0, 0);
            message.channel.send({files: [canvas.toBuffer()]});
        } catch (err) {
            message.channel.send("error: " + err);
        }
    },
};