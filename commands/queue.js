const music = require('../utility/music.js');


module.exports = {
    name: 'queue',
    description: 'Show song queue <BETA>!',
    cooldown: 5,
    async execute(message, args) {
           
            let queue = "Queue:";
            if(music.queue.length == 0){
                queue = "Queue is empty"
            }
            for(i=0;i<music.queue.length && i<15;i++){
                queue += "\n" + i + "| " + music.queue[i].vid.title;
            }

            message.channel.send(queue);
    }
};
