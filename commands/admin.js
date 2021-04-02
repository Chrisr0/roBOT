function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

function eval(message, args){
    try {
        const code = args.join(" ");
        console.log(code);
        let evaled = eval(code);

        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);

        message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}

function enable(message,args){
    let command = message.client.commands.get(args[1]);
    if(!command) return message.channel.send("Command not found");
    command.disabled = false;
    message.channel.send("Command enabled");
}

function disable(message,args){
    let command = message.client.commands.get(args[1]);
    if(!command) return message.channel.send("Command not found");
    command.disabled = true;
    message.channel.send("Command disabled");
}

module.exports = {
    name: 'admin',
    args: true,
    cooldown: 5,
    execute(message, args) {
        console.log(message.author.id);
        if (message.author.id != 323059628558516225) return;
        switch (args[0]) {
            case 'eval':
                eval(message,args);
                break;
            case 'enable':
                enable(message,args);
                break;
            case 'disable':
                disable(message,args);
                break;
            default:
                break;
        }
    },
};