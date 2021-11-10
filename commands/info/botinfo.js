const { MessageEmbed, Permissions, version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: "botinfo",
    type: "info",
    description: "ดูข้อมูลของบอท",
    aliases: ["bi", "stats"],
    async run(client, message, args) {
        try {
            
            const promises = [
                client.shard.fetchClientValues("guilds.cache.size"),
                client.shard.broadcastEval((c) =>
                    c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
                ),
                client.shard.fetchClientValues("channels.cache.size"),
                client.shard.fetchClientValues("manager.players.size"),
                client.shard.broadcastEval((c) => {
                    const daarray = [...c.manager.players.values()];
                    return daarray.reduce(
                        (acc, player) => (acc + player.playing ? 1 : 0),
                        0
                    );
                }),
                client.shard.broadcastEval((c) => {
                    const daarray = [...c.manager.players.values()];
                    return daarray.reduce(
                        (acc, player) => (acc + player._autoplay ? 1 : 0),
                        0
                    );
                }),
            ];
            Promise.all(promises).then(async (results) => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                const totalChannels = results[2].reduce((acc, ChannelCount) => acc + ChannelCount, 0);
                const totalPlayers = results[3].reduce((acc, PlayerCount) => acc + PlayerCount, 0);
                const totalPlaying = results[4].reduce((acc, PlayingCount) => acc + PlayingCount, 0);
                const totalAutoplay = results[5].reduce((acc, AutoplayCount) => acc + AutoplayCount, 0);
                const allda = {
                    totalGuilds: totalGuilds,
                    totalMembers: totalMembers,
                    totalChannels: totalChannels,
                    totalPlayers: totalPlayers,
                    totalPlaying: totalPlaying,
                    totalAutoplay: totalAutoplay,
                    status: {
                        node: process.version,
                        platform: process.platform,
                        discordjs: version,
                    },
                };

                const fu = async () => {
                    let data = []
                    for (var i = 0; i <= client.config.owners.length; i++) {
                        if (client.config.owners[i] === undefined) {
                            return data
                        } else {
                            data.push(await client.users.fetch(client.config.owners[i]));
                        }
                    }
                }
                const usdata = await fu()
                const user_names = usdata.map(function (user, index, array) {
                    return user.tag;
                });
                const array = [...client.manager.sockets.values()];
                const task_names = array.map(function (task, index, array) {
                    return task.id;
                });
                const ar = [
                    `เวอร์ชั่น: \`${client.config.version}\``,
                    `ไอดี: \`${client.user.id}\``,
                    `ชื่อ: \`${client.user.tag}\``,
                    `เซิร์ฟเวอร์ที่เชื่อมต่อ: \`${allda.totalGuilds}\``,
                    `ช่องทั้งหมด: \`${allda.totalChannels}\``,
                    `ผู้ใช้: \`${allda.totalMembers}\``,
                    `ชาร์ดทั้งหมด: \`${client.shard.count}\` | ชาร์ดที่อยู่: \`${client.shard.ids}\` `,
                    `โหนดเพลง: \`${client.manager.sockets.size} | ${task_names.join(
                        ", "
                    )}\``,
                    `เข้าช่องพูดคุย: \`${allda.totalPlayers}\` | กำลังเล่น \`${allda.totalPlaying}\` | เล่นอัตโนมัติ: \`${allda.totalAutoplay}\``,
                    ``,
                    `__**ผู้ดูเเล**__`,
                    `\`${user_names.join(`\`, \``)}\``,
                    `__**ระบบ**__`,
                    `NodeJS: \`${allda.status.node}\` | DiscordJS: \`${allda.status.discordjs}\` | Server: \`Gcies.net\``,
                ];
                message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setTitle(`🗒️ ข้อมูลบอท`)
                            .setDescription(`${ar.join("\n")}`)
                            .setColor("PURPLE")
                            .setThumbnail(`${client.user.displayAvatarURL()}`)
                            .setFooter(`บอทออนไลน์มา: ${moment.duration(client.uptime).format(" D [วัน], H [ชั่วโมง], m [นาที], s [วินาที]").toLocaleString()}`, message.author.displayAvatarURL())
                    ],
                });
            });
        } catch (err) {
            console.log(err);
        }
    },
    sendMessagTiemout(message, descr, color) {
        message
            .reply({
                embeds: [new MessageEmbed().setDescription(`${descr}`).setColor(color)],
            })
            .then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000);
            })
            .catch({});
    },
};
