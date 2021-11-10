const { MessageEmbed, Permissions } = require('discord.js')
const config = require('../config')
const mu = require('./music')
const wait = require('util').promisify(setTimeout);
const { all } = require('./button-music')
module.exports = {
    async run(client, interaction, db) {
        try {

            const { channel } = interaction.member.voice
            if (!channel) return this.msgtimeout(interaction, 'คุณยังไม่ได้เข้าช่องเสียงเลยครับ!', "RED", 5, true)
            if (!config.owners.includes(interaction.user.id)) {
                if (!interaction.guild.me.permissions.has(Permissions.FLAGS.CONNECT)) return this.msgtimeout(interaction, 'ฉันไม่มีสิทธ์ในการเชื่อมต่อช่องเเสียง!', "RED", 5, true)
                if (!interaction.guild.me.permissions.has(Permissions.FLAGS.SPEAK)) return this.msgtimeout(interaction, 'ฉันไม่มีสิทธ์ในการพูดในช่องเสียงเลย!', "RED", 5, true)
            }
            const player = client.manager.players.get(interaction.guild.id)
            // console.log(interaction.customId)
            if ([
                'MUSIC_PREVIOU', 'MUSIC_PLAY_PAUSE',
                'MUSIC_NEXT','MUSIC_LOOP', 
                'MUSIC_SHUFFLE', 'MUSIC_PLUS_VOLUME',
                'MUSIC_LOW_VOLUME', 'MUSIC_OPEN_AND_CLOSE_LOW_VOLUME'
                ].includes(interaction.customId)) {
                if (!player)  {
                    mu.embed_playering(client, interaction.guild.id, interaction.member.user.id)
                    this.msgtimeout(interaction, 'ยังไม่มีเพลงเล่นได้ขณะนี้เลย!', "RED", 3, true)
                    return
                }
                if (player.channel !== channel.id) return this.msgtimeout(interaction, 'คุณไม่ได้อยู่ช่องเดี๋ยวกับบอท!', "RED", 3, true)
            }
            if (interaction.customId === "MUSIC_PREVIOU") {
                const pre = await player.queue.previou()
                if (pre == 'CAN_NOT_PREVIOU_MUSIC') return this.msgtimeout(interaction, 'ฉันไม่สามารถย้อนเพลงให้ได้!', "RED", 3, true)
                // this.msgtimeout(interaction, `ย้อนเพลง \`${pre.title}\` เรียบร้อย`, "GREEN", 3)

                player.queue.messageUpdate = `${interaction.member.user.username} ย้อนเพลง`
                interaction.deferUpdate()
                mu.embed_playering(client, interaction.guild.id, interaction.member.user.id)
                return
            } else if (interaction.customId === "MUSIC_PLAY_PAUSE") {
                if (!player.playing) {
                    player.pause(false);
                    player.queue.messageUpdate = `${interaction.user.username} | ได้เล่นเพลงต่อ`
                } else {
                    player.pause(true);
                    player.queue.messageUpdate = `${interaction.user.username} | หยุดเพลง`
                }
                mu.embed_playering(client, interaction.guild.id, interaction.member.user.id)
                interaction.deferUpdate()
            } else if (interaction.customId === "MUSIC_NEXT") {
                if (player._autoplay == true) { } else {
                    if (player.queue.tracks.length === 0) {
                        return this.msgtimeout(interaction, 'ฉันไม่สามารถข้ามเพลงให้ได้!', "RED", 3, true)
                    }
                }
                const skD = await player.queue.skip()
                player.queue.messageUpdate = `${interaction.member.user.username} ข้ามเพลงเเล้ว`
                interaction.deferUpdate()
                return
            } else if (interaction.customId === "MUSIC_LOOP") {
                interaction.deferUpdate()
            } else if (interaction.customId === "MUSIC_SHUFFLE") {
                interaction.deferUpdate()
            } else if (interaction.customId === "MUSIC_PLUS_VOLUME") {
                const vplus = player.volume + 10
                if (vplus > 100) return this.msgtimeout(interaction, 'เพิ่มเสียงให้เกิน \`100%\` ไม่ได้น่ะ!', "RED", 3, true)
                player.setVolume(vplus)
                player.queue.messageUpdate = `เพิ่มเสียงเพลงเป็น ${vplus}%`
                mu.embed_playering(client, interaction.guild.id, interaction.member.user.id)
                interaction.deferUpdate()
            } else if (interaction.customId === "MUSIC_LOW_VOLUME") {
                const vplus = player.volume - 10
                if (vplus < 0) return this.msgtimeout(interaction, 'ลดเสียงให้ต่ำกว่า \`0%\` ไม่ได้นะ!', "RED", 3, true)
                player.setVolume(vplus)
                player.queue.messageUpdate = `ลดเสียงเพลงเป็น ${vplus}%`
                mu.embed_playering(client, interaction.guild.id, interaction.member.user.id)
                interaction.deferUpdate()
            } else if (interaction.customId === "MUSIC_OPEN_AND_CLOSE_LOW_VOLUME") {
                if (player.volume != 0) {
                    player.queue.messageUpdate = `ปิดเสียงเเล้ว`
                    player.setVolume(0)
                } else {
                    player.setVolume(db.defaultVolume)
                    player.queue.messageUpdate = `เพิ่มเสียงเพลงเป็น ${db.defaultVolume}%`
                }
                interaction.deferUpdate()
                mu.embed_playering(client, interaction.guild.id, interaction.member.user.id)
            } else if (interaction.customId === "MUSIC_RESRT") {
                client.manager.destroy(interaction.guild.id)
                interaction.message.edit({
                    content: `เข้าร่วมห้องพูดคุย และพิมพ์ชื่อเพลงหรือลิงก์ของเพลง เพื่อเปิดเพลง`,
                    embeds: [
                        new MessageEmbed()
                            .setColor("#ff0887")
                            .setAuthor(`004 MUSIC`, client.user.avatarURL())
                            .setTitle(`ไม่พบพลงที่กำลังเล่นในขณะนี้!`)
                            .setImage(
                                `https://cdn.discordapp.com/attachments/844249988795465728/865547952801579018/b1c0b055835c9042.png`
                            )
                            .setFooter(`Prefix : ${db.prefix}`)
                    ],
                    components: all(true)
                })
                interaction.deferUpdate()

            } else if (interaction.customId === "MUSIC_HELP") {
                const mmff = [
                    'นี้คือความหมายของปุ่มที่เเสดง',
                    '',
                    '⏮️ - เล่นเพลงก่อนหน้านี้',
                    '⏯️ - เล่นเพลงหรือหยุดเพลงชั่วคราว',
                    '⏭️ - เล่นเพลงถัดไป',
                    '🔁 - เปิดปิดการเล่นเพลงช้ำ',
                    '🔀 - การสุ่มเพลงเล่นในคิวทั้งหมด',
                    '🔊 - เพิ่มเสียงบอท',
                    '🔉 - ลดเสียงบอท',
                    '🔇 - เปิดปิดเสียงบอท',
                    '✖️ - ลากบอทออกจากห้องหรือให้บอทออกจากห้อง',
                    '❔ - เปิดดูคำอธิบายปุ่มในเมนูเพลง',
                ]
                return this.msgtimeout(interaction, '```' + mmff.join('\n') + '```', "#2f3136", 3, true)
            }
            // console.log(channel)
        } catch (e) { console.log(e) }
    },
    async msgtimeout(interaction, msg, color, timeout = 3, reply = false) {
        try {
            let v = null
            if (reply) {
                v = await interaction.reply({
                    ephemeral: true,
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${msg}`)
                            .setColor(`${color}`)
                    ],
                })
                // await wait(timeout * 1000)
                // await interaction.deleteReply()
            } else {
                interaction.deferUpdate()
                v = await interaction.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setDescription(`${msg}`)
                            .setColor(`${color}`)
                    ]
                })
            }
            if (v !== null) {
                setTimeout(() => {
                    if (reply == false) {
                        v.delete().catch(() => { })
                    }
                }, 1000 * timeout)
            }
        } catch (e) { console.log(e) }

    }
}