const { MessageButton, MessageEmbed, MessageActionRow } = require("discord.js");

module.exports = {
    name: "node",
    type: "info",
    description: "ดูสถานะของโหนดเพลงทั้งหมด",
    aliases: ["node"],
    async run(client, message, args) {
        try {
            const music = await message.channel.send("กำลังเช็คโหนดเพลงอยู่")
            var data = []
            let i = 0;
            const aa = client.manager.ideal.sort(function(a, b){
                return b.stats.playingPlayers - a.stats.playingPlayers
            })
            aa.forEach(node => {
                data.push({
                    name: `${node.connected ? "<:online:878894179617497088>" : "<:dnd:878894176438210621>"}  ${node.id}`,
                    value: `\`\`\`js
Connectd: ${node.stats.players}
Playing: ${node.stats.playingPlayers}
CPU: ${(node.stats.cpu.lavalinkLoad * 100).toFixed(2)}%
UM: ${(node.stats.memory.used / 1024 / 1024).toFixed(2)}MB
MM: ${(node.stats.memory.allocated / 1024 / 1024).toFixed(2)}MB
\`\`\``,
                    inline: true
                })
                i++
                if (client.manager.sockets.size == data.length) {
                    music.edit({
                        content: `**ALL Node Music ${client.manager.sockets.size}**`,
                        embeds: [
                            new MessageEmbed()
                                .addFields(data)
                                .setColor("AQUA")
                                .setFooter(`(UM = Used-Memory) (MM = Max-Memory)`)
                        ]
                    })
                }
            });
        } catch (e) {
            console.log(e)
        }
    }
}