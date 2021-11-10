const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
  name: "add-emoji",
  type: "admin",
  description: "เพิ่มอีโมจิ",
  aliases: ["add-emoji", "ae"],
  async run(client, message, args, prefix) {
    try {
      if (!client.config.owners.includes(message.author.id)) {
        if (
          !message.guild.me.permissions.has(
            Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS
          )
        ) {
          return message.reply("✖️ ฉันไม่มีสิทธ์ในการจัดการอีโมจิ");
        }
        if (
          !message.member.permissions.has([
            Permissions.FLAGS.ADD_REACTIONS,
            Permissions.FLAGS.ADMINISTRATOR,
          ])
        ) {
          return message.reply(`✖️ คำสั่งนี้ใช้ได้เฉพาะผู้ดูเเลเท่านั้น`);
        }
      }

      if (!args.length) return message.reply(`โปรดระบุบอีโมจิมาด้วย!`);

      for (const rawEmoji of args) {
        const parsedEmoji = Util.parseEmoji(rawEmoji);

        if (parsedEmoji.id) {
          const extension = parsedEmoji.animated ? ".gif" : ".png";
          const url = `https://cdn.discordapp.com/emojis/${
            parsedEmoji.id + extension
          }`;
          message.guild.emojis.create(url, parsedEmoji.name).then((emoji) =>
            message.channel.send({
              embeds: [
                new MessageEmbed()
                  .setColor("GREEN")
                  .setTitle(
                    `<a:online:876054856685719552> "เพิ่มอิโมจิเรียบร้อยแล้ว"`
                  )
                  .setDescription(`Name: "${emoji.name}" | ${emoji}`),
              ],
            })
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
};
