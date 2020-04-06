function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

module.exports = {
    name: 'eval',
    description: 'Lista komend lub pomoc do konkretnej komendy.',
    aliases: ['h'],
    usage: '[nazwa komendy]',
    args: true,
    cooldown: 5,
    execute(message, args) {
        console.log(message.author.id);
        if (message.author.id != 323059628558516225) return;
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
    },
};