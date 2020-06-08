const randomPuppy = require('random-puppy');

const animeReddits = ["Animewallpaper", "Pixiv", "Moescape", "ZettaiRyouiki", "Patchuu", "MoeStash", "Melanime", "AnimePhoneWallpapers", "awwnime"];
const list = ["new", "hot"];

module.exports = {
    name: 'anime',
    description: 'Random anime image!\n**Sources:** ' + animeReddits,
    cooldown: 10,
    execute(message, args) {
        randomPuppy(animeReddits[Math.floor(Math.random() * animeReddits.length)], list[Math.floor(Math.random() * list.length)])
        .then(url => {
            message.reply({ files: [url] });
        });
    },
};