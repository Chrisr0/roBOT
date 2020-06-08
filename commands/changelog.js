const fs = require('fs');

module.exports = {
    name: 'changelog',
    description: 'Changelog',
    cooldown: 5,
    execute(message, args) {
        fs.readFile('res/cl.txt', 'utf8', function (err, data) {
            console.log(data);
            console.log(err);
            message.channel.send("Changelog:\n" + data);
        });
    },
};