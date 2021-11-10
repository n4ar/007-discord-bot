const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
    name: "unmute",
    type: "admin",
    description: "เปิดไมค์ทั้งคนที่อยุ่ช่องเดี๋ยวกับคนใช้งาน",
    aliases: ["unmute", "uall"],
    async run(client, message, args, prefix) {
        try {
            if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return message.replay(`ใช้ได้เฉพาะผู้ดูเเลเท่านั้น`)
            if (!message.guild.me.permissions.has(Permissions.FLAGS.MUTE_MEMBERS)) return message.replay(`ฉันไม่มีสิทธ์ในการปิดเสียง`)
            const { channel } = message.member.voice
            const members = channel.members
            const msg = await message.channel.send(`กำลังเปิดเสียง...`)
            const data = []
            let count = 0
            members.forEach(member => {
                member.voice.setMute(false).then(() => {
                    data.push(member.user.username)
                    count++
                    msg.edit(`เปิดเสียงเเล้ว \`${data.join(', ')}\` \`${count}\` คน`)
                })
            });
        } catch (err) {
            console.log(err);
        }
    },
};
