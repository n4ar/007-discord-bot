const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = {
    name: "help",
    type: "info",
    description: "ดูข้อมูลของบอท",
    aliases: ["help", 'h', '?'],
    async run(client, message, args, prefix) {
        try {
            const dataCMD = {
                info: [],
                music: [],
                game: [],
                admin: [],
            }
            client.commands.forEach(cmd => {
                if (!cmd || cmd.type == "owner" || cmd.aliases[0] == null) { } else {
                    // console.log(cmd)
                    if (cmd.type == 'music') {
                        dataCMD.music.push(`• \`${prefix}${cmd.name}\` - ${cmd.description}`)
                    } else if (cmd.type == 'info') {
                        dataCMD.info.push(`• \`${prefix}${cmd.name}\` - ${cmd.description}`)
                    } else if (cmd.type == 'admin') {
                        dataCMD.admin.push(`• \`${prefix}${cmd.name}\` - ${cmd.description}`)
                    } else if (cmd.type == 'game') {
                        dataCMD.game.push(`• \`${prefix}${cmd.name}\` - ${cmd.description}`)
                    }
                }
            })
            const btn = {
                home: (disabled = false) => {
                    return new MessageButton()
                        .setCustomId("HELP_HOME")
                        .setStyle("SUCCESS")
                        .setDisabled(disabled)
                        .setLabel("หน้าเเรก")
                        .setEmoji(`🏠`)
                },
                info: (disabled = false) => {
                    return new MessageButton()
                        .setCustomId("HELP_INFO")
                        .setStyle("SUCCESS")
                        .setDisabled(disabled)
                        .setLabel("ทั่วไป")
                        .setEmoji(`🔮`)
                },
                music: (disabled = false) => {
                    return new MessageButton()
                        .setCustomId("HELP_MUSIC")
                        .setStyle("SUCCESS")
                        .setDisabled(disabled)
                        .setLabel("เพลง")
                        .setEmoji(`🎶`)
                },
                game: (disabled = false) => {
                    return new MessageButton()
                        .setCustomId("HELP_GAME")
                        .setStyle("SUCCESS")
                        .setDisabled(disabled)
                        .setLabel("เล่นเกม")
                        .setEmoji(`🎮`)
                },
                admin: (disabled = false) => {
                    return new MessageButton()
                        .setCustomId("HELP_ADMIN")
                        .setStyle("SUCCESS")
                        .setDisabled(disabled)
                        .setLabel("ผู้ดูเเล")
                        .setEmoji(`🛡️`)
                },
            }

            const create = await message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setAuthor(`004 Commands`, client.user.displayAvatarURL())
                        .setDescription(`เฮ้หวัดดี ถ้าอยากรู้ว่าเราทำอะไรได้บ้างลองกดที่ปุ่มด้านล่างดู\n\n(เพื่อให้บอทสามารถทำงานได้ทุกฟังก์ชั่นโปรดให้ Permissions: ADMINISTRATOR)`)
                        .addField(`• เชิญบอท`, `[เชิญบอท](https://004bot.xyz/invite)`, true)
                        .addField(`• เว็บไซต์`, `[เว็บไซต์](https://004bot.xyz)`, true)
                        .addField(`• ดิสคอร์ด`, `[ดิสคอร์ด](https://discord.gg/004)`, true)
                        .setTimestamp()
                        .setImage("https://cdn.discordapp.com/attachments/844249988795465728/865547952801579018/b1c0b055835c9042.png")
                        .setFooter(`www.004bot.xyz • Version ${client.config.version}`, message.member.user.displayAvatarURL({ dynamic: true }))
                        .setColor(0xff0887),
                ],
                components: [
                    new MessageActionRow().addComponents(btn.home(true), btn.info(), btn.music()),
                    new MessageActionRow().addComponents(btn.game(), btn.admin())
                ]
            })
            const filter = (i) => i.user.id === message.author.id
            const collector = create.createMessageComponentCollector(filter, {
                componentType: "BUTTON",
                time: 1000 * 60
            });
            collector.on('collect', async i => {
                console.log(i.customId)
                if (i.user.id === message.author.id) { i.deferUpdate() } else {
                    i.reply({ content: `ไม่ใช้ \`${prefix}help\` ของตัวเองอ่ะ`, ephemeral: true });
                    return false
                }
                if (i.customId == "HELP_HOME") {
                    create.edit({
                        embeds: [
                            new MessageEmbed()
                                .setAuthor(`004 Commands`, client.user.displayAvatarURL())
                                .setDescription(`เฮ้หวัดดี ถ้าอยากรู้ว่าเราทำอะไรได้บ้างลองกดที่ปุ่มด้านล่างดู\n\n(เพื่อให้บอทสามารถทำงานได้ทุกฟังก์ชั่นโปรดให้ Permissions: ADMINISTRATOR)`)
                                .addField(`• เชิญบอท`, `[เชิญบอท](https://004bot.xyz/invite)`, true)
                                .addField(`• เว็บไซต์`, `[เว็บไซต์](https://004bot.xyz)`, true)
                                .addField(`• ดิสคอร์ด`, `[ดิสคอร์ด](https://discord.gg/004)`, true)
                                .setTimestamp()
                                .setImage("https://cdn.discordapp.com/attachments/844249988795465728/865547952801579018/b1c0b055835c9042.png")
                                .setFooter(`www.004bot.xyz • Version ${client.config.version}`, message.member.user.displayAvatarURL({ dynamic: true }))
                                .setColor(0xff0887),
                        ],
                        components: [
                            new MessageActionRow().addComponents(btn.home(true), btn.info(), btn.music()),
                            new MessageActionRow().addComponents(btn.game(), btn.admin())
                        ]
                    })
                } else if (i.customId == "HELP_INFO") {
                    create.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor(0xff0887)
                                .setDescription(`🔮 **คำสั่งทั่วไป**\n\n${dataCMD.info.join('\n')}`)
                        ],
                        components: [
                            new MessageActionRow().addComponents(btn.home(), btn.info(true), btn.music()),
                            new MessageActionRow().addComponents(btn.game(), btn.admin())
                        ]
                    })
                } else if (i.customId == "HELP_MUSIC") {
                    create.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor(0xff0887)
                                .setDescription(`🎶 **คำสั่งเพลง**\n\n${dataCMD.music.join('\n')}`)
                        ],
                        components: [
                            new MessageActionRow().addComponents(btn.home(), btn.info(), btn.music(true)),
                            new MessageActionRow().addComponents(btn.game(), btn.admin())
                        ]
                    })
                } else if (i.customId == "HELP_GAME") {
                    create.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor(0xff0887)
                                .setDescription(`🎮 **คำสั่งเกม**\n\n${dataCMD.game.join('\n')}`)
                        ],
                        components: [
                            new MessageActionRow().addComponents(btn.home(), btn.info(), btn.music()),
                            new MessageActionRow().addComponents(btn.game(true), btn.admin())
                        ]
                    })
                } else if (i.customId == "HELP_ADMIN") {
                    create.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor(0xff0887)
                                .setDescription(`🛡️ **คำสั่งผู้ดูเเล**\n\n${dataCMD.admin.join('\n')}`)
                        ],
                        components: [
                            new MessageActionRow().addComponents(btn.home(), btn.info(), btn.music()),
                            new MessageActionRow().addComponents(btn.game(), btn.admin(true))
                        ]
                    })
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
}