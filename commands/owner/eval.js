const { MessageEmbed } = require('discord.js')
const config = require('../../config')
const { inspect } = require("util");
module.exports = {
    name: "eval",
    type: "owner",
    description: null,
    aliases: [null],
    async run(client, message, args, prefix, db) {
        if (!config.owners.includes(message.author.id)) return
        try {
            let toEval = args.join(" ");
            let evaluated = inspect(
                eval(toEval, {
                    depth: 0,
                })
            );

            if (!toEval) {
                return message.channel.send(`Error while evaluating: \`air\``);
            } else {
                let hrStart = process.hrtime();
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(
                    `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ""}${hrDiff[1] / 1000000
                    }ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``,
                    {
                        maxLength: 1900,
                    }
                );
            }
        } catch (e) {
            return message.channel.send(`Error while evaluating: \`${e.message}\``);
        }

    }
}