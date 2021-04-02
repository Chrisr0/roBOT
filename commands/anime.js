const randomPuppy = require('random-puppy');

const animeReddits = ["Animewallpaper", "Pixiv", "Moescape", "ZettaiRyouiki", "Patchuu", "MoeStash", "Melanime", "AnimePhoneWallpapers", "awwnime"];
const list = ["new", "hot"];

//TODO pora przepisac to na normalne api

module.exports = {
    name: 'anime',
    description: 'Random anime image!\n**Sources:** ' + animeReddits,
    cooldown: 10,
    disabled: true,
    execute(message, args) {
        randomPuppy(animeReddits[Math.floor(Math.random() * animeReddits.length)], list[Math.floor(Math.random() * list.length)])
        .then(url => {
            console.log(url);
            message.reply({ files: [url] });
        });
    },
};