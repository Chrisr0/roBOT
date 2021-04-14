const got = require('got');

module.exports = {
    name: 'meme',
    description: 'Random image from r/dankmemes',
    cooldown: 10,
    execute(message, args) {
            got('https://www.reddit.com/r/dankmemes/random/.json')
		    .then(response => {
                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;
                message.reply({ files: [post.data.url] });
            })
    },
};