const { MessageEmbed, Permissions } = require('discord.js')
const { embed_playering } = require('../../functions/music')
const { all } = require('../../functions/button-music')
module.exports = {
    name: "music-setup",
    type: "admin",
    description: "เปิดช่องสำหรับสั่งเพลงบอท",
    aliases: ['music-setup', 'setup'],
    async run(client, message, args, prefix) {
        try {
            client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE ?", message.guild.id, async (err, result) => {
                if (result.length > 0) {
                    if (result[0].MusicChannelID !== null) {
                        try {
                            const ch = await message.guild.channels.cache.get(result[0].MusicChannelID)
                            if (ch) {
                                message.channel.send({
                                    embeds: [
                                        new MessageEmbed()
                                            .setColor("#ff0887")
                                            .setDescription(`มีห้องเปิดเพลงอยู่เเล้ว <#${ch.id}>`)
                                    ]
                                })
                            } else {
                                this.create_room(client, message, args, prefix)
                            }
                        } catch (e) {
                            this.create_room(client, message, args, prefix)
                        }
                    } else {
                        this.create_room(client, message, args, prefix)
                    }
                }

            })
        } catch (err) {
            console.log(err)
        }
    },
    async create_room(client, message, args, prefix) {
        const channe = await message.guild.channels.create('004-music', {
            type: 'GUILD_TEXT',
            rateLimitPerUser: 5,
            topic: `ดิสคอร์ด: https://discord.gg/004 | เชิญบอท: https://004bot.xyz/invite`,
            permissionOverwrites: [
                {
                    id: client.user.id,
                    allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.SEND_MESSAGES],
                },
            ],
        })
        if (channe) {
            client.mysql.query("UPDATE `guilds` SET `MusicChannelID` = '" + channe.id + "' WHERE `guilds`.`guild` = " + message.guild.id + ";")
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor("#ff0887")
                        .setDescription(`ได้ทำการสร้างช่องเพลงเรียบร้อยเเล้ว <#${channe.id}>`)
                        .setTimestamp()
                ]
            })
            channe.send(`<@!${message.author.id}>`).then(tag => {
                setTimeout(() => {
                    tag.delete().catch(() => { });
                }, 500)
            }).catch(() => { });
            embed_playering(client, message.guild.id)
            // channe.send({
            //     content: `เข้าร่วมห้องพูดคุย และพิมพ์ชื่อเพลงหรือลิงก์ของเพลง เพื่อเปิดเพลง`,
            //     embeds: [
            //         new MessageEmbed()
            //             .setColor("#ff0887")
            //             .setAuthor(`004 MUSIC`, client.user.avatarURL())
            //             .setTitle(`ไม่พบพลงที่กำลังเล่นในขณะนี้!`)
            //             .setImage(
            //                 `https://cdn.discordapp.com/attachments/844249988795465728/865547952801579018/b1c0b055835c9042.png`
            //             )
            //             .setFooter(`Prefix : ${prefix}`)
            //     ],
            //     components: all(true)
            // }).then(msg => {
            //     client.mysql.query("UPDATE `guilds` SET `MusicMessageID` = '" + msg.id + "' WHERE `guilds`.`guild` = " + message.guild.id + ";")
            // }).catch(e => { console.error(e) });
        }
    }
}