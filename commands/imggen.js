const got = require('got');

const nekobot_end = 'https://www.nekobot.xyz/api/imagegen?type=';
//TODO poprawic to - dorobic jakas lepsza ppomoc
const options = ['clyde','captcha','threats','baguette','ship','whowouldwin','changemymind','jpeg','lolice','kannagen','iphonex','awooify','trap','trumptweet','deepfry','trash']

module.exports = {
    name: 'imggen',
    description: 'Image generator\nAvailable tags:\n\t' + options.join('\n\t'),
    usage: '<tag> <args>',
    cooldown: 30,
    args: true,
    execute(message, args) {
        const arg = args.shift();
        const params = [];
        if(arg == 'clyde'||arg == 'changemymind' || arg == 'kannagen' || arg == 'trumptweet'){
                console.log(args.length);
                if(args.length == 0)return message.reply("You need to include some text");
                let tmp = args.join(' ');
                tmp = "text="+tmp.toString();
                params.push(tmp);
        }
        if(arg == 'captcha'){
                if(!message.mentions.users.first())return message.reply("You must mention someone");
                let tmp1 = "url="+message.mentions.users.first().avatarURL()+"&username="+message.mentions.users.first().username;
                params.push(tmp1);
        }
        if(arg == 'threats' || arg == 'baguette' || arg == 'jpeg' || arg == 'lolice' || arg=='iphonex' || arg == 'awooify' || arg=='trash'){
                let tmp2;
                if(message.mentions.users.first()){
                    tmp2 = "url="+message.mentions.users.first().avatarURL();

                }else{
                    if(args.length == 0)return message.reply("You need to include image URL or mention someone");
                    tmp2 = "url="+args[0];
                }
                
                params.push(tmp2);
        }
        if(arg == 'ship' || arg == 'whowouldwin'){
            let tmp3;
            let ms = message.mentions.users.first(2);
            if(ms.length == 2){
                tmp3 = "user1="+ms[0].avatarURL()+"&user2="+ms[1].avatarURL();

            }else{
                if(args.length < 2)return message.reply("You need to include 2 image URLs or 2 mentions");
                tmp3 = "user1="+args[0]+"&user2="+args[1];
            }
            
            params.push(tmp3);
        }
        if(arg == 'trap'){
            if(!message.mentions.users.first())return message.reply("You must mention someone");
            let tmp4 = "image="+message.mentions.users.first().avatarURL()+"&name="+message.mentions.users.first().username+"&author="+message.author.username;
            params.push(tmp4);
        }
        if(arg=='deepfry'){
            let tmp5;
            if(message.mentions.users.first()){
                tmp5 = "image="+message.mentions.users.first().avatarURL();

            }else{
                if(args.length == 0)return message.reply("You need to include image URL or mention someone");
                tmp5 = "image="+args[0];
            }
            
            params.push(tmp5);
    }

        //console.log(nekobot_end+arg+"&"+params.join());
        //return
        if (options.includes(arg)){
            got(nekobot_end+arg+"&"+params.join())
            .then(response => {
                const list = JSON.parse(response.body);
                //console.log(nekobot_end+"&"+params.join());
                message.reply({ files: [list.message] });
            })
            .catch(err =>{
                const list = JSON.parse(err.response.body);
                console.log(list);
                if(list.status == 400) return message.reply(list.message);
            });
        }
    },
};