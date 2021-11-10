const { MessageEmbed, Permissions, MessageButton, MessageActionRow } = require('discord.js')
const config = require('../config')
module.exports = {
    async run(client, interaction, db) {
        const args = interaction.customId.slice(interaction.customId.startsWith('_SHARD_') ? '_SHARD_'.length : 0).split('_');
        const pagea = args.shift().toLowerCase();
        const channelid = args.shift().toLowerCase();
        const userid = args.shift().toLowerCase();
        if (interaction.channelId == channelid && interaction.member.user.id == userid) {
            interaction.deferUpdate()
            const limit = client.config.show_shard_limit;
            const page = parseInt(pagea ?? 1)
            const start = (page - 1) * limit;
            const end = page * limit
            const pageY = Math.ceil(client.shard.count / limit)
            const btn_args_def = [
                [], [], [], [], []
            ]
            let mun = 0
            for (var bi = 0; bi < pageY; bi++) {
                if (btn_args_def[4].length === 5 && btn_args_def.length == 5) { } else {
                    if (btn_args_def[mun].length === 5) {
                        mun = mun + 1
                    }

                    const data_button = new MessageButton()
                        .setCustomId(`_SHARD_${bi + 1}_${interaction.channel.id}_${interaction.member.user.id}`)
                        .setLabel(`${bi + 1}`)
                        .setStyle('PRIMARY')
                    if ((bi + 1) == page) {
                        data_button.setDisabled(true)
                    }
                    btn_args_def[mun].push(data_button)
                }

            }
            const promise = [
                client.shard.fetchClientValues("guilds.cache.size"),
                client.shard.broadcastEval((c) => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
                client.shard.fetchClientValues("channels.cache.size"),
                (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
            ]

            const shardInfo = await client.shard.broadcastEval(c => {
                return [
                    c.shard.ids[0],
                    c.shard.mode,
                    c.guilds.cache.size,
                    c.channels.cache.size,
                    c.guilds.cache.reduce((prev, guild) => prev + guild.memberCount, 0),
                    (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2),
                    c.ws.ping
                ]
            })
            Promise.all(shardInfo)
                .then(resluts => {
                    const msgAction = []
                    btn_args_def.forEach(e => {
                        if (e.length > 0) {
                            msgAction.push(new MessageActionRow().addComponents(e))
                        }
                    })
                    const embedF = []
                    for (var i = start; i < end; i++) {
                        if (resluts[i] === undefined) { } else {
                            embedF.push({
                                name: `${resluts[i][1] == "process" ? "<:online:892439129034485771>" : "<:dnd:814563007026823168>"} Shard ID ${resluts[i][0]}`,
                                value: `\`\`\`js\nServers: ${resluts[i][2].toLocaleString()}\nChannels: ${resluts[i][3].toLocaleString()}\nMembers: ${resluts[i][4].toLocaleString()}\nMemory: ${resluts[i][5]}MB\nPing: ${resluts[i][6]}\`\`\``,
                                inline: true
                            })
                        }
                    }
                    if (page == pageY) {
                        Promise.all(promise).then(res => {
                            const totalMemory = shardInfo.reduce((p, s) => p += parseInt(s[5]), 0);
                            const totalChannels = shardInfo.reduce((p, s) => p += parseInt(s[3]), 0);
                            const avgLatency = Math.round(shardInfo.reduce((p, s) => p += parseInt(s[6]), 0) / shardInfo.length);
                            const totalGuilds = res[0].reduce((prev, guildCount) => prev + guildCount, 0);
                            const totalMembers = res[1].reduce((prev, memberCount) => prev + memberCount, 0);

                            embedF.push({
                                name: "<:online:892439129034485771> Total Stats",
                                value: `\`\`\`js\nServers: ${totalGuilds.toLocaleString()}\nChannels: ${totalChannels.toLocaleString()}\nUsers: ${totalMembers.toLocaleString()}\nMemory: ${totalMemory.toLocaleString()} MB\nAPI: ${avgLatency.toLocaleString()} ms\`\`\``,
                                inline: false
                            });
                            interaction.message.edit({
                                embeds: [
                                    new MessageEmbed()
                                        .setFields(embedF)
                                        .setColor("#ff3ff9")
                                        .setFooter(`Page ${page} of ${pageY}`)
                                        .setTimestamp()
                                ],
                                components: msgAction
                            })
                        });
                        return
                    } else {
                        
                        interaction.message.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setFields(embedF)
                                    .setColor("#ff3ff9")
                                    .setFooter(`Page ${page} of ${pageY}`)
                                    .setTimestamp()
                            ],
                            components: msgAction
                        })
                    }
                })
        }
    }
}