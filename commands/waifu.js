/*

POST /generate_big HTTP/1.1
Host: api.waifulabs.com
Content-Type: application/json
Content-Length: 74

{"currentGirl":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,[0.0,0.0,0.0]], "size":512, "step":4}

(          )(                      )(          ) X  [             ]
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [0.0, 0.0, 0.0]]
 ^           ^                       ^
pose        color                   color palette


0: ?
1: 00-15 389697
2: 12-15 177399 - color palette
3: 04-11 982835 - details
4: 00-03 977399 - pose

1:[227.9875,172.205,162.7825]
2:[230.685,128.8725,155.0175]
3:[199.7025,85,113.115]
4:[196.0075,91.1275,106.7375]


var image = new Image();
image.src = 'data:image/png;base64,iVBORw0K...';
*/
const request = require('request');
const apiUrl = "https://api.waifulabs.com/generate_big";

module.exports = {
    name: 'waifu',
    description: 'Generator WaifuLabs',
    usage: '<pose> <details> <color palette>',
    args: true,
    cooldown: 15,
    execute(message, args) {

        let options = {
            url: apiUrl,
            method: 'POST',
            json: { "currentGirl": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, [0.0, 0.0, 0.0]], "step": 4}
        }

        for ($i = 0; $i < 4; $i++) {
            options.json.currentGirl[$i] = parseInt(args[0]);
        }
        for ($i = 4; $i < 12; $i++) {
            options.json.currentGirl[$i] = parseInt(args[1]);
        }
        for ($i = 12; $i < 16; $i++) {
            options.json.currentGirl[$i] = parseInt(args[2]);
        }

        console.log(options);

        request(options, function (error, response, body) {
            console.error('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            let resp = body.girl;
            let buff = new Buffer.from(resp, 'base64');
            message.reply({ files: [buff] });
        });
    },
};