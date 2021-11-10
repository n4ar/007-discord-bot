const { MessageEmbed } = require('discord.js')
const config = require('../../config')
const { readdirSync } = require('fs')
module.exports = {
    name: "reload",
    type: "owner",
    description: null,
    aliases: [null],
    async run(client, message, args, language) {
        if (!config.owners.includes(message.author.id)) return
        try {
            let reload = false;
            let pusha = []
            try {
                const li = await client.shard.broadcastEval(c => { return c.commandReloadAll()});
                let i = 0
                li.forEach(c => {
                    if (c === true){
                        pusha.push(`Shard ID \`${i}\` has reload \`commands\` & \`functions\` & \`events\` successfully`)
                    }
                    i++
                })
                reload = true
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
            if (reload) return message.channel.send({
                content: `<a:verified:876055960697860138> รีโหลดคำสั่งเรียบร้อยแล้ว`,
                embeds: [
                    new MessageEmbed()
                    .setColor('AQUA')
                    .setDescription(`${pusha.join('\n')}`)
                ]
        });
        } catch (e) {
            console.log(e)
        }
    }
}