
module.exports = {
    name: 'games',
    description: 'Random dog picture!',
    cooldown: 30,
    execute(message, args) {
        if(args[0] === 'slots'){
            slots(message);
        }
    },
};

//slot game with fruit pictures
function slots(message) {
    var fruits = ["🍎", "🍊", "🍋", "🍉", "🍒", "🍍", "🍌", "🍐", "🍊", "🍋", "🍉", "🍒", "🍍", "🍌", "🍐"];
    var result = [fruits[Math.floor(Math.random() * fruits.length)], fruits[Math.floor(Math.random() * fruits.length)], fruits[Math.floor(Math.random() * fruits.length)]];
    message.channel.send(`${result[0]} ${result[1]} ${result[2]}`);
    if (result[0] === result[1] && result[0] === result[2]) {
        message.channel.send(`YOU WIN!!!`);
    }else{
        message.channel.send(`YOU LOSE!!!`);
    }
}