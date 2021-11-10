const { MessageEmbed } = require('discord.js')
const config = require('../../config')
const { readdirSync } = require('fs')
module.exports = {
    name: "reloadapi",
    type: "owner",
    description: null,
    aliases: [null],
    async run(client, message, args) {
        if (!config.owners.includes(message.author.id)) return
        try {
            try {
                client.successmsg = await message.channel.send({
                    content: `<a:Loading:885776068710137887> กำลังรีโหลด API`
                })
                await client.shard.broadcastEval(c => { return c.apiReload()});
            } catch (err) {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor("RED")
                            .setTitle(`เกิดข้อผิดพลาด`)
                            .setDescription(`\`\`\`${err.stack}\`\`\``)

                    ]
                });
            }
        //     if (reload) return message.channel.send({
        //         content: `<a:verified:876055960697860138> รีโหลดคำสั่งเรียบร้อยแล้ว`,
        //         embeds: [
        //             new MessageEmbed()
        //             .setColor('AQUA')
        //             .setDescription(`${pusha.join('\n')}`)
        //         ]
        // });
        } catch (e) {
            console.log(e)
        }
    }
}