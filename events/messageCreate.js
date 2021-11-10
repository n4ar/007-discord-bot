const chalk = require('chalk')
const config = require('../config')
const { music } = require('../functions/music')
const fs = require('fs')
module.exports = async (client, message) => {
    
    if (message.channel.name.includes('คุยกับมิว') || message.content.includes('มิว') || message.channel.name.includes('คุยกับบอท') || message.channel.name.includes('แชทบอท') || message.channel.name.includes('พูดคุยกับบอท')) {
        if (message.author.bot === false) {
            if (message.channel.id != '886106803035836466' && !message.content.startsWith('*') && !message.content.startsWith('!!')) {
                // console.log(` ${message.guild.name} - ${message.channel.name}(${message.channel.id}) | ${message.author.tag} > ${message.content}`)
                fs.readFile('ai/results.json', function (err, data) {
                    var jsonA = JSON.parse(data)

                    if (jsonA.find(d => d.q === message.content)) { } else {
                        jsonA.push({
                            q: `${message.content}`,
                            a: ``,
                            s: ``,
                            f: ``
                        })
                        let jsonad = JSON.stringify(jsonA);
                        fs.writeFile('ai/results.json', jsonad, function (err) {
                            if (err) return console.log(err);
                            console.log('Note added ('+jsonA.length+') > ' + message.content);
                        });
                        // fs.writeFile('', JSON.stringify(jsonA))
                    }

                })
            }

        }
    }
    try {
        if (message.author.bot) return;
        if (!message.author.bot && message.channel.type != "GUILD_TEXT") return
        let sv___ = config.defaults
        const blacklist = []
        client.mysql.query("SELECT * FROM `blacklist` WHERE `KEY` LIKE 'guild' AND `VALUE` LIKE '" + message.guild?.id + "' AND `LOAD` = 1", (err, guildBackList) => {
            if (!guildBackList) return
            if (guildBackList.length > 0) {
                blacklist.push(message.guild?.id)
            }
        })
        client.mysql.query("SELECT * FROM `blacklist` WHERE `KEY` LIKE 'user' AND `VALUE` LIKE '" + message.author?.id + "' AND `LOAD` = 1", (err, userBackList) => {
            if (!userBackList) return
            if (userBackList.length > 0) {
                blacklist.push(message.author?.id)
            }
        })
        const TargetBot = message.mentions.users.first() ?? undefined
        client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + message.guild?.id + "'", (err, result) => {
            if (err) return
            if (result.length > 0) {
                sv___ = result[0]
            } else {
                client.mysql.query("INSERT INTO `guilds` (`id`, `guild`) VALUES (NULL, '" + message.guild?.id + "')", (err, created) => {
                    if (created) {
                        console.log(chalk.bgGreen((`| ${created.insertId} | ${message.guild.name} (${message.guild.id})`)))
                    }
                })
            }

            const guildet = sv___
            const prefix = config.dev.status ? config.dev.prefix : guildet.prefix

            if (!client.config.owners.includes(message.author.id)) return
            if (message.channel.id === guildet?.MusicChannelID) {
                music(client, message, prefix, guildet)
            } else if (message.content.startsWith(prefix)) {
                if (!config.owners.includes(message.author.id)) {
                    if (blacklist.includes(message.guild.id)) return message.channel.send({ content: '```This server has been banned from our bots.' + "\n\n" + 'Contact the bot owner to resolve this issue.```' + "" + '**office server:** https://discord.gg/004' })
                    if (blacklist.includes(message.author.id)) return message.author.send({ content: `\`\`\`Your account has been banned from our bots.` + "\n\n" + `Contact the bot owner to resolve this issue.\`\`\`` + "" + `**office server:** https://discord.gg/004` })
                }
                try {
                    const args = message.content.slice(message.content.startsWith(prefix) ? prefix.length : 0).split(/\s+/);
                    const command = args.shift().toLowerCase();
                    const cmd = client.commands.find(cmd => cmd.aliases?.includes(command)) ? client.commands.find(cmd => cmd.aliases?.includes(command)) : client.commands.get(command)

                    if (!cmd) return
                    try {
                        cmd.run(client, message, args, prefix, guildet)
                    } catch (err) {
                        console.log(err)
                    }
                } catch (err) {
                    console.log(err)
                }
            } else if (TargetBot && TargetBot.id == client.user.id && message.content.startsWith(`<@!${TargetBot.id}>`)) {
                if (!config.owners.includes(message.author.id)) {
                    if (blacklist.includes(message.guild.id)) return message.channel.send({ content: '```This server has been banned from our bots.' + "\n\n" + 'Contact the bot owner to resolve this issue.```' + "" + '**office server:** https://discord.gg/HTwuSS9dTy' })
                    if (blacklist.includes(message.author.id)) return message.author.send({ content: `\`\`\`Your account has been banned from our bots.` + "\n\n" + `Contact the bot owner to resolve this issue.\`\`\`` + "" + `**office server:** https://discord.gg/HTwuSS9dTy` })
                }

                const argstag = message.content.slice(message.content.startsWith(`<@!${TargetBot.id}>`) ? `<@!${TargetBot.id}> `.length : 0).split(" ");
                const commandtag = argstag.shift().toLowerCase() ?? "help"
                const cmdtag = client.commands.find(cmd => cmd.aliases.includes(commandtag)) ? client.commands.find(cmd => cmd.aliases.includes(commandtag)) : client.commands.get(commandtag)

                console.log(commandtag)
                console.log(cmdtag)
                if (!cmdtag) return

                try {
                    // cmdtag.run(client, message, args, language)
                } catch (err) {
                    console.log(err)
                }
            }


        });

    } catch (err) {
        console.log(err)
    }
}