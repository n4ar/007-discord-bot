const chalk = require('chalk')
const mu = require('../functions/music')
const config = require('../config')
module.exports = async (client, message) => {
    try {
        let sv___ = config.defaults
        client.mysql.query("SELECT * FROM `guilds` WHERE `guild` LIKE '" + message.guild?.id + "'", (err, result) => {
            if (err) return
            if (result.length > 0) {
                sv___ = result[0]
            } else {
                client.mysql.query("INSERT INTO `guilds` (`id`, `guild`) VALUES (NULL, '" + message.guild?.id + "')", (err, created) => {
                    if (created) {
                        console.log(chalk.bgGreen((chalk.white(`| ${created.insertId} | ${message.guild.name} (${message.guild.id})`))))
                    }
                })
            }

            const guildet = sv___
            const prefix = client.config.dev.status ? client.config.dev.prefix : guildet.prefix
            if (message.channel.id === guildet?.MusicChannelID && message.id === guildet?.MusicMessageID) {
                mu.embed_playering(client, message.guild.id)
            }
        });
    } catch (e) {
        console.log(e)
    }

}