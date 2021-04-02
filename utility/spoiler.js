var autoSpoiler = new Set();

exports.autoSpoiler = autoSpoiler;

function sendAll(wh, message){
    var counter = [];
    message.attachments.forEach(async(file) => {
        result = await wh.send({
            files:[{
                attachment: file.url,
                name: `SPOILER_FILE.${file.url.split(".").pop()}`
            }]
        });
        counter.push(result);
        if(counter.length === message.attachments.array().length){
            message.delete();
            wh.delete()
            .catch(error => console.log(error));
        }
    });
    return 1;
}

exports.exec = function (message) {
    let name = message.member.nickname || message.author.username;
    let avatar = message.author.avatarURL({ format: 'png', dynamic: true, size: 2048 });
    message.channel.createWebhook(name, {avatar: avatar})
    .then(wh => sendAll(wh, message))
    .catch(error => console.log(error));
}