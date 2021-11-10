const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
    name: "muteall",
    type: "admin",
    description: "ปิดไมค์ทั้งคนที่อยุ่ช่องเดี๋ยวกับคนใช้งาน",
    aliases: ["muteall", "mall"],
    async run(client, message, args, prefix) {
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && !message.member.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) return message.reply(`ใช้ได้เฉพาะผู้ดูเเลเท่านั้น`)
            if (!message.guild.me.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) return message.reply(`ฉันไม่มีสิทธ์ในการปิดเสียง`)
            const { channel } = message.member.voice
            const members = channel.members
            const msg = await message.channel.send(`กำลังปิดเสียง...`)
            const data = []
            let count = 0
            members.forEach(member => {
                member.voice.setMute(true).then(() => {
                    data.push(member.user.username)
                    count++
                    msg.edit(`ปิดเสียงเเล้ว \`${data.join(', ')}\` \`${count}\` คน`)
                })
            });
        } catch (err) {
            console.log(err);
        }
    },
};
