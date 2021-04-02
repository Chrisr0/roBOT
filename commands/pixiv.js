const request = require('request').defaults({ encoding: null });;
const PixivAppApi = require("pixiv-app-api");
const pixiv = new PixivAppApi(process.env.pixemail, process.env.pixpassword, {
    camelcaseKeys: true,
})

let ts = null;

//pixiv.login();
//TODO Potrzebne lepsze api

module.exports = {
    name: 'pixiv',
    description: 'Recommended illustration from Pixiv',
    cooldown: 15,
    disabled: true,
    async execute(message, args) {
        if(ts == null || ts < Date.now()){
            await pixiv.login();
            ts = Date.now + 3600 * 1000;
        }
        //console.log(pixiv.auth);
        let json = await pixiv.illustRecommended();
        let options = {
            url: json.illusts[0].imageUrls.large,
            headers: {
                'Referer': 'http://www.pixiv.net/'
            }
        }
        //console.log(json.illusts[0].imageUrls.large);
        request(options, function (error, response, body) {
            //console.error('error:', error); // Print the error if one occurred
            //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            message.reply({ files: [body] });
            //console.log('body:', body);
        });
    },
};