const got = require('got');

const nekobot_end = 'https://www.nekobot.xyz/api/image?type=';
//TODO poprawic to - dorobic jakas liste tagow i potem sprawdzac i wyswietlac w pomocy po tej liscie
const options = ['anal','hanal','4k','ass','hass','boobs','hboobs','gonewild','hentai','hneko','pgif','pussy','tentacle','thigh','hthigh']

module.exports = {
    name: 'nsfw',
    description: '...\nAvailable tags:\n\t' + options.join('\n\t'),
    usage: '<tag>',
    cooldown: 30,
    args: true,
    execute(message, args) {
        const [arg] = args;
        if (options.includes(arg)){
            got(nekobot_end+arg)
            .then(response => {
                const list = JSON.parse(response.body);
                message.reply({ files: [list.message] });
            });
        }
    },
};