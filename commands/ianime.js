const randomPuppy = require('random-puppy');

const animeReddits = ["Animewallpaper", "Pixiv", "Moescape", "ZettaiRyouiki", "Patchuu", "MoeStash", "Melanime", "AnimePhoneWallpapers", "awwnime"];
const list = ["time", "top"];

//pora przepisac to na normalne api - tymczasowo dodged the bullet xd

module.exports = {
    name: 'ianime',
    description: 'Random anime image!\n**Sources:** ' + animeReddits,
    cooldown: 10,
    execute(message, args) {
        randomPuppy(animeReddits[Math.floor(Math.random() * animeReddits.length)], list[Math.floor(Math.random() * list.length)])
        .then(url => {
            console.log(url);
            message.reply({ files: [url] });
        });
    },
};