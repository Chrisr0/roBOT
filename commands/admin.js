const fs = require("fs");

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

function broadcast(message, args){
    args.shift();
    let id = args.shift();
    const lines = args.join(" ").split(";");
    const channel = message.member.guild.channels.cache.find(ch => ch.id === id);
    channel.send(lines);
}

//read changelog from file
function changelog(message, args){
    fs.readFile("./res/cl.txt", "utf8", function(err, data) {
        if (err) throw err;
        const channel = message.member.guild.channels.cache.find(ch => ch.id === "702533676294078565");
        channel.send(data);
    });
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
            case 'broadcast':
                broadcast(message,args);
                break;
            case 'changelog':
                changelog(message,args);
                break;
            case 'help':
                message.channel.send("```\n" +
                    "admin commands:\n" +
                    "eval <code> - evaluates code\n" +
                    "enable <command> - enables command\n" +
                    "disable <command> - disables command\n" +
                    "broadcast <channel id> <message> - broadcasts message to channel\n" +
                    "changelog - shows changelog\n" +
                    "help - shows this help\n" +
                    "```");
                break;
            default:
                break;
        }
    },
};