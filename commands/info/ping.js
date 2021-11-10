const { MessageEmbed, Permissions, version } = require("discord.js");
const moment = require("moment");
const axios = require('axios')
require("moment-duration-format");
module.exports = {
    name: "ping",
    type: "info",
    description: "ดูความหน่วงของบอท",
    aliases: ["ping"],
    async run(client, message, args) {
        try {
            const data = [
                `Discord Ping: \`${client.ws.ping}ms\``
            ]
            message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setDescription(`${data.join('\n')}`)
                        .setColor(0xff0887)
                        .setTimestamp()
                ]
            }).then(msg => {
                const startTime = new Date().getMilliseconds()
                client.mysql.query("SELECT * FROM `guilds`", (err, result) => {
                    const dta = new Date().getMilliseconds() - startTime
                    data.push(`Database Ping: \`${dta}ms\``)
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setDescription(`${data.join('\n')}`)
                                .setColor(0xff0887)
                                .setTimestamp()
                        ]
                    })
                })
                axios({
                    url: 'http://localhost:5500/stats'
                }).then(response => {
                    const api = new Date().getMilliseconds() - startTime
                    data.push(`API Ping: \`${api}ms\``)
                    msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setDescription(`${data.join('\n')}`)
                                .setColor(0xff0887)
                                .setTimestamp()
                        ]
                    })
                })
            })

        } catch (err) {
            console.log(err);
        }
    },
};
